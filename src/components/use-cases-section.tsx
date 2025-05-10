import { Briefcase, Video, FileText, GraduationCap } from "lucide-react";
import { useT } from "@/i18n/client";

interface UseCasesSectionProps {
  lng?: string;
}

export default function UseCasesSection({ lng }: UseCasesSectionProps) {
  const { t } = useT();
  return (
    <section className="w-full py-16 md:py-20 bg-[#f5f5f5] dark:bg-gray-900">
      <div className="w-[90%] mx-auto">
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 max-w-4xl">
            {t("useCases.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="flex items-start gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="mt-1 bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
              <Briefcase className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold mb-2">
                {t("useCases.marketers.title")}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {t("useCases.marketers.description")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="mt-1 bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
              <Video className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold mb-2">
                {t("useCases.creators.title")}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {t("useCases.creators.description")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="mt-1 bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
              <FileText className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold mb-2">
                {t("useCases.journalists.title")}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {t("useCases.journalists.description")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="mt-1 bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
              <GraduationCap className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold mb-2">
                {t("useCases.researchers.title")}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {t("useCases.researchers.description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
