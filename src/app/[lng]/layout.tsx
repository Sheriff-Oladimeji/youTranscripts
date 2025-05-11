"use client";

import type React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "sonner";
import ClientBannerWrapper from "@/components/client-banner-wrapper";
import { Suspense, use } from "react";
import Analytics from "@/components/analytics";
import { notFound } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}>) {
  const resolvedParams = use(params);
  const { lng } = resolvedParams;

  // Return 404 for English routes - they should use the root layout
  if (lng === "en") {
    notFound();
  }

  // For non-English languages, render the full layout
  return (
    <html lang={lng} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense>
            <Analytics />
          </Suspense>
          <ClientBannerWrapper />
          <Header lng={lng} />
          {children}
          <Footer lng={lng} />
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
