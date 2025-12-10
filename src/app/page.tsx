'use client';

import { useEffect, useState } from 'react';

// Widgets
import { Header } from '@/widgets/header';
import { HeroSection } from '@/widgets/hero';
import { BrandIntroSection } from '@/widgets/brand-intro';
import { DualBrandSection } from '@/widgets/dual-brand';
import { RevenueProofSection } from '@/widgets/revenue-proof';
import { StartupProcessSection } from '@/widgets/startup-process';
import { MenuSection } from '@/widgets/menu';
import { ReviewsSection } from '@/widgets/reviews';
import { StoreMapSection } from '@/widgets/store-map';
import { ContactFormSection } from '@/widgets/contact-form';
import { Footer } from '@/widgets/footer';

// Features
import { FloatingInquiry } from '@/features/inquiry';
import { WelcomeModal } from '@/features/welcome-modal';
import { StoreStatusModal } from '@/features/store-status-modal';
import { IntroAnimation } from '@/features/intro-animation';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showStoreModal, setShowStoreModal] = useState(false);

  useEffect(() => {
    // 인트로 애니메이션이 끝난 후 모달 표시
    const checkIntro = () => {
      if (!showIntro) {
        const timer = setTimeout(() => {
          const hideWelcome = localStorage.getItem('hideModal_owner-recruitment');
          const hideStore = localStorage.getItem('hideModal_store-status');
          const now = new Date().getTime();

          if (!hideWelcome || parseInt(hideWelcome) < now) {
            setShowWelcomeModal(true);
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
    setShowWelcomeModal(false);
    setShowStoreModal(false);

    // 약간의 딜레이 후 스크롤
    setTimeout(() => {
      const contactSection = document.getElementById('contact-form');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <main className="min-h-screen">
      {/* 인트로 애니메이션 */}
      <IntroAnimation isVisible={showIntro} onComplete={() => setShowIntro(false)} />

      <Header />
      <HeroSection />
      <BrandIntroSection />
      <RevenueProofSection />
      <DualBrandSection />
      <StartupProcessSection />
      <MenuSection />
      <ReviewsSection />
      <StoreMapSection />
      <ContactFormSection />
      <Footer />
      <FloatingInquiry />

      {/* 모달들 - 가로로 나란히 배치 */}
      <WelcomeModal
        isOpen={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
        onNavigateToContact={handleNavigateToContact}
      />
      <StoreStatusModal isOpen={showStoreModal} onClose={() => setShowStoreModal(false)} />
    </main>
  );
}
