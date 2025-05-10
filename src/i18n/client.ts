"use client";

import i18nClient from "./client-i18n";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function useT(ns?: string | string[], options?: { keyPrefix?: string }) {
  const params = useParams();
  const lng = params?.lng as string;

  // Initialize language if we have a language parameter
  useEffect(() => {
    // If we have a language from the route, use it
    if (typeof lng === "string" && i18nClient.resolvedLanguage !== lng) {
      i18nClient.changeLanguage(lng);
    }
  }, [lng]);

  // Use the i18n instance from client-i18n.ts
  const { t, i18n } = useTranslation(ns, options);

  // Make sure we're using our client instance
  if (i18n !== i18nClient) {
    i18n.options = { ...i18n.options, ...i18nClient.options };
  }

  return { t, i18n };
}
