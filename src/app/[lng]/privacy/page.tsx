import type { Metadata } from "next";
import { getT } from "@/i18n";

export async function generateMetadata({ params }: { params: { lng: string } }): Promise<Metadata> {
  const { t } = await getT();
  
  return {
    title: "Privacy Policy | YouTranscripts",
    description:
      "Your privacy matters. Read how YouTranscripts collects, uses, and protects your data while ensuring a secure experience on our platform.",
    robots: "index, follow",
    openGraph: {
      title: "Privacy Policy | YouTranscripts",
      description:
        "Your privacy matters. Read how YouTranscripts collects, uses, and protects your data while ensuring a secure experience on our platform.",
      url: "https://youtranscripts.com/privacy",
      siteName: "YouTranscripts",
      type: "website",
      locale: params.lng === "en" ? "en_US" : params.lng === "es" ? "es_ES" : "pt_BR",
    },
    twitter: {
      card: "summary_large_image",
      title: "Privacy Policy | YouTranscripts",
      description:
        "Your privacy matters. Read how YouTranscripts collects, uses, and protects your data while ensuring a secure experience on our platform.",
    },
  };
}

export default async function PrivacyPage({ params }: { params: { lng: string } }) {
  const { t } = await getT();
  
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <div className="w-full py-12 md:py-16 bg-gradient-to-b from-[#b63e33] to-[#b63e33] dark:from-[#b63e33] dark:to-[#b63e33] text-white">
        <div className="w-[90%] max-w-[800px] mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('privacy.title')}
          </h1>
          <p className="text-lg md:text-xl">{t('privacy.lastUpdated')}</p>
        </div>
      </div>

      <div className="w-[90%] max-w-[800px] mx-auto py-12">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>Introduction</h2>
          <p>
            At YouTranscripts, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website.
          </p>
          <p>
            By using YouTranscripts, you agree to the collection and use of information in accordance with this policy.
          </p>

          <h2>Information We Collect</h2>
          <p>
            <strong>Usage Data:</strong> We collect anonymous usage data such as browser type, access time, pages viewed, and referring website addresses. This helps us understand how our service is being used.
          </p>
          <p>
            <strong>YouTube URLs:</strong> When you input a YouTube URL to generate a transcript, we process this URL to extract the transcript. We do not store the URLs you enter for longer than necessary to provide the service.
          </p>
          <p>
            <strong>Cookies:</strong> We use cookies to remember your preferences (such as dark/light mode) and to analyze site traffic. You can control cookies through your browser settings.
          </p>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide and maintain our service</li>
            <li>Improve and optimize our website</li>
            <li>Monitor the usage of our service</li>
            <li>Detect, prevent, and address technical issues</li>
          </ul>

          <h2>Data Sharing and Disclosure</h2>
          <p>
            We do not sell, trade, or otherwise transfer your information to third parties. However, we may share anonymous usage data with trusted analytics providers who help us analyze website traffic.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2>Your Rights</h2>
          <p>Depending on your location, you may have the following rights:</p>
          <ul>
            <li>The right to access information we hold about you</li>
            <li>The right to request correction of your personal data</li>
            <li>The right to request deletion of your personal data</li>
            <li>The right to restrict processing of your personal data</li>
            <li>The right to data portability</li>
            <li>The right to object to processing of your personal data</li>
          </ul>

          <h2>Children's Privacy</h2>
          <p>
            Our service is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
          </p>

          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at contact@youtranscripts.com.
          </p>
        </div>
      </div>
    </main>
  );
}
