import type { Metadata } from "next";
import { getT } from "@/i18n";

export async function generateMetadata({ params }: { params: { lng: string } }): Promise<Metadata> {
  const { t } = await getT();
  
  return {
    title: "About | YouTranscripts",
    description:
      "Learn about YouTranscripts - the free YouTube transcript generator trusted by over 500,000 users worldwide.",
    robots: "index, follow",
    openGraph: {
      title: "About | YouTranscripts",
      description:
        "Learn about YouTranscripts - the free YouTube transcript generator trusted by over 500,000 users worldwide.",
      url: "https://youtranscripts.com/about",
      siteName: "YouTranscripts",
      type: "website",
      locale: params.lng === "en" ? "en_US" : params.lng === "es" ? "es_ES" : "pt_BR",
    },
    twitter: {
      card: "summary_large_image",
      title: "About | YouTranscripts",
      description:
        "Learn about YouTranscripts - the free YouTube transcript generator trusted by over 500,000 users worldwide.",
    },
  };
}

export default async function AboutPage({ params }: { params: { lng: string } }) {
  const { t } = await getT();
  
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <div className="w-full py-12 md:py-24 bg-gradient-to-b from-[#b63e33] to-[#b63e33] dark:from-[#b63e33] dark:to-[#b63e33] text-white">
        <div className="w-[90%] max-w-[800px] mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('about.title')}
          </h1>
          <p className="text-lg md:text-xl">
            {t('about.subtitle')}
          </p>
        </div>
      </div>

      <div className="w-[90%] max-w-[800px] mx-auto py-12">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>Our Mission</h2>
          <p>
            At YouTranscripts, we believe in making content accessible to everyone. Our mission is to provide a simple, free tool that helps users extract and utilize the valuable information contained in YouTube videos.
          </p>

          <h2>What We Offer</h2>
          <p>
            YouTranscripts is a free online tool that extracts transcripts from YouTube videos. Our service allows you to:
          </p>
          <ul>
            <li>Generate transcripts from any YouTube video with captions</li>
            <li>Copy the entire transcript with one click</li>
            <li>Translate transcripts into multiple languages</li>
            <li>Download transcripts in various formats (TXT, DOCX, SRT, CSV)</li>
            <li>All without creating an account or paying a fee</li>
          </ul>

          <h2>Who Uses YouTranscripts</h2>
          <p>
            Our tool is used by a diverse range of people including:
          </p>
          <ul>
            <li>Students researching for assignments</li>
            <li>Content creators repurposing video content</li>
            <li>Journalists transcribing interviews</li>
            <li>Marketers analyzing competitor videos</li>
            <li>Researchers extracting information from educational content</li>
            <li>Non-native speakers who prefer reading to listening</li>
          </ul>

          <h2>Our Values</h2>
          <p>
            We are committed to:
          </p>
          <ul>
            <li><strong>Accessibility:</strong> Making content available to everyone regardless of hearing ability or language preference</li>
            <li><strong>Simplicity:</strong> Providing a clean, easy-to-use interface without unnecessary complications</li>
            <li><strong>Privacy:</strong> Not requiring user accounts or collecting unnecessary personal data</li>
            <li><strong>Reliability:</strong> Offering a dependable service that works consistently</li>
          </ul>

          <h2>How It Works</h2>
          <p>
            YouTranscripts works by accessing the caption tracks that content creators have added to their YouTube videos. We don't generate the captions ourselves - we simply make them more accessible and useful by formatting them as readable text and offering translation options.
          </p>
        </div>
      </div>
    </main>
  );
}
