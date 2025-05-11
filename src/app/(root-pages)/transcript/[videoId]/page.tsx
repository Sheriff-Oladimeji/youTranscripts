"use client";

import { redirect } from "next/navigation";
import { fallbackLng } from "@/i18n/settings";
import { use } from "react";

export default function TranscriptPage({
  params,
}: {
  params: Promise<{ videoId: string }>;
}) {
  const resolvedParams = use(params);
  const { videoId } = resolvedParams;

  // Redirect to the localized version of the transcript page
  redirect(`/${fallbackLng}/transcript/${videoId}`);
}
