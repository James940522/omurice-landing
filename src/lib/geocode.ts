/**
 * 클라이언트 사이드 지오코딩 헬퍼
 *
 * 브라우저는 카카오 Local REST API를 직접 호출하지 않고,
 * 내부 Next.js 라우트(`/api/geocode`)만 호출한다.
 */

export interface GeocodeResult {
  addressName: string;
  lat: number;
  lng: number;
}

/**
 * 주소 문자열을 위경도로 변환
 *
 * @param address 변환할 주소 (도로명/지번 모두 가능)
 * @returns 변환 성공 시 GeocodeResult, 실패/미존재 시 null
 */
export async function geocodeAddress(address: string): Promise<GeocodeResult | null> {
  if (!address || address.trim() === '') return null;

  try {
    const response = await fetch(`/api/geocode?query=${encodeURIComponent(address.trim())}`);

    if (!response.ok) {
      // 404 (미존재) 외 에러는 디버깅 위해 로깅
      if (response.status !== 404) {
        console.warn(`[geocodeAddress] /api/geocode returned ${response.status} for "${address}"`);
      }
      return null;
    }

    const data = (await response.json()) as GeocodeResult;
    return data;
  } catch (error) {
    console.error('[geocodeAddress] network error:', error);
    return null;
  }
}
