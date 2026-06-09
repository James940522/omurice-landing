import type { Metadata, Viewport } from 'next';
import './globals.css';
import {
  SITE_ORIGIN,
  OG_IMAGE_URL,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
} from '@/shared/config/site';

// SEO: Robots 설정 (preview 환경은 noindex)
const isPreview = process.env.VERCEL_ENV === 'preview';

// SEO: 검색엔진 소유확인 (안전한 처리)
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;
const naverVerification = process.env.NAVER_SITE_VERIFICATION;

const siteTitle = '오늘은 오므라이스 | 오므라이스 창업 프랜차이즈';
const siteDescription =
  '재영에프앤비(Jaeyoung F&B)가 운영하는 오므라이스 프랜차이즈. 배달 중심 1~2인 운영, 소형 매장 최적화, 창업 비용 상담, 수익 구조 안내를 제공합니다.';
const siteKeywords = [
  '오므라이스 창업',
  '오늘은 오므라이스',
  '재영에프앤비',
  '재영 F&B',
  'Jaeyoung F&B',
  '오므라이스 프랜차이즈',
  '배달 전문점 창업',
  '소자본 외식 창업',
  '1인 운영 음식점 창업',
  '오므라이스 창업 비용',
  '오므라이스 가맹 문의',
  '배달 오므라이스 창업',
  '소형 매장 창업',
  '프랜차이즈 창업 상담',
];

export const metadata: Metadata = {
  // SEO: metadataBase - 모든 상대 경로의 기준 URL
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: siteTitle,
    template: '%s | 오늘은 오므라이스',
  },
  description: siteDescription,
  applicationName: '오늘은 오므라이스',
  authors: [{ name: '재영에프앤비', url: SITE_ORIGIN }],
  creator: '재영에프앤비',
  publisher: '재영에프앤비',
  generator: 'Next.js',
  category: 'Food Franchise',
  classification: '오므라이스 프랜차이즈 창업',
  referrer: 'strict-origin-when-cross-origin',
  keywords: siteKeywords,
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
  manifest: '/manifest.webmanifest',
  robots: {
    index: !isPreview,
    follow: !isPreview,
    nocache: isPreview,
    googleBot: {
      index: !isPreview,
      follow: !isPreview,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  appleWebApp: {
    capable: true,
    title: '오늘은 오므라이스',
    statusBarStyle: 'default',
  },
  // SEO: Canonical URL - 절대 경로 (GSC 필수)
  alternates: {
    canonical: '/',
    languages: {
      'ko-KR': '/',
    },
  },
  // SEO: Open Graph - 카카오톡, 페이스북, 트위터 공유용 (절대 URL)
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_ORIGIN, // 절대 URL
    siteName: '오늘은 오므라이스',
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: OG_IMAGE_URL, // 절대 URL (site.ts에서 관리)
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: '오늘은 오므라이스 프랜차이즈 - 배달 전문 오므라이스 창업',
      },
    ],
  },
  // SEO: Twitter Card (X 공유용)
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: OG_IMAGE_URL,
        alt: '오늘은 오므라이스 프랜차이즈 - 배달 전문 오므라이스 창업',
      },
    ],
  },
  // SEO: Google Site Verification (built-in 지원)
  verification: {
    google: googleVerification,
  },
  // SEO: Naver Site Verification 및 지역/브랜드 보조 메타 태그
  other: {
    ...(naverVerification && {
      'naver-site-verification': naverVerification,
    }),
    'geo.region': 'KR-11',
    'geo.placename': '서울특별시 동대문구',
    'business:contact_data:country_name': 'South Korea',
    'supported-color-schemes': 'light',
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'only light',
};

const lightSchemeStyle = {
  colorScheme: 'only light',
  backgroundColor: '#ffffff',
} satisfies React.CSSProperties;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" style={lightSchemeStyle}>
      <body className="antialiased" style={lightSchemeStyle}>
        {children}
      </body>
    </html>
  );
}
