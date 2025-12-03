/**
 * Store 데이터 관련 타입 및 유틸리티 함수
 * CSV 파일로부터 매장 데이터를 가져와서 파싱
 */

export type Store = {
  store_code: string;
  branch_name: string;
  display_name: string;
  address: string;
  phone: string;
};

/**
 * CSV 파일로부터 매장 데이터를 가져옴
 * 
 * 향후 데이터가 복잡해지면 CSV 파서 라이브러리(예: papaparse) 교체 가능
 * 현재는 간단한 split 방식으로 파싱
 * 
 * @returns Store 배열
 */
export async function fetchStores(): Promise<Store[]> {
  try {
    const response = await fetch('/data/omurice_kakao_stores_clean.csv');
    const text = await response.text();
    
    const lines = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
    
    // 첫 번째 줄은 헤더이므로 제외
    const dataLines = lines.slice(1);
    
    const stores: Store[] = [];
    
    for (const line of dataLines) {
      // CSV 라인을 콤마로 분리
      const parts = line.split(',');
      
      // 5개의 컬럼이 있어야 함
      if (parts.length >= 5) {
        const [store_code, branch_name, display_name, address, phone] = parts;
        
        // nan 값이나 빈 값은 필터링
        if (
          store_code &&
          branch_name !== 'nan' &&
          display_name !== 'nan' &&
          address !== 'nan' &&
          phone !== 'nan'
        ) {
          stores.push({
            store_code: store_code.trim(),
            branch_name: branch_name.trim(),
            display_name: display_name.trim(),
            address: address.trim(),
            phone: phone.trim(),
          });
        }
      }
    }
    
    return stores;
  } catch (error) {
    console.error('Failed to fetch stores:', error);
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
  
  return stores.filter(store => {
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

