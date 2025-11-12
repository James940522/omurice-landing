import { Header } from '@/widgets/header';
import { HeroSection } from '@/widgets/hero';
import { Footer } from '@/widgets/footer';

// 나머지 섹션들은 기존 컴포넌트에서 import (추후 FSD로 이동 예정)
import BrandIntroSection from '@/components/sections/BrandIntroSection';
import StartupGuideSection from '@/components/sections/StartupGuideSection';
import StartupProcessSection from '@/components/sections/StartupProcessSection';
import StartupCostSection from '@/components/sections/StartupCostSection';
import MenuSection from '@/components/sections/MenuSection';
import BaeminOrdersSection from '@/components/sections/BaeminOrdersSection';
import StoreSection from '@/components/sections/StoreSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <BrandIntroSection />
      <StartupGuideSection />
      <StartupProcessSection />
      <StartupCostSection />
      <MenuSection />
      <BaeminOrdersSection />
      <StoreSection />
      <Footer />
      {/* FloatingInquiry는 추후 동적 기능 추가 시 features로 이동 */}
    </main>
  );
}
