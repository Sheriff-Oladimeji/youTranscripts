import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - YouTranscripts",
  description:
    "Privacy policy for YouTranscripts, the free YouTube transcript generator.",
  keywords:
    "privacy policy, data protection, YouTranscripts privacy, user data",
  robots: "index, follow",
  openGraph: {
    title: "Privacy Policy - YouTranscripts",
    description:
      "Privacy policy for YouTranscripts, the free YouTube transcript generator.",
    url: "https://youtranscripts.com/privacy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - YouTranscripts",
    description:
      "Privacy policy for YouTranscripts, the free YouTube transcript generator.",
  },
};

export default function PrivacyPage() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <div className="w-full py-12 md:py-16 bg-gradient-to-b from-[#b63e33] to-[#b63e33] dark:from-[#b63e33] dark:to-[#b63e33] text-white">
        <div className="w-[90%] max-w-[800px] mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl">Last Updated: 1st May 2025</p>
        </div>
      </div>

      <div className="w-full max-w-[800px] mx-auto px-4 py-12">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="p-6 mb-6 rounded-md bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <p className="text-lg">
              At <strong>YouTranscripts.com</strong> ("we", "us", "our"), we
              take your privacy seriously. This Privacy Policy outlines how we
              collect, use, and protect your personal information when you
              access and use our website, YouTranscripts.com (the "Site"). By
              using the Site, you agree to the collection and use of information
              in accordance with this policy.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            1. Information We Collect
          </h2>
          <p className="text-base">
            We collect both personal and non-personal information to provide and
            improve our services. The information we may collect includes:
          </p>

          <h3 className="text-xl font-bold mt-4 mb-2">
            a. Personal Information:
          </h3>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
              <strong>Registration Information:</strong> When you create an
              account on the Site, we collect personal information such as your
              name, email address, and any other details you provide during
              registration.
            </li>
            <li>
              <strong>Payment Information:</strong> If you make a purchase, we
              collect payment information, such as credit card details or other
              payment method details, through our secure payment processor.
            </li>
            <li>
              <strong>Communication Information:</strong> If you contact us
              through email or our support channels, we may collect your name,
              email address, and the contents of your communication for the
              purpose of responding to your inquiries.
            </li>
          </ul>

          <h3 className="text-xl font-bold mt-4 mb-2">
            b. Non-Personal Information:
          </h3>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
              <strong>Log Data:</strong> We collect information about how the
              Site is accessed and used, such as your IP address, browser type,
              browser version, the pages of our Site you visit, the time and
              date of your visit, and other diagnostic data.
            </li>
            <li>
              <strong>Cookies and Tracking Technologies:</strong> We use cookies
              to track activity on the Site and to store certain information.
              You can set your browser to refuse cookies or to alert you when
              cookies are being sent. However, if you do not accept cookies, you
              may not be able to use some portions of the Site.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            2. How We Use Your Information
          </h2>
          <p className="text-base">
            We use the information we collect in the following ways:
          </p>
          <ul>
            <li>
              <strong>To Provide Services:</strong> To operate and maintain the
              Site and offer its features, including providing you with
              transcripts for YouTube videos, user support, and account
              management.
            </li>
            <li>
              <strong>To Process Payments:</strong> To process payments for
              services purchased through the Site, including subscription or
              one-time fees.
            </li>
            <li>
              <strong>To Improve the Site:</strong> To understand how our users
              interact with the Site, which helps us improve the user
              experience, troubleshoot issues, and enhance our services.
            </li>
            <li>
              <strong>To Communicate with You:</strong> To send updates about
              your account, respond to inquiries, provide customer support, and
              send marketing communications (if you have opted into receiving
              such communications).
            </li>
            <li>
              <strong>To Comply with Legal Obligations:</strong> To comply with
              applicable laws and regulations, including enforcing our Terms of
              Service.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            3. Sharing of Your Information
          </h2>
          <p className="text-base">
            <strong>
              We do not sell or rent your personal information to third parties.
            </strong>{" "}
            However, we may share your information in the following
            circumstances:
          </p>
          <ul>
            <li>
              <strong>With Service Providers:</strong> We may share your
              information with third-party vendors, such as payment processors
              and cloud service providers, to help us operate the Site and
              provide our services. These third-party service providers are
              obligated to use your personal data solely for the purposes of
              providing their services to us.
            </li>
            <li>
              <strong>For Legal Reasons:</strong> We may disclose your personal
              information if required to do so by law, such as to comply with a
              subpoena, court order, or other legal process, or to protect our
              rights or the safety of others.
            </li>
            <li>
              <strong>In the Event of a Merger or Sale:</strong> If we are
              involved in a merger, acquisition, or asset sale, your personal
              information may be transferred as part of that transaction.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-6 mb-3">4. Data Retention</h2>
          <p className="text-base">
            We will retain your personal information for as long as necessary to
            fulfill the purposes outlined in this Privacy Policy, unless a
            longer retention period is required or permitted by law. If you
            delete your account, we will retain certain personal information as
            required by law or for legitimate business purposes.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            5. Security of Your Information
          </h2>
          <p className="text-base">
            We take reasonable measures to protect the security of your personal
            information. However, please note that no method of transmission
            over the Internet or electronic storage is 100% secure, and we
            cannot guarantee the absolute security of your data.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            6. Your Rights and Choices
          </h2>
          <p className="text-base">
            You have certain rights regarding your personal information:
          </p>
          <ul>
            <li>
              <strong>Access:</strong> You can request access to the personal
              information we hold about you.
            </li>
            <li>
              <strong>Correction:</strong> You can update or correct any
              inaccurate or incomplete information we hold about you.
            </li>
            <li>
              <strong>Deletion:</strong> You can request that we delete your
              personal information, subject to certain exceptions.
            </li>
            <li>
              <strong>Opt-Out of Marketing Communications:</strong> You can opt
              out of receiving marketing emails from us by following the
              unsubscribe instructions in the email or by contacting us directly
              at contact@youtranscripts.com.
            </li>
            <li>
              <strong>Cookies:</strong> You can manage cookies through your
              browser settings. However, disabling cookies may affect your
              ability to use certain features of the Site.
            </li>
          </ul>
          <p className="text-base">
            To exercise any of these rights, please contact us at{" "}
            <a
              href="mailto:contact@youtranscripts.com"
              className="text-blue-400 hover:underline"
            >
              contact@youtranscripts.com
            </a>
            .
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">7. Third-Party Links</h2>
          <p className="text-base">
            The Site may contain links to third-party websites or services that
            are not operated by us. We are not responsible for the privacy
            practices or content of these third-party sites. We encourage you to
            review the privacy policies of any third-party sites you visit.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            8. Children's Privacy
          </h2>
          <p className="text-base">
            The Site is not intended for use by individuals under the age of 18.
            We do not knowingly collect personal information from children under
            18. If we learn that we have inadvertently collected personal
            information from a child under 18, we will take steps to delete that
            information.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            9. International Data Transfers
          </h2>
          <p className="text-base">
            If you are accessing the Site from outside of India, please be aware
            that your information may be transferred to and processed in India.
            By using the Site, you consent to the transfer of your information
            to India and agree to comply with the laws of that jurisdiction.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            10. Changes to This Privacy Policy
          </h2>
          <p className="text-base">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page, with the "Last Updated" date at the
            top. You are encouraged to review this Privacy Policy periodically
            to stay informed about how we are protecting your information.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">11. Contact Us</h2>
          <p className="text-base">
            If you have any questions or concerns about this Privacy Policy or
            the way we handle your personal information, please contact us at:
          </p>
          <p className="text-base mt-2">
            <strong>YouTranscripts.com</strong>
            <br />
            Email:{" "}
            <a
              href="mailto:contact@youtranscripts.com"
              className="text-blue-400 hover:underline"
            >
              contact@youtranscripts.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
