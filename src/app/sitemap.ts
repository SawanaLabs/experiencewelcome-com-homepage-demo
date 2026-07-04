import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n/routing";
import { getAbsoluteUrl, getLanguageAlternates } from "@/i18n/seo";

const sitemapRoutes = [
  {
    changeFrequency: "weekly",
    href: "/",
    lastModified: new Date("2026-07-01T00:00:00.000Z"),
    priority: 1,
  },
  {
    changeFrequency: "weekly",
    href: "/how-i-build-this",
    lastModified: new Date("2026-07-05T00:00:00.000Z"),
    priority: 0.7,
  },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapRoutes.flatMap((route) =>
    locales.map((locale) => ({
      alternates: {
        languages: getLanguageAlternates(route.href),
      },
      changeFrequency: route.changeFrequency,
      lastModified: route.lastModified,
      priority:
        route.href === "/" && locale !== defaultLocale
          ? route.priority - 0.1
          : route.priority,
      url: getAbsoluteUrl(locale, route.href),
    }))
  );
}
