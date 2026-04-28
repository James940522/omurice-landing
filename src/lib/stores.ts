/**
 * Store 데이터 관련 타입 및 유틸리티 함수
 *
 * 매장 데이터는 서버의 `/api/stores` 라우트에서 일괄 조회한다.
 * 서버 측에서 CSV 파싱 + 카카오 지오코딩 + 캐싱(24h)이 끝난 결과를 받아오므로
 * 클라이언트는 추가 가공 없이 lat/lng까지 포함된 매장 리스트를 즉시 사용할 수 있다.
 */

export type Store = {
  store_code: string;
  branch_name: string;
  display_name: string;
  address: string;
  /** 지오코딩 실패 시 undefined — 마커는 그리지 않는다. */
  lat?: number;
  lng?: number;
};

interface StoresApiResponse {
  stores: Store[];
  total: number;
  withCoordinates: number;
}

/**
 * 서버에서 매장 데이터(좌표 포함) 일괄 조회
 *
 * @returns Store 배열 (호출 실패 시 빈 배열)
 */
export async function fetchStores(): Promise<Store[]> {
  try {
    const response = await fetch('/api/stores');
    if (!response.ok) {
      console.error(`[fetchStores] /api/stores responded with ${response.status}`);
      return [];
    }
    const data = (await response.json()) as StoresApiResponse;
    return data.stores ?? [];
  } catch (error) {
    console.error('[fetchStores] network error:', error);
    return [];
  }
}

/**
 * 검색어로 매장 필터링
 * branch_name, display_name, address를 대상으로 부분 문자열 검색
 *
 * @param stores - 전체 매장 리스트
 * @param keyword - 검색어
 * @returns 필터링된 매장 리스트
 */
export function filterStores(stores: Store[], keyword: string): Store[] {
  if (!keyword || keyword.trim() === '') {
    return stores;
  }

  const lowerKeyword = keyword.toLowerCase().trim();

  return stores.filter((store) => {
    const branchName = store.branch_name.toLowerCase();
    const displayName = store.display_name.toLowerCase();
    const address = store.address.toLowerCase();

    return (
      branchName.includes(lowerKeyword) ||
      displayName.includes(lowerKeyword) ||
      address.includes(lowerKeyword)
    );
  });
}
