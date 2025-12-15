import { MetadataRoute } from 'next';
import { SITE_ORIGIN } from '@/shared/config/site';

/**
 * SEO: sitemap.xml 생성
 * 
 * Google Search Console 크롤링을 위한 사이트맵
 * - 홈페이지 단일 페이지 구조
 * - 최고 우선순위 (priority: 1.0)
 * - 주간 업데이트 빈도
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_ORIGIN, // 절대 URL (GSC 필수)
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];
}
