"use client";

import dynamic from "next/dynamic";

// Dynamically import the BookmarkBanner component with no SSR
// This ensures it only runs on the client side
const BookmarkBanner = dynamic(() => import("@/components/bookmark-banner"), {
  ssr: false,
});

export default function ClientBannerWrapper() {
  return <BookmarkBanner />;
}
