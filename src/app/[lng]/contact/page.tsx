import type { Metadata } from "next";
import { Mail, MessageSquare, Users, Zap } from "lucide-react";
import { getT } from "@/i18n";

export async function generateMetadata({
  params,
}: {
  params: { lng: string };
}): Promise<Metadata> {
  const { t } = await getT(undefined, undefined, params.lng);

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
      locale:
        params.lng === "en" ? "en_US" : params.lng === "es" ? "es_ES" : "pt_BR",
    },
    twitter: {
      card: "summary_large_image",
      title: "Contact Us | YouTranscripts Support",
      description:
        "Need help or have questions? Reach out to the YouTranscripts team – we're here to assist with anything related to YouTube transcript extraction.",
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: { lng: string };
}) {
  const { t } = await getT(undefined, undefined, params.lng);

  return (
    <main className="flex flex-col min-h-screen bg-background">
      <div className="w-full py-12 md:py-16 bg-gradient-to-b from-[#b63e33] to-[#b63e33] dark:from-[#b63e33] dark:to-[#b63e33] text-white">
        <div className="w-[90%] max-w-[800px] mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("contact.title")}
          </h1>
          <p className="text-lg md:text-xl">{t("contact.subtitle")}</p>
        </div>
      </div>

      <div className="w-full max-w-[800px] mx-auto px-4 py-12">
        <div className="mb-12">
          <p className="text-lg mb-6 dark:text-gray-300">
            {t("contact.intro")}
          </p>

          <div className="my-16">
            <div className="bg-gray-100 dark:bg-gray-900 p-10 rounded-lg flex flex-col items-center text-center w-full mx-auto shadow-sm border border-gray-200 dark:border-gray-800">
              <div className="bg-[#b63e33]/10 dark:bg-[#b63e33]/20 p-6 rounded-full mb-6">
                <Mail className="h-12 w-12 text-[#b63e33]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 dark:text-white">
                {t("contact.emailCard.title")}
              </h3>
              <p className="mb-6 text-lg dark:text-gray-300">
                {t("contact.emailCard.description")}
              </p>
              <a
                href="mailto:contact@youtranscripts.com"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-xl py-3"
              >
                {t("contact.emailAddress")}
              </a>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 dark:text-white">
            {t("contact.sections.assist.title")}
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-[#b63e33]/10 dark:bg-[#b63e33]/20 p-3 rounded-full shrink-0 mt-1">
                <Zap className="h-6 w-6 text-[#b63e33]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">
                  {t("contact.sections.assist.technical.title")}
                </h3>
                <p className="dark:text-gray-300">
                  {t("contact.sections.assist.technical.content")}{" "}
                  <a
                    href="mailto:contact@youtranscripts.com"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {t("contact.emailAddress")}
                  </a>{" "}
                  {t("contact.sections.assist.technical.additional")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-[#b63e33]/10 dark:bg-[#b63e33]/20 p-3 rounded-full shrink-0 mt-1">
                <MessageSquare className="h-6 w-6 text-[#b63e33]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">
                  {t("contact.sections.assist.feedback.title")}
                </h3>
                <p className="dark:text-gray-300">
                  {t("contact.sections.assist.feedback.content")}{" "}
                  <a
                    href="mailto:contact@youtranscripts.com"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {t("contact.emailAddress")}
                  </a>{" "}
                  {t("contact.sections.assist.feedback.additional")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-[#b63e33]/10 dark:bg-[#b63e33]/20 p-3 rounded-full shrink-0 mt-1">
                <Users className="h-6 w-6 text-[#b63e33]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">
                  {t("contact.sections.assist.business.title")}
                </h3>
                <p className="dark:text-gray-300">
                  {t("contact.sections.assist.business.content")}{" "}
                  <a
                    href="mailto:contact@youtranscripts.com"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {t("contact.emailAddress")}
                  </a>{" "}
                  {t("contact.sections.assist.business.additional")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-muted p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">
            {t("contact.sections.response.title")}
          </h2>
          <p className="text-center dark:text-gray-300">
            {t("contact.sections.response.content")}
          </p>
        </div>
      </div>
    </main>
  );
}
