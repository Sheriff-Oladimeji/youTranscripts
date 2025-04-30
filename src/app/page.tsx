import type { Metadata } from "next";
import HeroSection from "@/components/hero-section";
import PromotionalSection from "@/components/promotional-section";
import HowToSection from "@/components/how-to-section";
import UseCasesSection from "@/components/use-cases-section";
import TestimonialsSection from "@/components/testimonials-section";
import FaqSection from "@/components/faq-section";

export const metadata: Metadata = {
  title: "YouTranscripts - Generate YouTube Transcripts for FREE",
  description:
    "Use our free YouTube transcript extractor and Convert any YouTube video to Text in one click. No Signup & Free Unlimited Usage.",
  keywords:
    "YouTube transcript, YouTube to text, video transcription, free transcript generator, YouTube captions",
  robots: "index, follow",
  openGraph: {
    title: "YouTranscripts - Free YouTube Transcript Generator",
    description:
      "Convert any YouTube video to text in one click. Free, no signup required.",
    url: "https://youtranscripts.com",
    siteName: "YouTranscripts",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTranscripts - Free YouTube Transcript Generator",
    description:
      "Convert any YouTube video to text in one click. Free, no signup required.",
  },
};

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
