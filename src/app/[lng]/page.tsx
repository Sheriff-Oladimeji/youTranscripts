import HeroSection from "@/components/hero-section";
import PromotionalSection from "@/components/promotional-section";
import HowToSection from "@/components/how-to-section";
import UseCasesSection from "@/components/use-cases-section";
import TestimonialsSection from "@/components/testimonials-section";
import FaqSection from "@/components/faq-section";

// Metadata is now handled in the root layout

export default async function Home({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const resolvedParams = await params;
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection lng={resolvedParams.lng} />
      <PromotionalSection lng={resolvedParams.lng} />
      <HowToSection lng={resolvedParams.lng} />
      <UseCasesSection lng={resolvedParams.lng} />
      <TestimonialsSection lng={resolvedParams.lng} />
      <FaqSection lng={resolvedParams.lng} />
    </main>
  );
}
