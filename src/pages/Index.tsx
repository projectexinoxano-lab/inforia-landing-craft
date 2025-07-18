import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import ProblemSolutionSection from "@/components/ProblemSolutionSection";
import BenefitsSection from "@/components/BenefitsSection";
import LeadMagnetSection from "@/components/LeadMagnetSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <VideoSection />
      <ProblemSolutionSection />
      <BenefitsSection />
      <LeadMagnetSection />
      <PricingSection />
      <FAQSection />
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default Index;
