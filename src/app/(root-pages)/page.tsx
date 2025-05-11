import HeroSection from "@/components/hero-section";
import PromotionalSection from "@/components/promotional-section";
import HowToSection from "@/components/how-to-section";
import UseCasesSection from "@/components/use-cases-section";
import TestimonialsSection from "@/components/testimonials-section";
import FaqSection from "@/components/faq-section";

import { fallbackLng } from "@/i18n/settings";

// Root page renders the English version directly
export default function RootPage() {
  return (
  
     
      <main className="flex flex-col min-h-screen">
        <HeroSection lng={fallbackLng} />
        <PromotionalSection lng={fallbackLng} />
        <HowToSection lng={fallbackLng} />
        <UseCasesSection lng={fallbackLng} />
        <TestimonialsSection lng={fallbackLng} />
        <FaqSection lng={fallbackLng} />
      </main>
    
 
  );
}
