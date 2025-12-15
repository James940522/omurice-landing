import { MetadataRoute } from 'next';
import { SITE_ORIGIN, absoluteUrl } from '@/shared/config/site';

/**
 * SEO: robots.txt 생성
 * 
 * - 프로덕션: index, follow
 * - Preview 환경: noindex, nofollow (GSC 인덱싱 방지)
 */
export default function robots(): MetadataRoute.Robots {
  const isPreview = process.env.VERCEL_ENV === 'preview';

  return {
    rules: {
      userAgent: '*',
      allow: isPreview ? undefined : '/',
      disallow: isPreview ? '/' : undefined,
    },
    sitemap: absoluteUrl('/sitemap.xml'),
    host: SITE_ORIGIN,
  };
}
