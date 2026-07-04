import { getPathname } from "./navigation";
import { defaultLocale, type Locale, locales } from "./routing";

type LocalizedHref = "/" | "/how-i-build-this";

const explicitSiteUrlEnvKeys = ["NEXT_PUBLIC_SITE_URL", "SITE_URL"] as const;
const absoluteUrlPattern = /^https?:\/\//i;

function normalizeAbsoluteUrl(value: string | undefined) {
  const trimmedValue = value?.trim();

  if (!trimmedValue) {
    return;
  }

  if (absoluteUrlPattern.test(trimmedValue)) {
    return trimmedValue;
  }

  return `https://${trimmedValue}`;
}

function getExplicitSiteUrl() {
  for (const key of explicitSiteUrlEnvKeys) {
    const url = normalizeAbsoluteUrl(process.env[key]);

    if (url) {
      return url;
    }
  }
}

function getVercelSiteUrl() {
  const candidates =
    process.env.VERCEL_ENV === "production"
      ? [
          process.env.VERCEL_PROJECT_PRODUCTION_URL,
          process.env.VERCEL_URL,
          process.env.VERCEL_BRANCH_URL,
        ]
      : [
          process.env.VERCEL_URL,
          process.env.VERCEL_BRANCH_URL,
          process.env.VERCEL_PROJECT_PRODUCTION_URL,
        ];

  for (const candidate of candidates) {
    const url = normalizeAbsoluteUrl(candidate);

    if (url) {
      return url;
    }
  }
}

function getLocalSiteUrl() {
  if (process.env.VERCEL) {
    return;
  }

  return `http://localhost:${process.env.PORT ?? "3000"}`;
}

export function getSiteUrl() {
  const url = getExplicitSiteUrl() ?? getVercelSiteUrl() ?? getLocalSiteUrl();

  if (!url) {
    throw new Error(
      "Missing site URL. Set NEXT_PUBLIC_SITE_URL, SITE_URL, or enable Vercel system environment variables."
    );
  }

  return new URL(url);
}

export function getAbsoluteUrl(locale: Locale, href: LocalizedHref = "/") {
  return new URL(getPathname({ href, locale }), getSiteUrl()).toString();
}

export function getLanguageAlternates(href: LocalizedHref = "/") {
  return {
    ...Object.fromEntries(
      locales.map((locale) => [locale, getAbsoluteUrl(locale, href)])
    ),
    "x-default": getAbsoluteUrl(defaultLocale, href),
  };
}
