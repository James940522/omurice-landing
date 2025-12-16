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
 * Open Graph 이미지 설정 (카카오톡, 페이스북, 트위터 공유용)
 *
 * TODO: 실제 OG 이미지를 public/ 폴더에 배치 후 경로 업데이트
 * 권장: 1200x630px, JPG/PNG, 1MB 이하
 *
 * @example
 * public/og.jpg → OG_IMAGE_PATH = '/og.jpg'
 * public/og-image.png → OG_IMAGE_PATH = '/og-image.png'
 */
export const OG_IMAGE_PATH = '/og.jpg'; // TODO: 실제 이미지 경로로 변경

/**
 * Open Graph 이미지 절대 URL
 * 카카오톡, 소셜 미디어 공유 시 사용됩니다.
 */
export const OG_IMAGE_URL = absoluteUrl(OG_IMAGE_PATH);

/**
 * Open Graph 이미지 크기 (권장 비율 1200x630)
 */
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
