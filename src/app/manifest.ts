import type { MetadataRoute } from 'next';

import { absoluteUrl } from '@/shared/config/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '오늘은 오므라이스',
    short_name: '오늘은 오므라이스',
    description:
      '(주) 재영에프앤비가 운영하는 대한민국 1등 오므라이스 브랜드, 성공 창업의 새로운 기준 오늘은 오므라이스',
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
