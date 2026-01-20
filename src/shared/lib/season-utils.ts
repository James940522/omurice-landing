import type { Season } from '@/shared/types/season';

/**
 * 현재 월을 기준으로 기본 시즌 반환
 * - 12~2월: Winter
 * - 3~5월: Spring
 * - 6~8월: Summer
 * - 9~11월: Autumn
 */
export function getDefaultSeason(): Season {
  const currentMonth = new Date().getMonth() + 1; // 1-12

  if (currentMonth >= 3 && currentMonth <= 5) {
    return 'spring';
  } else if (currentMonth >= 6 && currentMonth <= 8) {
    return 'summer';
  } else if (currentMonth >= 9 && currentMonth <= 11) {
    return 'autumn';
  } else {
    return 'winter';
  }
}

/**
 * 시즌 한글명 반환
 */
export function getSeasonLabel(season: Season): string {
  const labels: Record<Season, string> = {
    spring: '봄',
    summer: '여름',
    autumn: '가을',
    winter: '겨울',
  };
  return labels[season];
}

/**
 * 시즌 순서 배열
 */
export const SEASONS: Season[] = ['spring', 'summer', 'autumn', 'winter'];
