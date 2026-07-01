import { getPathname } from "./navigation";
import { defaultLocale, type Locale, locales } from "./routing";

type LocalizedHref = "/";

export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://experiencewelcome.com"
);

export function getAbsoluteUrl(locale: Locale, href: LocalizedHref = "/") {
  return new URL(getPathname({ href, locale }), siteUrl).toString();
}

export function getLanguageAlternates(href: LocalizedHref = "/") {
  return {
    ...Object.fromEntries(
      locales.map((locale) => [locale, getAbsoluteUrl(locale, href)])
    ),
    "x-default": getAbsoluteUrl(defaultLocale, href),
  };
}
