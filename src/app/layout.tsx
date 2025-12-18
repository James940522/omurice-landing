import type { Metadata, Viewport } from 'next';
import './globals.css';
import {
  SITE_ORIGIN,
  absoluteUrl,
  OG_IMAGE_URL,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
} from '@/shared/config/site';

// SEO: Robots 설정 (preview 환경은 noindex)
const isPreview = process.env.VERCEL_ENV === 'preview';

// SEO: 검색엔진 소유확인 (안전한 처리)
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;
const naverVerification = process.env.NAVER_SITE_VERIFICATION;

export const metadata: Metadata = {
  // SEO: metadataBase - 모든 상대 경로의 기준 URL
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: '오늘은 오므라이스 · 에그이츠 | 오므라이스 창업 프랜차이즈',
    template: '%s | 오늘은 오므라이스 · 에그이츠',
  },
  description:
    '재영에프앤비(Jaeyoung F&B) 운영 오므라이스 프랜차이즈. 오늘은 오므라이스·에그이츠(EGG EATS) 배달 중심 1~2인 운영, 소형 매장 최적화, 수익 구조 공개. 창업 상담 진행 중.',
  keywords:
    '오므라이스 창업, 오늘은 오므라이스, 에그이츠, egg eats, EGG EATS, 재영에프앤비, 재영 F&B, Jaeyoung F&B, 오므라이스 프랜차이즈, 배달 전문점 창업, 소자본 외식 창업, 1인 운영 음식점 창업, 오므라이스 창업 비용, 오므라이스 가맹 문의, 배달 오므라이스 창업, 소형 매장 창업',
  // Favicon 설정 (모든 브라우저, 모바일, PWA 환경 지원)
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' }, // 표준 아이콘 (검색엔진 최적화)
    ],
    shortcut: '/favicon-32x32.png',
    apple: {
      url: '/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
    other: [
      {
        rel: 'icon',
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        rel: 'icon',
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  robots: {
    index: !isPreview,
    follow: !isPreview,
    googleBot: {
      index: !isPreview,
      follow: !isPreview,
    },
  },
  // SEO: Canonical URL - 절대 경로 (GSC 필수)
  alternates: {
    canonical: '/',
  },
  // SEO: Open Graph - 카카오톡, 페이스북, 트위터 공유용 (절대 URL)
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_ORIGIN, // 절대 URL
    siteName: '오늘은 오므라이스 · 에그이츠',
    title: '오늘은 오므라이스 · 에그이츠 | 오므라이스 창업 프랜차이즈',
    description:
      '대한민국 1등 오므라이스 프랜차이즈. 오늘은 오므라이스·에그이츠(EGG EATS) 배달 중심 1~2인 운영, 소형 매장 최적화, 수익 구조 공개.',
    images: [
      {
        url: OG_IMAGE_URL, // 절대 URL (site.ts에서 관리)
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: '오늘은 오므라이스 · 에그이츠 프랜차이즈 - 배달 전문 오므라이스 창업',
      },
    ],
  },
  // SEO: Twitter Card (X 공유용)
  twitter: {
    card: 'summary_large_image',
    title: '오늘은 오므라이스 · 에그이츠 | 오므라이스 창업 프랜차이즈',
    description: '대한민국 1등 오므라이스 프랜차이즈. 배달 중심 1~2인 운영, 소형 매장 최적화.',
    images: [OG_IMAGE_URL], // 절대 URL (site.ts에서 관리)
  },
  // SEO: Google Site Verification (built-in 지원)
  verification: {
    google: googleVerification,
  },
  // SEO: Naver Site Verification (커스텀 메타 태그)
  other: {
    ...(naverVerification && {
      'naver-site-verification': naverVerification,
    }),
  },
};

// SEO: Viewport 설정 (브랜드 테마 컬러 포함)
export const viewport: Viewport = {
  themeColor: '#FFD700',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
