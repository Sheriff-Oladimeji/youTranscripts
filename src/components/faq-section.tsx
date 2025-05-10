"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { useT } from "@/i18n/client";

type FaqItem = {
  question: string;
  answer: string;
};

interface FaqSectionProps {
  lng?: string;
}

export default function FaqSection({ lng }: FaqSectionProps) {
  const { t } = useT();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems: FaqItem[] = [
    {
      question: t("faq.questions.q1"),
      answer: t("faq.questions.a1"),
    },
    {
      question: t("faq.questions.q2"),
      answer: t("faq.questions.a2"),
    },
    {
      question: t("faq.questions.q3"),
      answer: t("faq.questions.a3"),
    },
    {
      question: t("faq.questions.q4"),
      answer: t("faq.questions.a4"),
    },
    {
      question: t("faq.questions.q5"),
      answer: t("faq.questions.a5"),
    },
    {
      question: t("faq.questions.q6"),
      answer: t("faq.questions.a6"),
    },
    {
      question: t("faq.questions.q7"),
      answer: t("faq.questions.a7"),
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="w-full py-16 md:py-20 bg-[#f5f5f5] dark:bg-gray-900"
      id="faq"
    >
      <div className="w-[90%] mx-auto">
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 max-w-4xl">
            {t("faq.title")}
          </h2>
          <p className="max-w-[800px] text-lg mb-10">{t("faq.subtitle")}</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm"
            >
              <button
                className="flex justify-between items-center w-full p-4 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => toggleFaq(index)}
              >
                <h3 className="text-lg font-medium">{item.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              // Scroll to the top of the page (hero section)
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg transition-colors cursor-pointer"
          >
            {t("faq.tryButton")}
          </a>
        </div>
      </div>
    </section>
  );
}
