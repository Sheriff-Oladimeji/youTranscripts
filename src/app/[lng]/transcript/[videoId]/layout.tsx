import type { Metadata } from "next";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    lng: string;
    videoId: string;
  }>;
}

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

export default function TranscriptLayout(props: LayoutProps) {
  const { children } = props;
  return <>{children}</>;
}
