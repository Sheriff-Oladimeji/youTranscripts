import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - YouTranscripts",
  description:
    "Terms and conditions for using YouTranscripts, the free YouTube transcript generator.",
  keywords:
    "terms of service, terms and conditions, YouTranscripts terms, legal terms",
  robots: "index, follow",
  openGraph: {
    title: "Terms of Service - YouTranscripts",
    description:
      "Terms and conditions for using YouTranscripts, the free YouTube transcript generator.",
    url: "https://youtranscripts.com/terms",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service - YouTranscripts",
    description:
      "Terms and conditions for using YouTranscripts, the free YouTube transcript generator.",
  },
};

export default function TermsPage() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <div className="w-full py-12 md:py-16 bg-gradient-to-b from-[#b63e33] to-[#b63e33] dark:from-[#b63e33] dark:to-[#b63e33] text-white">
        <div className="w-[90%] max-w-[800px] mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Terms of Service
          </h1>
          <p className="text-lg md:text-xl">Last Updated: 1st May 2025</p>
        </div>
      </div>

      <div className="w-full max-w-[800px] mx-auto px-4 py-12">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="p-6 mb-6 rounded-md bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <p className="text-lg">
              <strong>Welcome to YouTranscripts.com</strong> ("the Site", "we",
              "us", or "our"). By accessing or using our website, you agree to
              comply with and be bound by these Terms of Service ("Terms"),
              including our{" "}
              <a
                href="/privacy"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Privacy Policy
              </a>
              . If you do not agree to these Terms, you should not access or use
              the Site.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            1. Acceptance of Terms
          </h2>
          <p className="text-base">
            By using YouTranscripts.com, you agree to these Terms of Service and
            any additional terms that apply to specific services provided by us.
            We may update these Terms from time to time, and such changes will
            be posted on this page. Your continued use of the Site after any
            changes are posted will constitute your acceptance of those changes.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            2. Description of Services
          </h2>
          <p className="text-base">
            <strong>
              YouTranscripts.com provides a tool to generate transcripts for
              YouTube videos
            </strong>
            , enabling users to convert video audio into written text. These
            services may include but are not limited to:
          </p>
          <ul>
            <li>Transcription services for YouTube videos</li>
            <li>Search and retrieval of transcript data</li>
            <li>Other related services as offered by us from time to time</li>
          </ul>
          <p className="text-base">
            You agree to use the services provided solely for lawful purposes
            and in accordance with these Terms.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">3. Eligibility</h2>
          <p className="text-base">
            You must be at least <strong>18 years old</strong> to use the Site.
            By using the Site, you represent that you are of legal age to form a
            binding contract and are not prohibited from using the services
            under applicable law.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            4. Account Registration
          </h2>
          <p className="text-base">
            To access certain features of the Site, you may be required to
            register for an account. You agree to provide accurate and complete
            information during the registration process and to update it if
            there are any changes. You are responsible for maintaining the
            confidentiality of your account information and for all activities
            that occur under your account.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">5. User Conduct</h2>
          <p className="text-base">
            By using the Site, you agree <strong>not to</strong>:
          </p>
          <ul>
            <li>
              Use the Site for any unlawful purpose or to promote illegal
              activities.
            </li>
            <li>
              Interfere with or disrupt the services or servers connected to the
              Site.
            </li>
            <li>
              Impersonate any person or entity or falsely claim an affiliation
              with any person or entity.
            </li>
            <li>
              Upload, post, or transmit content that infringes on the
              intellectual property rights of others, is offensive, abusive, or
              violates the rights of others.
            </li>
            <li>
              Engage in any behavior that could damage the reputation of
              YouTranscripts.com.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-6 mb-3">6. Restrictions</h2>
          <p className="text-base">
            You agree <strong>not to</strong>:
          </p>
          <ul>
            <li>
              Reproduce, distribute, modify, or create derivative works of any
              part of the Site without prior written consent from
              YouTranscripts.com.
            </li>
            <li>
              Use the Site in any way that could disable, overburden, or damage
              the Site or interfere with other users' enjoyment of the Site.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            7. Payment & Subscription
          </h2>
          <p className="text-base">
            Certain features of the Site may require payment. By accessing paid
            features, you agree to the following:
          </p>
          <ul>
            <li>
              You are responsible for all charges and fees associated with your
              use of the paid services.
            </li>
            <li>
              Payments must be made through the available payment methods, and
              you agree to provide valid billing information.
            </li>
            <li>
              Subscription services are subject to renewal unless canceled by
              you in accordance with the cancellation policy.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            8. Termination and Suspension
          </h2>
          <p className="text-base">
            We reserve the right to suspend or terminate your access to the Site
            or services at any time for any reason, including but not limited to
            a violation of these Terms. Upon termination, you must cease all use
            of the Site, and any unpaid fees will become due immediately.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            9. Intellectual Property
          </h2>
          <p className="text-base">
            The content, features, and functionality of the Site are owned by
            YouTranscripts.com and are protected by copyright, trademark, and
            other intellectual property laws. You agree not to copy, reproduce,
            or use any of the content from the Site without our express
            permission.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">10. Privacy Policy</h2>
          <p className="text-base">
            Your use of the Site is also governed by our Privacy Policy, which
            can be found on our{" "}
            <a href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy Page
            </a>
            . By using the Site, you consent to the collection and use of your
            data as described in the Privacy Policy.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            11. Disclaimers and Limitation of Liability
          </h2>
          <p className="text-base">
            The services provided by YouTranscripts.com are offered{" "}
            <strong>"as is" and "as available."</strong> We do not guarantee
            that the Site will be free of errors, interruptions, or defects. You
            agree that YouTranscripts.com shall not be liable for any damages
            arising from your use or inability to use the Site or its services,
            including but not limited to any loss of data or profits.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">12. Indemnification</h2>
          <p className="text-base">
            You agree to indemnify and hold YouTranscripts.com, its affiliates,
            directors, employees, agents, and licensors harmless from any
            claims, damages, or losses arising out of your use of the Site or
            your violation of these Terms.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">13. Governing Law</h2>
          <p className="text-base">
            These Terms shall be governed by and construed in accordance with
            the laws of India, without regard to its conflict of law principles.
            Any disputes arising under these Terms shall be resolved in the
            competent courts located in India.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            14. Modifications to the Terms of Service
          </h2>
          <p className="text-base">
            We may revise and update these Terms at any time. All changes are
            effective immediately upon posting to the Site. You are encouraged
            to review these Terms periodically to stay informed about any
            updates.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            15. Contact Information
          </h2>
          <p className="text-base">
            For any questions regarding these Terms of Service, please contact
            us at:
          </p>
          <p className="text-base mt-2">
            <strong>YouTranscripts.com</strong>
            <br />
            Email:{" "}
            <a
              href="mailto:contact@youtranscripts.com"
              className="text-blue-600 hover:underline"
            >
              contact@youtranscripts.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
