import type { Metadata } from "next";

interface LayoutProps {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

export default function TranscriptLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
