/**
 * SEO: 사이트 URL 단일 소스 (Single Source of Truth)
 *
 * Google Search Console, sitemap, robots.txt, JSON-LD 등
 * 모든 SEO 관련 설정에서 이 파일을 참조합니다.
 */

// 프로덕션 도메인 (절대 변경 금지)
export const SITE_ORIGIN = 'https://todayomurice.com';

/**
 * 상대 경로를 절대 URL로 변환
 * @param path - 상대 경로 (예: "/sitemap.xml", "/og.png")
 * @returns 절대 URL (예: "https://todayomurice.com/sitemap.xml")
 */
export const absoluteUrl = (path: string): string => {
  return new URL(path, SITE_ORIGIN).toString();
};

/**
 * Open Graph 이미지 설정
 */
export const OG_IMAGE_URL = absoluteUrl('/og.png');
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
