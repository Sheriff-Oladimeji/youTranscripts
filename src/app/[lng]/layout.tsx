"use client";

import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "sonner";
import ClientBannerWrapper from "@/components/client-banner-wrapper";
import { Suspense, use } from "react";
import Analytics from "@/components/analytics";
import { languages } from "@/i18n/settings";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata is now handled in the root layout
// generateStaticParams is now in a separate file

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}>) {
  const resolvedParams = use(params);
  const { lng } = resolvedParams;

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
