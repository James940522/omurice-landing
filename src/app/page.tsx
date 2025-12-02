// Widgets
import { Header } from '@/widgets/header';
import { HeroSection } from '@/widgets/hero';
import { BrandIntroSection } from '@/widgets/brand-intro';
import { DualBrandSection } from '@/widgets/dual-brand';
import { RevenueProofSection } from '@/widgets/revenue-proof';
import { StartupProcessSection } from '@/widgets/startup-process';
import { MenuSection } from '@/widgets/menu';
import { ReviewsSection } from '@/widgets/reviews';
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
      <DualBrandSection />
      <RevenueProofSection />
      <StartupProcessSection />
      <MenuSection />
      <ReviewsSection />
      <StoreSection />
      <Footer />
      <FloatingInquiry />
    </main>
  );
}
