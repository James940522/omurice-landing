import type { Metadata, Viewport } from 'next';
import './globals.css';

// SEO: 사이트 기본 URL (환경변수 또는 Vercel 배포 URL 사용)
const getSiteUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'https://omurice-landing.vercel.app'; // 폴백 URL
};

const siteUrl = getSiteUrl();

// SEO: Robots 설정 (preview 환경은 noindex)
const isPreview = process.env.VERCEL_ENV === 'preview';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: '오므라이스 창업 | 오늘은 오므라이스 · 에그이츠 프랜차이즈',
    template: '%s | 오늘은 오므라이스',
  },
  description:
    '배달 중심 오므라이스 프랜차이즈. 1~2인 운영, 소형 매장 최적화, 수익 구조 공개. 오늘은 오므라이스 · 에그이츠 창업 상담 진행 중.',
  keywords:
    '오므라이스 창업, 오므라이스 프랜차이즈, 배달 전문점 창업, 소자본 외식 창업, 1인 운영 음식점 창업, 오므라이스 창업 비용, 오므라이스 가맹 문의, 배달 오므라이스 창업, 소형 매장 창업',
  // Favicon 설정 (모든 브라우저, 모바일, PWA 환경 지원)
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
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
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: siteUrl,
    siteName: '오늘은 오므라이스',
    title: '오므라이스 창업 | 오늘은 오므라이스 · 에그이츠 프랜차이즈',
    description:
      '배달 중심 오므라이스 프랜차이즈. 1~2인 운영, 소형 매장 최적화, 수익 구조 공개. 오늘은 오므라이스 · 에그이츠 창업 상담 진행 중.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: '오늘은 오므라이스 · 에그이츠 프랜차이즈 창업',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '오므라이스 창업 | 오늘은 오므라이스 · 에그이츠 프랜차이즈',
    description: '배달 중심 오므라이스 프랜차이즈. 1~2인 운영, 소형 매장 최적화, 수익 구조 공개.',
    images: ['/og.png'],
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: {
      naver: process.env.NAVER_SITE_VERIFICATION || '',
    },
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
