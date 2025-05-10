"use client";

import HeroSection from "@/components/hero-section";
import PromotionalSection from "@/components/promotional-section";
import HowToSection from "@/components/how-to-section";
import UseCasesSection from "@/components/use-cases-section";
import TestimonialsSection from "@/components/testimonials-section";
import FaqSection from "@/components/faq-section";

// Metadata is now handled in the root layout

export default function Home({ params }: { params: { lng: string } }) {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection lng={params.lng} />
      <PromotionalSection lng={params.lng} />
      <HowToSection lng={params.lng} />
      <UseCasesSection lng={params.lng} />
      <TestimonialsSection lng={params.lng} />
      <FaqSection lng={params.lng} />
    </main>
  );
}
