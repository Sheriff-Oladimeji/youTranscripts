"use client";

import TranscriptInputForm from "./transcript-input-form";
import { useT } from "@/i18n/client";

interface HowToSectionProps {
  lng?: string;
}

export default function HowToSection({ lng }: HowToSectionProps) {
  const { t } = useT();
  return (
    <section
      className="w-full py-16 md:py-20 bg-white dark:bg-gray-800"
      id="how-to"
    >
      <div className="w-[90%] mx-auto">
        <div className="text-foreground p-8 md:p-12 mb-8">
          <div className="flex flex-col items-center text-center mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 max-w-4xl">
              {t("howTo.mainTitle")}
            </h2>
            <p className="max-w-[800px] text-lg mb-10">{t("howTo.subtitle")}</p>
          </div>

          <div className="max-w-4xl mx-auto mb-10">
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-center">
              {t("howTo.title")}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-[#f5f5f5] dark:bg-gray-700 rounded-lg shadow-sm">
                <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full mb-4 h-14 w-14 text-center">
                  <span className="text-2xl">1</span>
                </div>
                <h4 className="text-lg font-bold mb-2">
                  {t("howTo.steps.pasteGo")}
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  {t("howTo.steps.pasteGoDesc")}
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-[#f5f5f5] dark:bg-gray-700 rounded-lg shadow-sm">
                <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full mb-4 h-14 w-14 text-center">
                  <span className="text-2xl">2</span>
                </div>
                <h4 className="text-lg font-bold mb-2">
                  {t("howTo.steps.editTranslate")}
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  {t("howTo.steps.editTranslateDesc")}
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-[#f5f5f5] dark:bg-gray-700 rounded-lg shadow-sm">
                <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full mb-4 h-14 w-14 text-center">
                  <span className="text-2xl">3</span>
                </div>
                <h4 className="text-lg font-bold mb-2">
                  {t("howTo.steps.downloadShare")}
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  {t("howTo.steps.downloadShareDesc")}
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-lg mb-8">
            {t("howTo.trustedCreators")}
          </p>

          <div className="max-w-3xl mx-auto bg-[#f5f5f5] dark:bg-gray-700 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 md:p-8">
            <TranscriptInputForm
              buttonText={t("howTo.generateFreeTranscript")}
              lng={lng}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
