"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

interface I18nLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function I18nLink({
  href,
  children,
  className,
  onClick,
}: I18nLinkProps) {
  const params = useParams();
  const lang = params?.lng as string;

  // If we're not in a language route or the href already starts with a language code, don't modify it
  if (
    !lang ||
    href.startsWith("/en/") ||
    href.startsWith("/es/") ||
    href.startsWith("/pt/")
  ) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }

  // If href is just '/', we want to go to the root of the current language
  if (href === "/") {
    return (
      <Link href={`/${lang}`} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }

  // Otherwise, prepend the current language to the href
  const localizedHref = href.startsWith("/")
    ? `/${lang}${href}`
    : `/${lang}/${href}`;

  return (
    <Link href={localizedHref} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
