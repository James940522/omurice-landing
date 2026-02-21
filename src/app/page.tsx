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
import { NoticeImageModal } from '@/features/notice-modal';
import { IntroAnimation } from '@/features/intro-animation';

// Shared Config
import { SITE_ORIGIN, absoluteUrl } from '@/shared/config/site';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [showRecruitmentModal, setShowRecruitmentModal] = useState(false);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [showNoticeEggEats, setShowNoticeEggEats] = useState(false);
  const [showNoticeBaemin, setShowNoticeBaemin] = useState(false);

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

          const hideNoticeEggEats = localStorage.getItem('hideModal_notice-egg-eats');
          if (!hideNoticeEggEats || parseInt(hideNoticeEggEats) < now) {
            setShowNoticeEggEats(true);
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

  // SEO: JSON-LD Structured Data (Google Search Console용)
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '오늘은 오므라이스',
    legalName: '주식회사 재영에프앤비',
    alternateName: ['재영에프앤비', '재영 F&B', 'Jaeyoung F&B', 'Jaeyoung F and B'],
    url: SITE_ORIGIN, // 절대 도메인 (GSC 필수)
    logo: absoluteUrl('/asset/logo/오므라이스_문구3.png'),
    // SEO: 공식 채널 (브랜드 엔티티 신호 강화)
    sameAs: [
      // TODO: 실제 공식 채널 URL로 교체 필요
      // 'https://www.instagram.com/todayomurice',
      // 'https://www.youtube.com/@todayomurice',
      // 'https://place.map.kakao.com/xxxxx', // 카카오 대표 매장
      // 'https://map.naver.com/v5/search/오늘은오므라이스', // 네이버 플레이스
      // 'https://pf.kakao.com/_xxxxx', // 카카오톡 채널
      // 'https://blog.naver.com/todayomurice', // 공식 블로그
    ],
    brand: [
      {
        '@type': 'Brand',
        name: '오늘은 오므라이스',
        alternateName: 'Today Omurice',
      },
      {
        '@type': 'Brand',
        name: '에그이츠',
        alternateName: ['EGG EATS', 'egg eats', 'Egg Eats'],
      },
    ],
    description:
      '재영에프앤비(Jaeyoung F&B) 운영. 배달 중심 오므라이스 프랜차이즈. 오늘은 오므라이스·에그이츠(EGG EATS) 1~2인 운영, 소형 매장 최적화, 수익 구조 공개.',
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
        <NoticeImageModal
          isOpen={showNoticeEggEats}
          onClose={() => {
            setShowNoticeEggEats(false);
            // 첫 번째 공지 닫은 뒤, 두 번째 공지가 숨김 처리되지 않았으면 띄움 (모바일에서 겹침 방지)
            const hideNoticeBaemin = localStorage.getItem('hideModal_notice-baemin');
            const now = new Date().getTime();
            if (!hideNoticeBaemin || parseInt(hideNoticeBaemin) < now) {
              setShowNoticeBaemin(true);
            }
          }}
          imageSrc="/asset/notice/egg_status.jpeg"
          modalId="notice-egg-eats"
          title="에그이츠 60호점 달성"
        />
        <NoticeImageModal
          isOpen={showNoticeBaemin}
          onClose={() => setShowNoticeBaemin(false)}
          imageSrc="/asset/notice/rookie.jpeg"
          modalId="notice-baemin"
          title="배민 루키상 수상"
        />
      </main>
    </>
  );
}
