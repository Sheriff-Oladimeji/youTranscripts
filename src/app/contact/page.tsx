import type { Metadata } from "next";
import { Mail, MessageSquare, Users, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us - YouTranscripts",
  description:
    "Get in touch with the YouTranscripts team for support, feedback, or business inquiries.",
  keywords:
    "contact YouTranscripts, YouTube transcript support, transcript generator help, feedback",
  robots: "index, follow",
  openGraph: {
    title: "Contact Us - YouTranscripts",
    description:
      "Get in touch with the YouTranscripts team for support, feedback, or business inquiries.",
    url: "https://youtranscripts.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - YouTranscripts",
    description:
      "Get in touch with the YouTranscripts team for support, feedback, or business inquiries.",
  },
};

export default function ContactPage() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <div className="w-full py-12 md:py-16 bg-gradient-to-b from-[#b63e33] to-[#b63e33] dark:from-[#b63e33] dark:to-[#b63e33] text-white">
        <div className="w-[90%] max-w-[800px] mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl">
            We'd love to hear from you! Get in touch with our team.
          </p>
        </div>
      </div>

      <div className="w-full max-w-[800px] mx-auto px-4 py-12">
        <div className="mb-12">
          <p className="text-lg mb-6 dark:text-gray-300">
            Whether you have questions, need support, or want to give us
            feedback, we're here to help. Please feel free to reach out to us
            using the information below.
          </p>

          <div className="my-16">
            <div className="bg-gray-100 dark:bg-gray-900 p-10 rounded-lg flex flex-col items-center text-center w-full mx-auto shadow-sm border border-gray-200 dark:border-gray-800">
              <div className="bg-[#b63e33]/10 dark:bg-[#b63e33]/20 p-6 rounded-full mb-6">
                <Mail className="h-12 w-12 text-[#b63e33]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 dark:text-white">
                Email Us
              </h3>
              <p className="mb-6 text-lg dark:text-gray-300">
                For all inquiries, support, and feedback
              </p>
              <a
                href="mailto:contact@youtranscripts.com"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-xl py-3"
              >
                contact@youtranscripts.com
              </a>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 dark:text-white">
            How Can We Assist You?
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-[#b63e33]/10 dark:bg-[#b63e33]/20 p-3 rounded-full shrink-0 mt-1">
                <Zap className="h-6 w-6 text-[#b63e33]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">
                  Technical Support
                </h3>
                <p className="dark:text-gray-300">
                  For issues related to using our transcription tools, account
                  access, or any other technical matters, please email us at{" "}
                  <a
                    href="mailto:contact@youtranscripts.com"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    contact@youtranscripts.com
                  </a>{" "}
                  with details of the problem you're experiencing. Screenshots
                  or error messages are helpful.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-[#b63e33]/10 dark:bg-[#b63e33]/20 p-3 rounded-full shrink-0 mt-1">
                <MessageSquare className="h-6 w-6 text-[#b63e33]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">
                  Feedback & Suggestions
                </h3>
                <p className="dark:text-gray-300">
                  We're always looking to improve! Let us know your thoughts at{" "}
                  <a
                    href="mailto:contact@youtranscripts.com"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    contact@youtranscripts.com
                  </a>{" "}
                  on how we can make YouTranscripts better or if there's
                  anything you'd like to see added to our platform.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-[#b63e33]/10 dark:bg-[#b63e33]/20 p-3 rounded-full shrink-0 mt-1">
                <Users className="h-6 w-6 text-[#b63e33]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">
                  Business Partnerships
                </h3>
                <p className="dark:text-gray-300">
                  Interested in collaborating or partnering with us? We'd be
                  happy to discuss opportunities. Please email us at{" "}
                  <a
                    href="mailto:contact@youtranscripts.com"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    contact@youtranscripts.com
                  </a>{" "}
                  with details about your organization and the nature of the
                  partnership you're proposing.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-muted p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">
            Response Time
          </h2>
          <p className="text-center dark:text-gray-300">
            We strive to respond to all inquiries within 24-48 hours during
            business days. For urgent matters, please indicate this in your
            email subject line.
          </p>
        </div>
      </div>
    </main>
  );
}
