// Widgets
import { Header } from '@/widgets/header';
import { HeroSection } from '@/widgets/hero';
import { BrandIntroSection } from '@/widgets/brand-intro';
import { RevenueProofSection } from '@/widgets/revenue-proof';
import { StartupProcessSection } from '@/widgets/startup-process';
import { MenuSection } from '@/widgets/menu';
import { BaeminOrdersSection } from '@/widgets/baemin-orders';
import { StoreSection } from '@/widgets/store';
import { Footer } from '@/widgets/footer';

// Features
import { FloatingInquiry } from '@/features/inquiry';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <BrandIntroSection />
      <RevenueProofSection />
      <StartupProcessSection />
      <MenuSection />
      <BaeminOrdersSection />
      <StoreSection />
      <Footer />
      <FloatingInquiry />
    </main>
  );
}
