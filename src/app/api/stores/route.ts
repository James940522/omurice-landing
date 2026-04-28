import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * 매장 데이터 통합 라우트
 *
 * 클라이언트는 이 라우트만 1회 호출하면 좌표(lat/lng) 포함된 매장 리스트를
 * 즉시 받을 수 있다. 서버에서 다음을 일괄 처리한다.
 *   1) public/asset/csv/...csv 읽기
 *   2) 각 매장 주소 → 카카오 Local API 호출 (병렬 8개씩)
 *   3) 좌표 포함된 매장 리스트 응답 (24h ISR 캐시)
 *
 * 결과: 사용자 페이지 진입 시 외부 호출 1회, 카카오 호출 0회 (캐시 유효 동안).
 */

export const runtime = 'nodejs';
// Next.js 페이지 캐시: 24시간 (서버에서 한 번 빌드된 응답을 재사용)
export const revalidate = 60 * 60 * 24;

const CSV_RELATIVE_PATH = 'public/asset/csv/omurice_kakao_stores_clean.csv';

const KAKAO_ADDRESS_ENDPOINT = 'https://dapi.kakao.com/v2/local/search/address.json';
const KAKAO_KEYWORD_ENDPOINT = 'https://dapi.kakao.com/v2/local/search/keyword.json';
const KAKAO_FETCH_REVALIDATE = 60 * 60 * 24; // 24h
// 카카오 동시 호출 상한 — 너무 많은 동시 요청은 카카오에서 throttle 가능
const KAKAO_CONCURRENCY = 8;

export interface StoreWithCoordinates {
  store_code: string;
  branch_name: string;
  display_name: string;
  address: string;
  /** 지오코딩 실패 시 undefined — 클라는 마커를 그리지 않는다. */
  lat?: number;
  lng?: number;
}

interface KakaoDocument {
  address_name: string;
  road_address_name?: string;
  place_name?: string;
  x: string;
  y: string;
}

interface KakaoResponse {
  documents: KakaoDocument[];
}

/**
 * 카카오가 잘 못 찾는 입력 노이즈를 정리한다.
 * - 끝부분의 콤마/공백/마침표
 * - 괄호 안의 빌딩명/세부 위치 (`(서해타워)`, `(본동)` 등)
 * - 행정동/호수/층 정보 (`a동`, `102호`, `1층` 등 — 마지막 단어에 한해서만)
 * - 연속 공백 정리
 */
function sanitizeQuery(raw: string): string {
  return raw
    .trim()
    .replace(/[\s,.\u3000]+$/g, '')
    .replace(/\s*[(（][^)）]*[)）]\s*/g, ' ')
    .replace(/\s+\S*\d+\s*(동|호|층)(\s+.*)?$/u, '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function fetchKakao(
  endpoint: string,
  query: string,
  apiKey: string
): Promise<KakaoResponse | null> {
  const url = new URL(endpoint);
  url.searchParams.set('query', query);
  url.searchParams.set('page', '1');
  url.searchParams.set('size', '1');

  const response = await fetch(url.toString(), {
    headers: { Authorization: `KakaoAK ${apiKey}` },
    next: { revalidate: KAKAO_FETCH_REVALIDATE },
  });

  if (!response.ok) {
    console.error(
      `[stores] Kakao ${endpoint} responded with ${response.status} for "${query}"`
    );
    return null;
  }
  return (await response.json()) as KakaoResponse;
}

/**
 * 단일 주소를 좌표로 변환. 폴백 체인:
 *   1) 정제된 쿼리로 address.json
 *   2) 0건이면 keyword.json (장소명/지번 등 관대 매칭)
 *   3) 정제 전 원본으로 keyword.json 한 번 더
 */
async function geocode(
  address: string,
  apiKey: string
): Promise<{ lat: number; lng: number } | null> {
  if (!address || address.trim() === '') return null;

  const trimmedRaw = address.trim();
  const sanitized = sanitizeQuery(trimmedRaw);

  let kakaoData = await fetchKakao(KAKAO_ADDRESS_ENDPOINT, sanitized, apiKey);

  if (!kakaoData?.documents?.length) {
    kakaoData = await fetchKakao(KAKAO_KEYWORD_ENDPOINT, sanitized, apiKey);
  }
  if (!kakaoData?.documents?.length && sanitized !== trimmedRaw) {
    kakaoData = await fetchKakao(KAKAO_KEYWORD_ENDPOINT, trimmedRaw, apiKey);
  }
  if (!kakaoData?.documents?.length) return null;

  const doc = kakaoData.documents[0];
  const lat = Number.parseFloat(doc.y);
  const lng = Number.parseFloat(doc.x);
  if (Number.isNaN(lat) || Number.isNaN(lng)) return null;

  return { lat, lng };
}

interface BaseStore {
  store_code: string;
  branch_name: string;
  display_name: string;
  address: string;
}

function parseCsv(text: string): BaseStore[] {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const dataLines = lines.slice(1); // 헤더 제외
  const stores: BaseStore[] = [];

  for (const line of dataLines) {
    const parts = line.split(',');
    if (parts.length < 4) continue;

    const [store_code, branch_name, display_name, ...addressParts] = parts;
    const address = addressParts.join(',');

    if (
      !store_code ||
      branch_name === 'nan' ||
      display_name === 'nan' ||
      address === 'nan'
    ) {
      continue;
    }

    stores.push({
      store_code: store_code.trim(),
      branch_name: branch_name.trim(),
      display_name: display_name.trim(),
      address: address.trim(),
    });
  }

  return stores;
}

/**
 * 동시 호출 수를 제한하면서 비동기 작업을 실행
 */
async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  worker: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let cursor = 0;

  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (true) {
      const index = cursor++;
      if (index >= items.length) return;
      results[index] = await worker(items[index], index);
    }
  });

  await Promise.all(runners);
  return results;
}

export async function GET() {
  const apiKey = process.env.KAKAO_REST_API_KEY;
  if (!apiKey) {
    console.error('[stores] KAKAO_REST_API_KEY is not configured');
    return NextResponse.json(
      { error: 'Geocoding service is not configured' },
      { status: 500 }
    );
  }

  try {
    const csvPath = path.join(process.cwd(), CSV_RELATIVE_PATH);
    const csvText = await fs.readFile(csvPath, 'utf-8');
    const baseStores = parseCsv(csvText);

    // 주소 있는 매장만 지오코딩 대상 — 빈 주소는 좌표 없이 통과
    const enriched: StoreWithCoordinates[] = await mapWithConcurrency(
      baseStores,
      KAKAO_CONCURRENCY,
      async (store) => {
        if (!store.address) return store;
        const coords = await geocode(store.address, apiKey);
        return coords ? { ...store, ...coords } : store;
      }
    );

    const withCoordinates = enriched.filter(
      (s) => typeof s.lat === 'number' && typeof s.lng === 'number'
    ).length;

    return NextResponse.json(
      {
        stores: enriched,
        total: enriched.length,
        withCoordinates,
      },
      {
        headers: {
          'Cache-Control': `public, s-maxage=${KAKAO_FETCH_REVALIDATE}, stale-while-revalidate=${KAKAO_FETCH_REVALIDATE * 7}`,
        },
      }
    );
  } catch (error) {
    console.error('[stores] Unexpected error:', error);
    return NextResponse.json({ error: 'Failed to load stores' }, { status: 500 });
  }
}
