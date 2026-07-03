'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

// Widgets
import { Header } from '@/widgets/header';
import { FranchiseHeroSection } from '@/widgets/hero';
import { AchievementRankSection } from '@/widgets/achievement-rank';
import { FranchiseMomentumSection } from '@/widgets/franchise-momentum';
import { BrandIntroSection } from '@/widgets/brand-intro';
import { WhyChooseSection } from '@/widgets/why-choose';
import { RevenueProofSection } from '@/widgets/revenue-proof';
import { ReorderProofSection } from '@/widgets/reorder-proof';
import { FranchiseCostSection } from '@/widgets/franchise-cost';
import { StartupProcessSection } from '@/widgets/startup-process';
import { MenuSection } from '@/widgets/menu';
import { BrandDesignSection } from '@/widgets/brand-design';
import { CustomerBrandSection } from '@/widgets/customer-brand';
import { BusinessChangeSection } from '@/widgets/business-change';
import { SectionMarquee } from '@/widgets/section-marquee';
import { ContactFormSection } from '@/widgets/contact-form';
import { Footer } from '@/widgets/footer';

// Features
import { FloatingInquiry } from '@/features/inquiry';
import { IntroVideo } from '@/features/intro-video';
// import { IntroAnimation } from '@/features/intro-animation';
import { StoreStatusModal } from '@/features/store-status-modal';
import { BrandLetterModal } from '@/features/brand-letter-modal';

// Shared Config
import { SITE_ORIGIN, absoluteUrl } from '@/shared/config/site';

type LandingModalId = 'brand-letter' | 'store-status';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [landingModalQueue, setLandingModalQueue] = useState<LandingModalId[]>([]);
  const activeLandingModal = landingModalQueue[0] ?? null;

  useEffect(() => {
    if (showIntro) return;

    const timer = setTimeout(() => {
      const hideStore = localStorage.getItem('hideModal_store-status');
      const hideBrandLetter = localStorage.getItem('hideModal_brand-letter');
      const now = new Date().getTime();
      const shouldShowBrandLetter = !hideBrandLetter || parseInt(hideBrandLetter) < now;
      const shouldShowStore = !hideStore || parseInt(hideStore) < now;

      setLandingModalQueue(
        [
          shouldShowBrandLetter ? 'brand-letter' : null,
          shouldShowStore ? 'store-status' : null,
        ].filter(Boolean) as LandingModalId[]
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [showIntro]);

  const handleLandingModalClose = () => {
    setLandingModalQueue((queue) => queue.slice(1));
  };

  // SEO: JSON-LD Structured Data (Google Search Console용)
  const pageDescription =
    '재영에프앤비가 운영하는 오늘은 오므라이스 프랜차이즈 창업 안내 페이지입니다. 배달 중심 운영, 소형 매장, 1~2인 운영, 창업 비용 상담 정보를 제공합니다.';
  const organizationId = `${SITE_ORIGIN}/#organization`;
  const websiteId = `${SITE_ORIGIN}/#website`;
  const webpageId = `${SITE_ORIGIN}/#webpage`;
  const structuredDataSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: '오늘은 오므라이스',
        legalName: '주식회사 재영에프앤비',
        alternateName: ['재영에프앤비', '재영 F&B', 'Jaeyoung F&B', 'Jaeyoung F and B'],
        url: SITE_ORIGIN,
        logo: {
          '@type': 'ImageObject',
          url: absoluteUrl('/asset/logo/오므라이스_문구3.png'),
          width: 512,
          height: 512,
        },
        image: absoluteUrl('/og.png'),
        description: pageDescription,
        brand: {
          '@type': 'Brand',
          name: '오늘은 오므라이스',
          alternateName: 'Today Omurice',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+82-10-9923-9502',
          contactType: '가맹 상담',
          areaServed: 'KR',
          availableLanguage: 'Korean',
        },
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: '오늘은 오므라이스',
        url: SITE_ORIGIN,
        inLanguage: 'ko-KR',
        publisher: {
          '@id': organizationId,
        },
      },
      {
        '@type': 'WebPage',
        '@id': webpageId,
        name: '오늘은 오므라이스 | 오므라이스 창업 프랜차이즈',
        url: SITE_ORIGIN,
        description: pageDescription,
        inLanguage: 'ko-KR',
        isPartOf: {
          '@id': websiteId,
        },
        about: {
          '@id': organizationId,
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: absoluteUrl('/og.png'),
          width: 1200,
          height: 630,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_ORIGIN}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: '홈',
            item: SITE_ORIGIN,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: '창업 상담',
            item: absoluteUrl('/#contact'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_ORIGIN}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: '1~2인 운영이 가능한가요?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '네, 가능합니다. 배달 중심 운영 동선과 간소화된 조리 프로세스로 1~2인 운영이 가능하도록 설계되었습니다. 소형 매장 최적화로 효율적인 운영이 가능합니다.',
            },
          },
          {
            '@type': 'Question',
            name: '오므라이스 창업 비용은 어떻게 산정되나요?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '창업 비용은 매장 규모, 입지, 인테리어 선택에 따라 달라집니다. 정확한 비용 산정과 수익 구조는 가맹 상담 시 개별적으로 안내해드립니다.',
            },
          },
          {
            '@type': 'Question',
            name: '가맹 상담은 어떻게 진행되나요?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '홈페이지 창업 문의 또는 전화(010-9923-9502)로 1차 상담을 진행합니다. 이후 입지 분석, 수익 예상, 계약, 교육의 순서로 체계적인 창업 지원이 이루어집니다.',
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      {/* SEO: Structured Data (JSON-LD) */}
      <Script
        id="structured-data-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredDataSchema),
        }}
      />

      <main className="min-h-screen font-sans">
        <Header />
        <FranchiseHeroSection />
        <BrandIntroSection />
        <AchievementRankSection />
        <FranchiseMomentumSection />
        <WhyChooseSection />
        <RevenueProofSection />
        <ReorderProofSection />
        <FranchiseCostSection />
        <SectionMarquee variant="signature" />
        <BusinessChangeSection />
        <MenuSection />
        <SectionMarquee variant="franchise" />
        <BrandDesignSection />
        <SectionMarquee variant="signature" />
        <CustomerBrandSection />
        <StartupProcessSection />
        <SectionMarquee variant="franchise" />
        <ContactFormSection />
        <Footer />
        <FloatingInquiry />

        <BrandLetterModal
          isOpen={activeLandingModal === 'brand-letter'}
          onClose={handleLandingModalClose}
        />
        <StoreStatusModal
          isOpen={activeLandingModal === 'store-status'}
          onClose={handleLandingModalClose}
        />
        <IntroVideo isVisible={showIntro} onComplete={() => setShowIntro(false)} />
        {/* <IntroAnimation isVisible={showIntro} onComplete={() => setShowIntro(false)} /> */}
      </main>
    </>
  );
}
