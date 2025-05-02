import type { Metadata } from "next";
import HeroSection from "@/components/hero-section";
import PromotionalSection from "@/components/promotional-section";
import HowToSection from "@/components/how-to-section";
import UseCasesSection from "@/components/use-cases-section";
import TestimonialsSection from "@/components/testimonials-section";
import FaqSection from "@/components/faq-section";

export const metadata: Metadata = {
  title: "100% Free YouTube Transcript Generator - No Signup [2025]",
  description:
    "Use our Free & Fast YouTube Video Transcript extractor and convert any YouTube video to text in just 2 seconds. Copy, Translate & Download in one click.",
  keywords:
    "YouTube transcript, YouTube to text, video transcription, free transcript generator, YouTube captions, no signup",
  robots: "index, follow",
  openGraph: {
    title: "100% Free YouTube Transcript Generator - No Signup [2025]",
    description:
      "Use our Free & Fast YouTube Video Transcript extractor and convert any YouTube video to text in just 2 seconds. Copy, Translate & Download in one click.",
    url: "https://youtranscripts.com",
    siteName: "YouTranscripts",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "100% Free YouTube Transcript Generator - No Signup [2025]",
    description:
      "Use our Free & Fast YouTube Video Transcript extractor and convert any YouTube video to text in just 2 seconds. Copy, Translate & Download in one click.",
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
