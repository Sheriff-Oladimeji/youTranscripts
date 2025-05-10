"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { useT } from "@/i18n/client";

export default function FloatingTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useT();

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-black dark:bg-[#FFD700] text-white dark:text-black p-3 rounded-lg shadow-lg flex flex-col items-center justify-center transition-all hover:bg-gray-800 dark:hover:bg-[#FFCC00] w-14 h-14"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5 mb-1" />
          <span className="text-xs font-medium">
            {t("transcript.floatingButton.top")}
          </span>
        </button>
      )}
    </>
  );
}
