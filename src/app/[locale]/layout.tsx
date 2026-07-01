import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { isLocale, locales } from "@/i18n/routing";
import { getAbsoluteUrl, getLanguageAlternates, siteUrl } from "@/i18n/seo";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface LocaleParams {
  locale: string;
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<LocaleParams>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<LocaleParams>;
}): Promise<Metadata> {
  const { locale: localeCandidate } = await params;

  if (!isLocale(localeCandidate)) {
    notFound();
  }

  const t = await getTranslations({
    locale: localeCandidate,
    namespace: "Metadata",
  });

  return {
    alternates: {
      canonical: getAbsoluteUrl(localeCandidate),
      languages: getLanguageAlternates(),
    },
    description: t("description"),
    metadataBase: siteUrl,
    openGraph: {
      description: t("description"),
      siteName: t("siteName"),
      title: t("title"),
      type: "website",
      url: getAbsoluteUrl(localeCandidate),
    },
    title: {
      default: t("title"),
      template: `%s | ${t("siteName")}`,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: localeCandidate } = await params;

  if (!isLocale(localeCandidate)) {
    notFound();
  }

  setRequestLocale(localeCandidate);

  return (
    <html
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
      lang={localeCandidate}
    >
      <body className="flex min-h-full flex-col font-sans antialiased">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
