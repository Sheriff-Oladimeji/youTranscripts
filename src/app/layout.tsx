import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "sonner";
import ClientBannerWrapper from "@/components/client-banner-wrapper";
import Script from "next/script";

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
    default: "YouTranscripts - Generate YouTube Transcripts for FREE",
    template: "%s | YouTranscripts",
  },
  description:
    "Use our free YouTube transcript extractor and Convert any YouTube video to Text in one click. No Signup & Free Unlimited Usage.",
  keywords:
    "YouTube transcript, YouTube to text, video transcription, free transcript generator, YouTube captions",
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
    title: "YouTranscripts - Free YouTube Transcript Generator",
    description:
      "Convert any YouTube video to text in one click. Free, no signup required.",
    siteName: "YouTranscripts",
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTranscripts - Free YouTube Transcript Generator",
    description:
      "Convert any YouTube video to text in one click. Free, no signup required.",
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
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-WCWXV68M');`}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WCWXV68M"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClientBannerWrapper />
          <Header />
          {children}
          <Footer />
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
