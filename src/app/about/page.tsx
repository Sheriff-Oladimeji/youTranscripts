import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About YouTranscripts - Free YouTube Transcript Generator",
  description:
    "Learn about YouTranscripts, the free tool that helps you generate, translate, and download YouTube video transcripts in multiple formats.",
  robots: "index, follow",
};

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <div className="w-full py-12 md:py-24 bg-gradient-to-b from-[#b63e33] to-[#b63e33] dark:from-[#b63e33] dark:to-[#b63e33] text-white">
        <div className="w-[90%] max-w-[800px] mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About YouTranscripts
          </h1>
          <p className="text-lg md:text-xl">
            The free YouTube transcript generator you can trust
          </p>
        </div>
      </div>

      <div className="w-full max-w-[800px] mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg mb-4">
            YouTranscripts was created with a simple mission: to make YouTube
            content more accessible to everyone. We believe that the valuable
            information, education, and entertainment found in YouTube videos
            should be available in text format for those who prefer reading,
            need to reference specific parts, or require accessibility options.
          </p>
          <p className="text-lg mb-4">
            Our free tool allows anyone to quickly generate transcripts from any
            YouTube video, translate them into multiple languages, and download
            them in various formats for different uses.
          </p>
          <p className="text-lg mb-4">
            Founded in 2023, YouTranscripts has quickly become a trusted
            resource for students, researchers, content creators, and
            professionals worldwide who need quick and reliable access to
            YouTube video content in text form.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">
                Free Transcript Generation
              </h3>
              <p>
                Generate transcripts from any YouTube video without paying a
                penny. No hidden fees, no subscriptions, just a simple and
                effective service.
              </p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Multiple Languages</h3>
              <p>
                Access transcripts in all available languages from the original
                video and translate them to over 125 languages.
              </p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Easy Download Options</h3>
              <p>
                Download transcripts in multiple formats including TXT, PDF,
                DOCX, SRT, and CSV for different use cases.
              </p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">AI Integration</h3>
              <p>
                Easily summarize transcripts with ChatGPT and other AI tools
                with our one-click integration.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Who Can Benefit
          </h2>
          <ul className="list-disc pl-6 space-y-4 text-lg">
            <li>
              <strong>Students and Researchers</strong> - Extract information
              from educational videos for notes and research
            </li>
            <li>
              <strong>Content Creators</strong> - Repurpose video content into
              blog posts, articles, and social media content
            </li>
            <li>
              <strong>Language Learners</strong> - Study content in your target
              language with side-by-side translations
            </li>
            <li>
              <strong>Professionals</strong> - Extract key information from
              webinars and presentations
            </li>
            <li>
              <strong>People with Hearing Impairments</strong> - Access video
              content in text format
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Our Commitment
          </h2>
          <p className="text-lg mb-4">
            We are committed to keeping YouTranscripts free and accessible to
            everyone. We believe in the power of open access to information and
            will continue to improve our service based on user feedback.
          </p>
          <p className="text-lg">
            If you have any questions, suggestions, or feedback, please don't
            hesitate to{" "}
            <a href="/contact" className="text-blue-600 hover:underline">
              contact us
            </a>
            . We'd love to hear from you!
          </p>
        </section>
      </div>
    </main>
  );
}
