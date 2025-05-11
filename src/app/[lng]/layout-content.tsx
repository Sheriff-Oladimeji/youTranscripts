"use client";

import type React from "react";
import { use } from "react";

export default function LanguageLayoutContent({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}>) {
  // Just render the children without any additional components
  return <>{children}</>;
}
