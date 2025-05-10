"use client";

import { Clipboard, Globe, FileText, Languages } from "lucide-react";
import TranscriptInputForm from "./transcript-input-form";
import { useT } from "@/i18n/client";

interface PromotionalSectionProps {
  lng: string;
}

export default function PromotionalSection({ lng }: PromotionalSectionProps) {
  const { t } = useT();
  return (
    <section className="w-full py-16 md:py-20 bg-[#f5f5f5] dark:bg-gray-900">
      <div className="w-[90%] mx-auto">
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 max-w-4xl">
            {t("promotional.title")}
          </h2>
          <p className="max-w-[800px] text-lg mb-10">
            {t("promotional.subtitle")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mb-10">
            <div className="flex items-start gap-3 text-left">
              <div className="mt-1 bg-white p-2 rounded-full shadow-sm">
                <Clipboard className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">
                  {t("promotional.benefits.fast")}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t("promotional.benefits.fastDescription")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left">
              <div className="mt-1 bg-white p-2 rounded-full shadow-sm">
                <FileText className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">
                  {t("promotional.benefits.free")}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t("promotional.benefits.freeDescription")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left">
              <div className="mt-1 bg-white p-2 rounded-full shadow-sm">
                <Globe className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">
                  {t("promotional.benefits.accurate")}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t("promotional.benefits.accurateDescription")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left">
              <div className="mt-1 bg-white p-2 rounded-full shadow-sm">
                <Languages className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">
                  {t("promotional.benefits.translate")}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t("promotional.benefits.translateDescription")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 md:p-8">
          <TranscriptInputForm lng={lng} />
        </div>
      </div>
    </section>
  );
}
