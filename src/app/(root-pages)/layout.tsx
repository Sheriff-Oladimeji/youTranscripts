import type React from "react";
import { Suspense } from "react";
import Analytics from "@/components/analytics";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ClientBannerWrapper from "@/components/client-banner-wrapper";
import { Toaster } from "sonner";
import { fallbackLng } from "@/i18n/settings";

export default function RootPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense>
        <Analytics />
      </Suspense>
      <ClientBannerWrapper />
      <Header lng={fallbackLng} />
      <main>{children}</main>
      <Footer lng={fallbackLng} />
      <Toaster richColors position="top-center" />
    </>
  );
}
