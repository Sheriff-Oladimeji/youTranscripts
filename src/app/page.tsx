import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import PromotionalSection from "@/components/promotional-section";
import HowToSection from "@/components/how-to-section";
import WhySection from "@/components/why-section";
import ContentCreatorsSection from "@/components/content-creators-section";
import AiToolsSection from "@/components/ai-tools-section";
import FaqSection from "@/components/faq-section";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <PromotionalSection />
      <HowToSection />
      <WhySection />
      <ContentCreatorsSection />
      <AiToolsSection />
      <FaqSection />
    </main>
  );
}
