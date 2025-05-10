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

  // If the language is not in the path, redirect to include it
  if (
    !lngInPath &&
    !req.nextUrl.pathname.startsWith("/_next") &&
    !req.nextUrl.pathname.startsWith("/transcript")
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
