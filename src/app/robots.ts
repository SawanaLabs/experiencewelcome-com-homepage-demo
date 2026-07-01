import type { MetadataRoute } from "next";
import { siteUrl } from "@/i18n/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: "/",
      userAgent: "*",
    },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}
