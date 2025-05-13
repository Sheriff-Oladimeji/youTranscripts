import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "sonner";
import ClientBannerWrapper from "@/components/client-banner-wrapper";
import { Suspense } from "react";
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

// Base metadata for language-specific routes
// This will be overridden by page-specific metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://youtranscripts.com"),
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/manifest.json",
  verification: {
    google: "verification_token", // Replace with actual verification token if available
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lng: string };
}>) {
  const { lng } = params;

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
