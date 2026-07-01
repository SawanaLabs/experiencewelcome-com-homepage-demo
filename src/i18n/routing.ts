import { defineRouting } from "next-intl/routing";

export const locales = ["en", "zh", "ja", "fr", "es", "hi"] as const;
export const defaultLocale = "en";

export type Locale = (typeof locales)[number];

export function isLocale(value: string | undefined): value is Locale {
  return (locales as readonly string[]).includes(value ?? "");
}

export const routing = defineRouting({
  defaultLocale,
  localePrefix: "as-needed",
  locales,
  pathnames: {
    "/": "/",
  },
});
