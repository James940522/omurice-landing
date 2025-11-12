'use client';

import Header from '@/components/Header/Header';
import HeroSection from '@/components/sections/HeroSection';
import BrandIntroSection from '@/components/sections/BrandIntroSection';
import StartupGuideSection from '@/components/sections/StartupGuideSection';
import MenuSection from '@/components/sections/MenuSection';
import BaeminOrdersSection from '@/components/sections/BaeminOrdersSection';
import StoreSection from '@/components/sections/StoreSection';
import Footer from '@/components/layout/Footer';
import FloatingInquiry from '@/components/FloatingInquiry';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <BrandIntroSection />
      <StartupGuideSection />
      <MenuSection />
      <BaeminOrdersSection />
      <StoreSection />
      <Footer />
      <FloatingInquiry />
    </main>
  );
}
