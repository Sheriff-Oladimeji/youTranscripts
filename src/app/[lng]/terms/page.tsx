import type { Metadata } from "next";
import { getT } from "@/i18n";
import I18nLink from "@/components/i18n-link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const { t } = await getT(undefined, undefined, resolvedParams.lng);

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
      locale:
        resolvedParams.lng === "en"
          ? "en_US"
          : resolvedParams.lng === "es"
          ? "es_ES"
          : "pt_BR",
    },
    twitter: {
      card: "summary_large_image",
      title: "Terms & Conditions | YouTranscripts",
      description:
        "Review the terms and conditions that govern the use of YouTranscripts. By accessing our service, you agree to comply with these guidelines.",
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const resolvedParams = await params;
  const { t } = await getT(undefined, undefined, resolvedParams.lng);

  return (
    <main className="flex flex-col min-h-screen bg-background">
      <div className="w-full py-12 md:py-16 bg-gradient-to-b from-[#b63e33] to-[#b63e33] dark:from-[#b63e33] dark:to-[#b63e33] text-white">
        <div className="w-[90%] max-w-[800px] mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("terms.title")}
          </h1>
          <p className="text-lg md:text-xl">{t("terms.lastUpdated")}</p>
        </div>
      </div>

      <div className="w-full max-w-[800px] mx-auto px-4 py-12">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="p-6 mb-6 rounded-md bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <p className="text-lg">
              <strong>{t("terms.welcome.intro")}</strong> ("the Site", "we",
              "us", or "our"). {t("terms.welcome.description")}{" "}
              <I18nLink
                href="/privacy"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {t("terms.welcome.privacy")}
              </I18nLink>
              . {t("terms.welcome.disclaimer")}
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            {t("terms.sections.acceptance.title")}
          </h2>
          <p className="text-base">{t("terms.sections.acceptance.content")}</p>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            {t("terms.sections.description.title")}
          </h2>
          <p className="text-base">
            <strong>{t("terms.sections.description.intro")}</strong>
            {t("terms.sections.description.content")}
          </p>
          <ul>
            <li>{t("terms.sections.description.services.transcription")}</li>
            <li>{t("terms.sections.description.services.search")}</li>
            <li>{t("terms.sections.description.services.other")}</li>
          </ul>
          <p className="text-base">{t("terms.sections.description.usage")}</p>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            {t("terms.sections.eligibility.title")}
          </h2>
          <p className="text-base">{t("terms.sections.eligibility.content")}</p>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            {t("terms.sections.account.title")}
          </h2>
          <p className="text-base">{t("terms.sections.account.content")}</p>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            {t("terms.sections.conduct.title")}
          </h2>
          <p className="text-base">{t("terms.sections.conduct.intro")}</p>
          <ul>
            <li>{t("terms.sections.conduct.items.illegal")}</li>
            <li>{t("terms.sections.conduct.items.interfere")}</li>
            <li>{t("terms.sections.conduct.items.impersonate")}</li>
            <li>{t("terms.sections.conduct.items.infringe")}</li>
            <li>{t("terms.sections.conduct.items.damage")}</li>
          </ul>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            {t("terms.sections.restrictions.title")}
          </h2>
          <p className="text-base">{t("terms.sections.restrictions.intro")}</p>
          <ul>
            <li>{t("terms.sections.restrictions.items.reproduce")}</li>
            <li>{t("terms.sections.restrictions.items.damage")}</li>
          </ul>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            {t("terms.sections.payment.title")}
          </h2>
          <p className="text-base">{t("terms.sections.payment.intro")}</p>
          <ul>
            <li>{t("terms.sections.payment.items.charges")}</li>
            <li>{t("terms.sections.payment.items.billing")}</li>
            <li>{t("terms.sections.payment.items.renewal")}</li>
          </ul>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            {t("terms.sections.termination.title")}
          </h2>
          <p className="text-base">{t("terms.sections.termination.content")}</p>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            {t("terms.sections.intellectual.title")}
          </h2>
          <p className="text-base">
            {t("terms.sections.intellectual.content")}
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            {t("terms.sections.privacy.title")}
          </h2>
          <p className="text-base">
            {t("terms.sections.privacy.content")}{" "}
            <I18nLink href="/privacy" className="text-blue-600 hover:underline">
              {t("terms.sections.privacy.link")}
            </I18nLink>
            . {t("terms.sections.privacy.additional")}
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            {t("terms.sections.disclaimers.title")}
          </h2>
          <p className="text-base">
            {t("terms.sections.disclaimers.content")}{" "}
            <strong>{t("terms.sections.disclaimers.as_is")}</strong>{" "}
            {t("terms.sections.disclaimers.additional")}
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            {t("terms.sections.indemnification.title")}
          </h2>
          <p className="text-base">
            {t("terms.sections.indemnification.content")}
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            {t("terms.sections.governing.title")}
          </h2>
          <p className="text-base">{t("terms.sections.governing.content")}</p>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            {t("terms.sections.modifications.title")}
          </h2>
          <p className="text-base">
            {t("terms.sections.modifications.content")}
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            {t("terms.sections.contact.title")}
          </h2>
          <p className="text-base">{t("terms.sections.contact.content")}</p>
          <p className="text-base mt-2">
            <strong>{t("terms.sections.contact.company")}</strong>
            <br />
            {t("terms.sections.contact.email")}{" "}
            <a
              href="mailto:contact@youtranscripts.com"
              className="text-blue-600 hover:underline"
            >
              {t("terms.sections.contact.address")}
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
