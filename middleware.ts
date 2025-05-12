import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import acceptLanguage from "accept-language";
import {
  fallbackLng,
  languages,
  cookieName,
  headerName,
} from "./src/i18n/settings";

acceptLanguage.languages(languages);

export const config = {
  // Avoid matching for static files, API routes, etc.
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)",
  ],
};

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // List of pages that should only be available in English
  const englishOnlyPages = ["/about", "/privacy", "/contact", "/terms"];

  // Exclude paths starting with api, _next, static files etc.
  if (
    pathname.match(/\.(ico|jpg|jpeg|png|gif|svg|css|js)$/) ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/")
  ) {
    return NextResponse.next();
  }

  // Check if this is a localized version of an English-only page
  const isLocalizedEnglishOnlyPage = languages.some((lng) => {
    if (lng === fallbackLng) return false; // Skip English
    return englishOnlyPages.some(
      (page) =>
        pathname === `/${lng}${page}` || pathname.startsWith(`/${lng}${page}/`)
    );
  });

  // If it's a localized version of an English-only page, redirect to the English version
  if (isLocalizedEnglishOnlyPage) {
    // Extract the path without the language prefix
    const pathWithoutLang = pathname.substring(3); // Remove first 3 chars (e.g., '/es')
    return NextResponse.redirect(new URL(pathWithoutLang, req.url));
  }

  // If path starts with /en, redirect to the root path without /en
  if (pathname.startsWith("/en/")) {
    // Special handling for /en/transcript paths
    if (pathname.startsWith("/en/transcript/")) {
      const newPath = pathname.replace("/en/transcript/", "/transcript/");
      return NextResponse.redirect(new URL(newPath, req.url));
    }
    const newPath = pathname.replace("/en/", "/");
    return NextResponse.redirect(new URL(newPath, req.url));
  }
  if (pathname === "/en") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // For non-English languages, check if the path starts with a language code
  const pathnameHasLang = languages.some(
    (loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`
  );

  // For non-English paths that don't have a language prefix, redirect to add it
  if (!pathnameHasLang && pathname !== "/") {
    const segments = pathname.split("/").filter(Boolean);
    // Don't redirect if we're already on an English page
    if (segments[0] !== "en") {
      // For all other languages, if no language is specified, use Spanish as default
      const lang = req.cookies.get("i18next")?.value || "es";
      if (languages.includes(lang) && lang !== "en") {
        return NextResponse.redirect(new URL(`/${lang}${pathname}`, req.url));
      }
    }
  }

  // Ignore paths with "icon" or "chrome"
  if (
    req.nextUrl.pathname.indexOf("icon") > -1 ||
    req.nextUrl.pathname.indexOf("chrome") > -1
  )
    return NextResponse.next();

  // Check if the language is already in the path
  const lngInPath = languages.find((loc) =>
    req.nextUrl.pathname.startsWith(`/${loc}`)
  );

  let lng;

  // If language is in path, use it as the primary language
  if (lngInPath) {
    lng = lngInPath;
  } else {
    // Try to get language from cookie
    if (req.cookies.has(cookieName))
      lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);

    // If no cookie, check the Accept-Language header
    if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));

    // Default to fallback language if still undefined
    if (!lng) lng = fallbackLng;
  }

  const headers = new Headers(req.headers);
  headers.set(headerName, lng);

  // If the language is not in the path and it's not English, redirect to include it
  if (
    !lngInPath &&
    !req.nextUrl.pathname.startsWith("/_next") &&
    !req.nextUrl.pathname.startsWith("/en/") &&
    !req.nextUrl.pathname.startsWith("/transcript/") && // No redirect for English transcript URLs
    lng !== fallbackLng && // Only redirect non-English languages
    // Don't redirect English-only pages
    !englishOnlyPages.some(
      (page) =>
        req.nextUrl.pathname === page ||
        req.nextUrl.pathname.startsWith(`${page}/`)
    )
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
    );
  }

  // If a referer exists, try to detect the language from there and set the cookie accordingly
  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer") || "");
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    const response = NextResponse.next({ headers });

    // Always set the cookie to the current language in the path
    if (lngInPath) {
      response.cookies.set(cookieName, lngInPath);
    } else if (lngInReferer) {
      response.cookies.set(cookieName, lngInReferer);
    }

    return response;
  }

  // Always set the cookie to match the current language
  const response = NextResponse.next({ headers });
  response.cookies.set(cookieName, lng);
  return response;
}
