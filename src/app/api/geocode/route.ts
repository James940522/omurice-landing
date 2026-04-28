import { NextRequest, NextResponse } from 'next/server';

/**
 * 서버 사이드 지오코딩 API 라우트
 *
 * - 카카오 Local REST API(`/v2/local/search/address.json`)는 브라우저에서 직접 호출하면
 *   CORS 정책 및 REST API 키 노출 이슈가 있다. 이 라우트가 프록시 역할을 한다.
 * - 클라이언트 번들에는 절대 REST API 키가 노출되지 않는다 (서버 전용 env).
 */

export const runtime = 'nodejs';

const KAKAO_LOCAL_ADDRESS_ENDPOINT = 'https://dapi.kakao.com/v2/local/search/address.json';

// 매장 주소는 거의 변하지 않으므로 24시간 캐시
const CACHE_REVALIDATE_SECONDS = 60 * 60 * 24;

interface KakaoAddressDocument {
  address_name: string;
  x: string; // longitude
  y: string; // latitude
}

interface KakaoAddressResponse {
  documents: KakaoAddressDocument[];
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };
}

export interface GeocodeResult {
  addressName: string;
  lat: number;
  lng: number;
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('query');

  if (!query || query.trim() === '') {
    return NextResponse.json({ error: 'query parameter is required' }, { status: 400 });
  }

  const apiKey = process.env.KAKAO_REST_API_KEY;
  if (!apiKey) {
    console.error('[geocode] KAKAO_REST_API_KEY is not configured');
    return NextResponse.json(
      { error: 'Geocoding service is not configured' },
      { status: 500 }
    );
  }

  const upstreamUrl = new URL(KAKAO_LOCAL_ADDRESS_ENDPOINT);
  upstreamUrl.searchParams.set('query', query.trim());
  upstreamUrl.searchParams.set('page', '1');
  upstreamUrl.searchParams.set('size', '1');

  try {
    const response = await fetch(upstreamUrl.toString(), {
      headers: {
        Authorization: `KakaoAK ${apiKey}`,
      },
      next: {
        revalidate: CACHE_REVALIDATE_SECONDS,
      },
    });

    if (!response.ok) {
      console.error(`[geocode] Kakao API responded with ${response.status}`);
      return NextResponse.json(
        { error: 'Failed to query geocoding service' },
        { status: response.status === 401 || response.status === 403 ? 502 : response.status }
      );
    }

    const data = (await response.json()) as KakaoAddressResponse;

    if (!data.documents || data.documents.length === 0) {
      return NextResponse.json({ error: 'No matching address found' }, { status: 404 });
    }

    const doc = data.documents[0];
    const lat = Number.parseFloat(doc.y);
    const lng = Number.parseFloat(doc.x);

    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      return NextResponse.json(
        { error: 'Invalid coordinates returned by upstream' },
        { status: 502 }
      );
    }

    const result: GeocodeResult = {
      addressName: doc.address_name,
      lat,
      lng,
    };

    return NextResponse.json(result, {
      headers: {
        'Cache-Control': `public, s-maxage=${CACHE_REVALIDATE_SECONDS}, stale-while-revalidate=86400`,
      },
    });
  } catch (error) {
    console.error('[geocode] Unexpected error:', error);
    return NextResponse.json({ error: 'Internal geocoding error' }, { status: 500 });
  }
}
