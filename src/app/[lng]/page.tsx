import HeroSection from "@/components/hero-section";
import PromotionalSection from "@/components/promotional-section";
import HowToSection from "@/components/how-to-section";
import UseCasesSection from "@/components/use-cases-section";
import TestimonialsSection from "@/components/testimonials-section";
import FaqSection from "@/components/faq-section";
import type { Metadata } from "next";

// Generate metadata based on language
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  // We don't need the translation function for metadata
  const lng = resolvedParams.lng;

  // Define metadata based on language
  if (lng === "es") {
    return {
      title:
        "100% Gratis - Transcribir Videos de YouTube a Texto sin Registro [2025]",
      description:
        "Transcribe cualquier video de YouTube a texto en solo 2 segundos con nuestra herramienta gratuita y rápida. Sin registro. Copia, traduce y descarga la transcripción en un clic.",
      openGraph: {
        title:
          "100% Gratis - Transcribir Videos de YouTube a Texto sin Registro [2025]",
        description:
          "Transcribe cualquier video de YouTube a texto en solo 2 segundos con nuestra herramienta gratuita y rápida. Sin registro. Copia, traduce y descarga la transcripción en un clic.",
        url: "https://youtranscripts.com/es",
        siteName: "YouTranscripts",
        type: "website",
        locale: "es_ES",
      },
      twitter: {
        card: "summary_large_image",
        title:
          "100% Gratis - Transcribir Videos de YouTube a Texto sin Registro [2025]",
        description:
          "Transcribe cualquier video de YouTube a texto en solo 2 segundos con nuestra herramienta gratuita y rápida. Sin registro. Copia, traduce y descarga la transcripción en un clic.",
      },
    };
  } else if (lng === "pt") {
    return {
      title:
        "100% Grátis - Transcrever Vídeos do YouTube para Texto Sem Cadastro [2025]",
      description:
        "Transcreva qualquer vídeo do YouTube para texto em apenas 2 segundos com nossa ferramenta online gratuita. Sem login, sem complicações. Copie, traduza e baixe com um clique.",
      openGraph: {
        title:
          "100% Grátis - Transcrever Vídeos do YouTube para Texto Sem Cadastro [2025]",
        description:
          "Transcreva qualquer vídeo do YouTube para texto em apenas 2 segundos com nossa ferramenta online gratuita. Sem login, sem complicações. Copie, traduza e baixe com um clique.",
        url: "https://youtranscripts.com/pt",
        siteName: "YouTranscripts",
        type: "website",
        locale: "pt_BR",
      },
      twitter: {
        card: "summary_large_image",
        title:
          "100% Grátis - Transcrever Vídeos do YouTube para Texto Sem Cadastro [2025]",
        description:
          "Transcreva qualquer vídeo do YouTube para texto em apenas 2 segundos com nossa ferramenta online gratuita. Sem login, sem complicações. Copie, traduza e baixe com um clique.",
      },
    };
  }

  // Default metadata (should not be reached as English uses the root layout)
  return {};
}

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
