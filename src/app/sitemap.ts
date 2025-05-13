import { MetadataRoute } from "next";
import { languages } from "@/i18n/settings";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://youtranscripts.com";
  const currentDate = new Date();

  // Create an array to hold all sitemap entries
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add the English homepage (root)
  sitemapEntries.push({
    url: `${baseUrl}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 1.0,
  });

  // Add language-specific homepages (except English which is the root)
  languages
    .filter((lang) => lang !== "en")
    .forEach((lang) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}`,
        lastModified: currentDate,
        changeFrequency: "weekly" as const,
        priority: 1.0,
      });
    });

  // Add English-only pages
  const englishOnlyPages = [
    { path: "/about", changeFreq: "monthly" as const, priority: 0.8 },
    { path: "/contact", changeFreq: "monthly" as const, priority: 0.8 },
    { path: "/terms", changeFreq: "yearly" as const, priority: 0.5 },
    { path: "/privacy", changeFreq: "yearly" as const, priority: 0.5 },
  ];

  englishOnlyPages.forEach((page) => {
    sitemapEntries.push({
      url: `${baseUrl}${page.path}`,
      lastModified: currentDate,
      changeFrequency: page.changeFreq,
      priority: page.priority,
    });

    // We don't add language-specific versions of these pages to the sitemap
    // because they redirect to the English versions
  });

  return sitemapEntries;
}
