import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { getT } from "@/i18n";

export async function generateMetadata({ params }: { params: { lng: string } }): Promise<Metadata> {
  const { t } = await getT();
  
  return {
    title: "Contact Us | YouTranscripts Support",
    description:
      "Need help or have questions? Reach out to the YouTranscripts team – we're here to assist with anything related to YouTube transcript extraction.",
    robots: "index, follow",
    openGraph: {
      title: "Contact Us | YouTranscripts Support",
      description:
        "Need help or have questions? Reach out to the YouTranscripts team – we're here to assist with anything related to YouTube transcript extraction.",
      url: "https://youtranscripts.com/contact",
      siteName: "YouTranscripts",
      type: "website",
      locale: params.lng === "en" ? "en_US" : params.lng === "es" ? "es_ES" : "pt_BR",
    },
    twitter: {
      card: "summary_large_image",
      title: "Contact Us | YouTranscripts Support",
      description:
        "Need help or have questions? Reach out to the YouTranscripts team – we're here to assist with anything related to YouTube transcript extraction.",
    },
  };
}

export default async function ContactPage({ params }: { params: { lng: string } }) {
  const { t } = await getT();
  
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <div className="w-full py-12 md:py-16 bg-gradient-to-b from-[#b63e33] to-[#b63e33] dark:from-[#b63e33] dark:to-[#b63e33] text-white">
        <div className="w-[90%] max-w-[800px] mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('contact.title')}</h1>
          <p className="text-lg md:text-xl">
            {t('contact.subtitle')}
          </p>
        </div>
      </div>

      <div className="w-[90%] max-w-[800px] mx-auto py-12">
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-card rounded-lg shadow-md p-6 border border-border flex flex-col items-center text-center">
            <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full mb-4">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">{t('contact.email')}</h2>
            <p className="text-muted-foreground mb-4">
              For support, feedback, or business inquiries
            </p>
            <a
              href="mailto:contact@youtranscripts.com"
              className="text-primary hover:underline font-medium"
            >
              {t('contact.emailAddress')}
            </a>
          </div>
        </div>

        <div className="mt-12 prose prose-lg dark:prose-invert max-w-none">
          <h2>Frequently Asked Questions</h2>
          <p>
            Before contacting us, you might find answers to common questions on our FAQ section on the homepage.
          </p>

          <h2>Feedback and Suggestions</h2>
          <p>
            We're always looking to improve YouTranscripts. If you have suggestions for new features or improvements, please let us know via email.
          </p>

          <h2>Report Issues</h2>
          <p>
            If you encounter any problems while using our service, please provide the following information when reporting:
          </p>
          <ul>
            <li>The YouTube URL you were trying to transcribe</li>
            <li>The browser and device you were using</li>
            <li>A description of what happened</li>
            <li>Any error messages you received</li>
          </ul>

          <h2>Business Inquiries</h2>
          <p>
            For partnership opportunities, advertising inquiries, or other business matters, please reach out via email with details of your proposal.
          </p>
        </div>
      </div>
    </main>
  );
}
