/**
 * 계절 타입 정의
 */
export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

/**
 * 브랜드 데이터 타입
 */
export interface BrandData {
  id: string;
  nameKo: string;
  nameEn: string;
  description: string;
  seasons: {
    spring: string;
    summer: string;
    autumn: string;
    winter: string;
  };
}
