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
    title:
      "About Us | YouTranscripts - Fast & Accurate YouTube Transcript Tool",
    description:
      "Learn more about YouTranscripts – the easiest way to extract, copy, and download YouTube video transcripts. Built to save time for creators, researchers, and students.",
    keywords:
      "about YouTranscripts, YouTube transcript tool, free transcript generator, video to text converter, transcript for creators, transcript for researchers",
    robots: "index, follow",
    openGraph: {
      title:
        "About Us | YouTranscripts - Fast & Accurate YouTube Transcript Tool",
      description:
        "Learn more about YouTranscripts – the easiest way to extract, copy, and download YouTube video transcripts. Built to save time for creators, researchers, and students.",
      url: "https://youtranscripts.com/about",
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
      title:
        "About Us | YouTranscripts - Fast & Accurate YouTube Transcript Tool",
      description:
        "Learn more about YouTranscripts – the easiest way to extract, copy, and download YouTube video transcripts. Built to save time for creators, researchers, and students.",
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const resolvedParams = await params;
  const { t } = await getT(undefined, undefined, resolvedParams.lng);

  return (
    <main className="flex flex-col min-h-screen bg-background">
      <div className="w-full py-12 md:py-24 bg-gradient-to-b from-[#b63e33] to-[#b63e33] dark:from-[#b63e33] dark:to-[#b63e33] text-white">
        <div className="w-[90%] max-w-[800px] mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("about.title")}
          </h1>
          <p className="text-lg md:text-xl">{t("about.subtitle")}</p>
        </div>
      </div>

      <div className="w-full max-w-[800px] mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            {t("about.mission.title")}
          </h2>
          <p className="text-lg mb-4">{t("about.mission.p1")}</p>
          <p className="text-lg mb-4">{t("about.mission.p2")}</p>
          <p className="text-lg mb-4">{t("about.mission.p3")}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            {t("about.offer.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">
                {t("about.offer.free.title")}
              </h3>
              <p>{t("about.offer.free.description")}</p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">
                {t("about.offer.languages.title")}
              </h3>
              <p>{t("about.offer.languages.description")}</p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">
                {t("about.offer.download.title")}
              </h3>
              <p>{t("about.offer.download.description")}</p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">
                {t("about.offer.ai.title")}
              </h3>
              <p>{t("about.offer.ai.description")}</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            {t("about.benefit.title")}
          </h2>
          <ul className="list-disc pl-6 space-y-4 text-lg">
            <li>
              <strong>{t("about.benefit.students").split(" - ")[0]}</strong> -{" "}
              {t("about.benefit.students").split(" - ")[1]}
            </li>
            <li>
              <strong>{t("about.benefit.creators").split(" - ")[0]}</strong> -{" "}
              {t("about.benefit.creators").split(" - ")[1]}
            </li>
            <li>
              <strong>{t("about.benefit.learners").split(" - ")[0]}</strong> -{" "}
              {t("about.benefit.learners").split(" - ")[1]}
            </li>
            <li>
              <strong>
                {t("about.benefit.professionals").split(" - ")[0]}
              </strong>{" "}
              - {t("about.benefit.professionals").split(" - ")[1]}
            </li>
            <li>
              <strong>{t("about.benefit.impaired").split(" - ")[0]}</strong> -{" "}
              {t("about.benefit.impaired").split(" - ")[1]}
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            {t("about.commitment.title")}
          </h2>
          <p className="text-lg mb-4">{t("about.commitment.p1")}</p>
          <p className="text-lg">
            {t("about.commitment.p2")}{" "}
            <I18nLink href="/contact" className="text-blue-600 hover:underline">
              {t("about.commitment.contact")}
            </I18nLink>
            . {t("about.commitment.p3")}
          </p>
        </section>
      </div>
    </main>
  );
}
