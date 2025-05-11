import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://youtranscripts.com"),
  title: {
    default: "100% Free YouTube Transcript Generator - No Signup [2025]",
    template: "%s",
  },
  description:
    "Use our Free & Fast YouTube Video Transcript extractor and convert any YouTube video to text in just 2 seconds. Copy, Translate & Download in one click.",
  keywords:
    "YouTube transcript, YouTube to text, video transcription, free transcript generator, YouTube captions, no signup",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://youtranscripts.com",
    title: "100% Free YouTube Transcript Generator - No Signup [2025]",
    description:
      "Use our Free & Fast YouTube Video Transcript extractor and convert any YouTube video to text in just 2 seconds. Copy, Translate & Download in one click.",
    siteName: "YouTranscripts",
  },
  twitter: {
    card: "summary_large_image",
    title: "100% Free YouTube Transcript Generator - No Signup [2025]",
    description:
      "Use our Free & Fast YouTube Video Transcript extractor and convert any YouTube video to text in just 2 seconds. Copy, Translate & Download in one click.",
  },
  verification: {
    google: "verification_token", // Replace with actual verification token if available
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
