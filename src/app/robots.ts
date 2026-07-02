import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/i18n/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: "/",
      userAgent: "*",
    },
    sitemap: new URL("/sitemap.xml", getSiteUrl()).toString(),
  };
}
