import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n/routing";
import { getAbsoluteUrl, getLanguageAlternates } from "@/i18n/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const alternates = {
    languages: getLanguageAlternates(),
  };

  return locales.map((locale) => ({
    alternates,
    changeFrequency: "weekly",
    lastModified: new Date("2026-07-01T00:00:00.000Z"),
    priority: locale === defaultLocale ? 1 : 0.9,
    url: getAbsoluteUrl(locale),
  }));
}
