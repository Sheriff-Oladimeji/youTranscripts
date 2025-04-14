"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function BookmarkBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if user has dismissed the banner before
    let bannerDismissed = false;
    try {
      bannerDismissed = !!localStorage.getItem("bookmarkBannerDismissed");
    } catch (error) {
      // Handle localStorage errors (e.g., in private browsing mode)
      console.warn("Unable to access localStorage:", error);
    }

    // Check if user is on macOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsMac(userAgent.indexOf("mac") !== -1);

    // Check if user is on mobile
    const checkIfMobile = () => {
      return window.innerWidth < 768;
    };

    const handleResize = () => {
      setIsMobile(checkIfMobile());
    };

    // Initial check
    setIsMobile(checkIfMobile());

    // Set banner visibility (only on desktop and if not dismissed)
    setIsVisible(!checkIfMobile() && !bannerDismissed);

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Don't render anything on mobile
  if (isMobile || !isVisible) {
    return null;
  }

  return (
    <div className="bg-amber-400 text-black py-2 px-4 flex items-center justify-center relative banner-animation">
      {/* Animation is defined in a style tag that will be added to the document head */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes bannerFadeIn {
          from {
            opacity: 0;
            transform: translateY(-100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .banner-animation {
          animation: bannerFadeIn 0.5s ease-out forwards;
        }
      `,
        }}
      />
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-bookmark"
        >
          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
        </svg>
        <span>
          Finding this tool useful? Bookmark us{" "}
          <kbd className="px-2 py-1 bg-white/30 rounded text-sm font-mono mx-1">
            {isMac ? "⌘" : "Ctrl"}+D
          </kbd>{" "}
          for easy and fast access!
        </span>
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          // Save dismissal to localStorage
          try {
            localStorage.setItem("bookmarkBannerDismissed", "true");
          } catch (error) {
            // Handle localStorage errors
            console.warn("Unable to access localStorage:", error);
          }
        }}
        className="absolute right-4 hover:bg-amber-500/30 p-1 rounded-full"
        aria-label="Close banner"
      >
        <X size={18} />
      </button>
    </div>
  );
}
