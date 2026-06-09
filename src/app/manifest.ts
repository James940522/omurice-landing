import type { MetadataRoute } from 'next';

import { absoluteUrl } from '@/shared/config/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '오늘은 오므라이스',
    short_name: '오늘은 오므라이스',
    description:
      '오므라이스 프랜차이즈 창업 상담, 배달 중심 운영, 소형 매장 최적화 정보를 제공하는 오늘은 오므라이스 공식 사이트입니다.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    lang: 'ko-KR',
    categories: ['food', 'business'],
    icons: [
      {
        src: absoluteUrl('/android-chrome-192x192.png'),
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: absoluteUrl('/android-chrome-192x192.png'),
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: absoluteUrl('/android-chrome-512x512.png'),
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: absoluteUrl('/android-chrome-512x512.png'),
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
