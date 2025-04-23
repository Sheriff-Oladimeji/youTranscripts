import HeroSection from "@/components/hero-section";
import PromotionalSection from "@/components/promotional-section";
import HowToSection from "@/components/how-to-section";
import UseCasesSection from "@/components/use-cases-section";

import TestimonialsSection from "@/components/testimonials-section-new";
import FaqSection from "@/components/faq-section";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />
      <PromotionalSection />
      {/* <div className="w-full h-1 bg-gray-200 dark:bg-gray-700"></div> */}
      <HowToSection />
      {/* <div className="w-full h-1 bg-gray-200 dark:bg-gray-700"></div> */}
      <UseCasesSection />
      {/* <AiToolsSection /> */}
      {/* <div className="w-full h-1 bg-gray-200 dark:bg-gray-700"></div> */}
      <TestimonialsSection />
      {/* <div className="w-full h-1 bg-gray-200 dark:bg-gray-700"></div> */}
      <FaqSection />
    </main>
  );
}
