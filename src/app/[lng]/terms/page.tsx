import type { Metadata } from "next";
import { getT } from "@/i18n";

export async function generateMetadata({ params }: { params: { lng: string } }): Promise<Metadata> {
  const { t } = await getT();
  
  return {
    title: "Terms & Conditions | YouTranscripts",
    description:
      "Review the terms and conditions that govern the use of YouTranscripts. By accessing our service, you agree to comply with these guidelines.",
    robots: "index, follow",
    openGraph: {
      title: "Terms & Conditions | YouTranscripts",
      description:
        "Review the terms and conditions that govern the use of YouTranscripts. By accessing our service, you agree to comply with these guidelines.",
      url: "https://youtranscripts.com/terms",
      siteName: "YouTranscripts",
      type: "website",
      locale: params.lng === "en" ? "en_US" : params.lng === "es" ? "es_ES" : "pt_BR",
    },
    twitter: {
      card: "summary_large_image",
      title: "Terms & Conditions | YouTranscripts",
      description:
        "Review the terms and conditions that govern the use of YouTranscripts. By accessing our service, you agree to comply with these guidelines.",
    },
  };
}

export default async function TermsPage({ params }: { params: { lng: string } }) {
  const { t } = await getT();
  
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <div className="w-full py-12 md:py-16 bg-gradient-to-b from-[#b63e33] to-[#b63e33] dark:from-[#b63e33] dark:to-[#b63e33] text-white">
        <div className="w-[90%] max-w-[800px] mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('terms.title')}
          </h1>
          <p className="text-lg md:text-xl">{t('terms.lastUpdated')}</p>
        </div>
      </div>

      <div className="w-[90%] max-w-[800px] mx-auto py-12">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using YouTranscripts.com ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            YouTranscripts provides a tool for extracting and displaying transcripts from YouTube videos. The Service may also offer translation and download capabilities for these transcripts.
          </p>

          <h2>3. Fair Use and Copyright</h2>
          <p>
            <strong>3.1.</strong> YouTranscripts respects the intellectual property rights of others and expects users to do the same.
          </p>
          <p>
            <strong>3.2.</strong> The transcripts generated through our Service are derived from publicly available captions on YouTube videos. We do not create or modify the content of these transcripts.
          </p>
          <p>
            <strong>3.3.</strong> Users are responsible for ensuring their use of transcripts complies with applicable copyright laws and fair use principles.
          </p>
          <p>
            <strong>3.4.</strong> If you believe that your copyrighted work has been used in a way that constitutes copyright infringement, please contact us at contact@youtranscripts.com.
          </p>

          <h2>4. User Conduct</h2>
          <p>
            <strong>4.1.</strong> You agree not to use the Service to:
          </p>
          <ul>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe upon the rights of others</li>
            <li>Attempt to gain unauthorized access to the Service or its related systems</li>
            <li>Interfere with or disrupt the integrity or performance of the Service</li>
            <li>Engage in any activity that could harm or impair the Service</li>
          </ul>
          <p>
            <strong>4.2.</strong> We reserve the right to terminate or restrict your access to the Service if, in our determination, you have violated these Terms.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            <strong>5.1.</strong> The Service is provided on an "as is" and "as available" basis without warranties of any kind.
          </p>
          <p>
            <strong>5.2.</strong> We do not guarantee the accuracy, completeness, or reliability of any transcripts generated through the Service.
          </p>
          <p>
            <strong>5.3.</strong> In no event shall YouTranscripts, its operators, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Service.
          </p>

          <h2>6. Modifications to the Service and Terms</h2>
          <p>
            <strong>6.1.</strong> We reserve the right to modify or discontinue the Service at any time without notice.
          </p>
          <p>
            <strong>6.2.</strong> We may update these Terms from time to time. Continued use of the Service after any changes indicates your acceptance of the modified Terms.
          </p>

          <h2>7. Third-Party Links and Services</h2>
          <p>
            <strong>7.1.</strong> The Service may contain links to third-party websites or services that are not owned or controlled by YouTranscripts.
          </p>
          <p>
            <strong>7.2.</strong> We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
          </p>

          <h2>8. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which YouTranscripts operates, without regard to its conflict of law provisions.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at contact@youtranscripts.com.
          </p>
        </div>
      </div>
    </main>
  );
}
