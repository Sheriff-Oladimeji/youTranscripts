import type { Metadata } from "next";
import { Mail, MessageSquare, Users, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us - YouTranscripts",
  description: "Get in touch with the YouTranscripts team for support, feedback, or business inquiries.",
  robots: "index, follow",
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
          <p className="text-lg mb-6">
            Whether you have questions, need support, or want to give us feedback, we're here to help. Please feel free to reach out to us using the information below.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <div className="bg-muted p-6 rounded-lg flex flex-col items-center text-center">
              <div className="bg-[#b63e33]/10 p-4 rounded-full mb-4">
                <Mail className="h-8 w-8 text-[#b63e33]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <p className="mb-4">For general inquiries and support</p>
              <a 
                href="mailto:contact@youtranscripts.com" 
                className="text-blue-600 hover:underline font-medium"
              >
                contact@youtranscripts.com
              </a>
            </div>
            
            <div className="bg-muted p-6 rounded-lg flex flex-col items-center text-center">
              <div className="bg-[#b63e33]/10 p-4 rounded-full mb-4">
                <MessageSquare className="h-8 w-8 text-[#b63e33]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Support</h3>
              <p className="mb-4">Need help with our services?</p>
              <a 
                href="mailto:support@youtranscripts.com" 
                className="text-blue-600 hover:underline font-medium"
              >
                support@youtranscripts.com
              </a>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">How Can We Assist You?</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-[#b63e33]/10 p-3 rounded-full shrink-0 mt-1">
                <Zap className="h-6 w-6 text-[#b63e33]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Technical Support</h3>
                <p>
                  For issues related to using our transcription tools, account access, or any other technical matters, please email us with details of the problem you're experiencing. Screenshots or error messages are helpful.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-[#b63e33]/10 p-3 rounded-full shrink-0 mt-1">
                <MessageSquare className="h-6 w-6 text-[#b63e33]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Feedback & Suggestions</h3>
                <p>
                  We're always looking to improve! Let us know your thoughts on how we can make YouTranscripts better or if there's anything you'd like to see added to our platform.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-[#b63e33]/10 p-3 rounded-full shrink-0 mt-1">
                <Users className="h-6 w-6 text-[#b63e33]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Business Partnerships</h3>
                <p>
                  Interested in collaborating or partnering with us? We'd be happy to discuss opportunities. Please include details about your organization and the nature of the partnership you're proposing.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-muted p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Response Time</h2>
          <p className="text-center">
            We strive to respond to all inquiries within 24-48 hours during business days. For urgent matters, please indicate this in your email subject line.
          </p>
        </div>
      </div>
    </main>
  );
}
