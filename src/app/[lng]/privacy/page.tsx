import type { Metadata } from "next";
import { getT } from "@/i18n";

export async function generateMetadata({
  params,
}: {
  params: { lng: string };
}): Promise<Metadata> {
  const { t } = await getT(undefined, undefined, params.lng);

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
      locale:
        params.lng === "en" ? "en_US" : params.lng === "es" ? "es_ES" : "pt_BR",
    },
    twitter: {
      card: "summary_large_image",
      title: "Privacy Policy | YouTranscripts",
      description:
        "Your privacy matters. Read how YouTranscripts collects, uses, and protects your data while ensuring a secure experience on our platform.",
    },
  };
}

export default async function PrivacyPage({
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
            {t("privacy.title")}
          </h1>
          <p className="text-lg md:text-xl">{t("privacy.lastUpdated")}</p>
        </div>
      </div>

      <div className="w-full max-w-[800px] mx-auto px-4 py-12">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="p-6 mb-6 rounded-md bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <p className="text-lg">
              {t("privacy.intro.welcome")} ("we", "us", "our"),{" "}
              {t("privacy.intro.description")}
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            {t("privacy.sections.information.title")}
          </h2>
          <p className="text-base">{t("privacy.sections.information.intro")}</p>

          <h3 className="text-xl font-bold mt-4 mb-2">
            {t("privacy.sections.information.personal.title")}
          </h3>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
              <strong>
                {
                  t("privacy.sections.information.personal.registration").split(
                    ":"
                  )[0]
                }
                :
              </strong>{" "}
              {
                t("privacy.sections.information.personal.registration").split(
                  ":"
                )[1]
              }
            </li>
            <li>
              <strong>
                {
                  t("privacy.sections.information.personal.payment").split(
                    ":"
                  )[0]
                }
                :
              </strong>{" "}
              {t("privacy.sections.information.personal.payment").split(":")[1]}
            </li>
            <li>
              <strong>
                {
                  t(
                    "privacy.sections.information.personal.communication"
                  ).split(":")[0]
                }
                :
              </strong>{" "}
              {
                t("privacy.sections.information.personal.communication").split(
                  ":"
                )[1]
              }
            </li>
          </ul>

          <h3 className="text-xl font-bold mt-4 mb-2">
            {t("privacy.sections.information.nonPersonal.title")}
          </h3>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
              <strong>
                {
                  t("privacy.sections.information.nonPersonal.log").split(
                    ":"
                  )[0]
                }
                :
              </strong>{" "}
              {t("privacy.sections.information.nonPersonal.log").split(":")[1]}
            </li>
            <li>
              <strong>
                {
                  t("privacy.sections.information.nonPersonal.cookies").split(
                    ":"
                  )[0]
                }
                :
              </strong>{" "}
              {
                t("privacy.sections.information.nonPersonal.cookies").split(
                  ":"
                )[1]
              }
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            {t("privacy.sections.usage.title")}
          </h2>
          <p className="text-base">{t("privacy.sections.usage.intro")}</p>
          <ul>
            <li>
              <strong>
                {t("privacy.sections.usage.items.services").split(":")[0]}:
              </strong>{" "}
              {t("privacy.sections.usage.items.services").split(":")[1]}
            </li>
            <li>
              <strong>
                {t("privacy.sections.usage.items.payments").split(":")[0]}:
              </strong>{" "}
              {t("privacy.sections.usage.items.payments").split(":")[1]}
            </li>
            <li>
              <strong>
                {t("privacy.sections.usage.items.improve").split(":")[0]}:
              </strong>{" "}
              {t("privacy.sections.usage.items.improve").split(":")[1]}
            </li>
            <li>
              <strong>
                {t("privacy.sections.usage.items.communicate").split(":")[0]}:
              </strong>{" "}
              {t("privacy.sections.usage.items.communicate").split(":")[1]}
            </li>
            <li>
              <strong>
                {t("privacy.sections.usage.items.legal").split(":")[0]}:
              </strong>{" "}
              {t("privacy.sections.usage.items.legal").split(":")[1]}
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            {t("privacy.sections.sharing.title")}
          </h2>
          <p className="text-base">
            <strong>{t("privacy.sections.sharing.intro")}</strong>{" "}
            {t("privacy.sections.sharing.additional")}
          </p>
          <ul>
            <li>
              <strong>
                {t("privacy.sections.sharing.items.providers").split(":")[0]}:
              </strong>{" "}
              {t("privacy.sections.sharing.items.providers").split(":")[1]}
            </li>
            <li>
              <strong>
                {t("privacy.sections.sharing.items.legal").split(":")[0]}:
              </strong>{" "}
              {t("privacy.sections.sharing.items.legal").split(":")[1]}
            </li>
            <li>
              <strong>
                {t("privacy.sections.sharing.items.merger").split(":")[0]}:
              </strong>{" "}
              {t("privacy.sections.sharing.items.merger").split(":")[1]}
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            {t("privacy.sections.retention.title")}
          </h2>
          <p className="text-base">{t("privacy.sections.retention.content")}</p>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            {t("privacy.sections.security.title")}
          </h2>
          <p className="text-base">{t("privacy.sections.security.content")}</p>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            {t("privacy.sections.rights.title")}
          </h2>
          <p className="text-base">{t("privacy.sections.rights.intro")}</p>
          <ul>
            <li>
              <strong>
                {t("privacy.sections.rights.items.access").split(":")[0]}:
              </strong>{" "}
              {t("privacy.sections.rights.items.access").split(":")[1]}
            </li>
            <li>
              <strong>
                {t("privacy.sections.rights.items.correction").split(":")[0]}:
              </strong>{" "}
              {t("privacy.sections.rights.items.correction").split(":")[1]}
            </li>
            <li>
              <strong>
                {t("privacy.sections.rights.items.deletion").split(":")[0]}:
              </strong>{" "}
              {t("privacy.sections.rights.items.deletion").split(":")[1]}
            </li>
            <li>
              <strong>
                {t("privacy.sections.rights.items.optOut").split(":")[0]}:
              </strong>{" "}
              {t("privacy.sections.rights.items.optOut").split(":")[1]}
            </li>
            <li>
              <strong>
                {t("privacy.sections.rights.items.cookies").split(":")[0]}:
              </strong>{" "}
              {t("privacy.sections.rights.items.cookies").split(":")[1]}
            </li>
          </ul>
          <p className="text-base">
            {t("privacy.sections.rights.exercise")}{" "}
            <a
              href="mailto:contact@youtranscripts.com"
              className="text-blue-400 hover:underline"
            >
              {t("privacy.sections.rights.email")}
            </a>
            .
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            {t("privacy.sections.thirdParty.title")}
          </h2>
          <p className="text-base">
            {t("privacy.sections.thirdParty.content")}
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            {t("privacy.sections.children.title")}
          </h2>
          <p className="text-base">{t("privacy.sections.children.content")}</p>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            {t("privacy.sections.international.title")}
          </h2>
          <p className="text-base">
            {t("privacy.sections.international.content")}
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            {t("privacy.sections.changes.title")}
          </h2>
          <p className="text-base">{t("privacy.sections.changes.content")}</p>

          <h2 className="text-2xl font-bold mt-6 mb-3">
            {t("privacy.sections.contact.title")}
          </h2>
          <p className="text-base">{t("privacy.sections.contact.content")}</p>
          <p className="text-base mt-2">
            <strong>{t("privacy.sections.contact.company")}</strong>
            <br />
            {t("privacy.sections.contact.email")}{" "}
            <a
              href="mailto:contact@youtranscripts.com"
              className="text-blue-400 hover:underline"
            >
              {t("privacy.sections.contact.address")}
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
