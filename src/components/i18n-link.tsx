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

  // If the href already starts with a language code, don't modify it
  if (href.startsWith("/es/") || href.startsWith("/pt/")) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }

  // If we're in English mode or not in a language route
  if (lang === "en" || !lang) {
    // If href is just '/', we want to go to the root
    if (href === "/") {
      return (
        <Link href="/" className={className} onClick={onClick}>
          {children}
        </Link>
      );
    }

    // For English, don't add language prefix
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

  // For non-English languages, prepend the current language to the href
  const localizedHref = href.startsWith("/")
    ? `/${lang}${href}`
    : `/${lang}/${href}`;

  return (
    <Link href={localizedHref} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
