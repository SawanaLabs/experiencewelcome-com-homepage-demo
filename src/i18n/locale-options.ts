import { type Locale, locales } from "./routing";

const localeLabels = {
  en: "English",
  es: "Español",
  fr: "Français",
  hi: "हिन्दी",
  ja: "日本語",
  zh: "中文",
} satisfies Record<Locale, string>;

const localeShortLabels = {
  en: "EN",
  es: "ES",
  fr: "FR",
  hi: "HI",
  ja: "JA",
  zh: "ZH",
} satisfies Record<Locale, string>;

export interface LocaleOption {
  label: string;
  locale: Locale;
  shortLabel: string;
}

export function getLocaleOptions(): LocaleOption[] {
  return locales.map((locale) => ({
    label: localeLabels[locale],
    locale,
    shortLabel: localeShortLabels[locale],
  }));
}
