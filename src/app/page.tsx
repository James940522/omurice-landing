'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

// Widgets
import { Header } from '@/widgets/header';
import { HeroSection } from '@/widgets/hero';
import { BrandIntroSection } from '@/widgets/brand-intro';
import { DualBrandSection } from '@/widgets/dual-brand';
import { RevenueProofSection } from '@/widgets/revenue-proof';
import { StartupProcessSection } from '@/widgets/startup-process';
import { MenuSection } from '@/widgets/menu';
import { StorePresetSection } from '@/widgets/store-preset';
import { ReviewsSection } from '@/widgets/reviews';
import { StoreMapSection } from '@/widgets/store-map';
import { ContactFormSection } from '@/widgets/contact-form';
import { Footer } from '@/widgets/footer';

// Features
import { FloatingInquiry } from '@/features/inquiry';
import { OwnerRecruitmentModal } from '@/features/owner-recruitment-modal';
import { StoreStatusModal } from '@/features/store-status-modal';
import { IntroAnimation } from '@/features/intro-animation';

// SEO: 사이트 기본 URL
const getSiteUrl = () => {
  if (typeof window !== 'undefined') return window.location.origin;
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'https://omurice-landing.vercel.app';
};

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [showRecruitmentModal, setShowRecruitmentModal] = useState(false);
  const [showStoreModal, setShowStoreModal] = useState(false);

  useEffect(() => {
    // 인트로 애니메이션이 끝난 후 모달 표시
    const checkIntro = () => {
      if (!showIntro) {
        const timer = setTimeout(() => {
          const hideRecruitment = localStorage.getItem('hideModal_owner-recruitment');
          const hideStore = localStorage.getItem('hideModal_store-status');
          const now = new Date().getTime();

          if (!hideRecruitment || parseInt(hideRecruitment) < now) {
            setShowRecruitmentModal(true);
          }

          if (!hideStore || parseInt(hideStore) < now) {
            setShowStoreModal(true);
          }
        }, 500);

        return () => clearTimeout(timer);
      }
    };

    checkIntro();
  }, [showIntro]);

  // 창업 문의 섹션으로 스크롤 이동 + 모든 모달 닫기
  const handleNavigateToContact = () => {
    setShowRecruitmentModal(false);
    setShowStoreModal(false);

    // 약간의 딜레이 후 스크롤
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const siteUrl = getSiteUrl();

  // SEO: JSON-LD Structured Data
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '오늘은 오므라이스',
    url: siteUrl,
    logo: `${siteUrl}/asset/logo/오므라이스_문구.png`,
    brand: [
      {
        '@type': 'Brand',
        name: '오늘은 오므라이스',
      },
      {
        '@type': 'Brand',
        name: '에그이츠',
      },
    ],
    description: '배달 중심 오므라이스 프랜차이즈. 1~2인 운영, 소형 매장 최적화, 수익 구조 공개.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+82-10-9923-9502',
      contactType: '가맹 상담',
      areaServed: 'KR',
      availableLanguage: 'Korean',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
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
  };

  return (
    <>
      {/* SEO: Structured Data (JSON-LD) */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <main className="min-h-screen font-sans">
        {/* 인트로 애니메이션 */}
        <IntroAnimation isVisible={showIntro} onComplete={() => setShowIntro(false)} />

        <Header />
        <HeroSection />
        <BrandIntroSection />
        <RevenueProofSection />
        <DualBrandSection />
        <StartupProcessSection />
        <MenuSection />
        <StorePresetSection />
        <ReviewsSection />
        <StoreMapSection />
        <ContactFormSection />
        <Footer />
        <FloatingInquiry />

        {/* 모달들 - 가로로 나란히 배치 */}
        <OwnerRecruitmentModal
          isOpen={showRecruitmentModal}
          onClose={() => setShowRecruitmentModal(false)}
          onNavigateToContact={handleNavigateToContact}
        />
        <StoreStatusModal isOpen={showStoreModal} onClose={() => setShowStoreModal(false)} />
      </main>
    </>
  );
}
