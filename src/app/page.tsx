// Widgets
import { Header } from '@/widgets/header';
import { HeroSection } from '@/widgets/hero';
import { BrandIntroSection } from '@/widgets/brand-intro';
import { StartupGuideSection } from '@/widgets/startup-guide';
import { StartupProcessSection } from '@/widgets/startup-process';
import { StartupCostSection } from '@/widgets/startup-cost';
import { MenuSection } from '@/widgets/menu';
import { BaeminOrdersSection } from '@/widgets/baemin-orders';
import { StoreSection } from '@/widgets/store';
import { Footer } from '@/widgets/footer';

// Features
import { FloatingInquiry } from '@/features/inquiry';
import { ScrollToTop } from '@/features/scroll-to-top';

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
      <FloatingInquiry />
      <ScrollToTop />
    </main>
  );
}
