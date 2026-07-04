import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HowIBuildThisPage } from "@/components/story/how-i-build-this-page";
import { isLocale, locales } from "@/i18n/routing";
import { getAbsoluteUrl, getLanguageAlternates, getSiteUrl } from "@/i18n/seo";
import { getHowIBuildThisArticle } from "@/lib/content/how-i-build-this";

interface HowIBuildThisRouteProps {
  params: Promise<{
    locale: string;
  }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: HowIBuildThisRouteProps): Promise<Metadata> {
  const { locale: localeCandidate } = await params;

  if (!isLocale(localeCandidate)) {
    notFound();
  }

  const article = await getHowIBuildThisArticle(localeCandidate);
  const canonicalUrl = getAbsoluteUrl(localeCandidate, "/how-i-build-this");

  return {
    alternates: {
      canonical: canonicalUrl,
      languages: getLanguageAlternates("/how-i-build-this"),
    },
    description: article.description,
    metadataBase: getSiteUrl(),
    openGraph: {
      description: article.description,
      locale: localeCandidate,
      siteName: "ExperienceWelcome",
      title: article.title,
      type: "article",
      url: canonicalUrl,
    },
    title: article.title,
    twitter: {
      card: "summary",
      description: article.description,
      title: article.title,
    },
  };
}

export default async function HowIBuildThisRoute({
  params,
}: HowIBuildThisRouteProps) {
  const { locale: localeCandidate } = await params;

  if (!isLocale(localeCandidate)) {
    notFound();
  }

  setRequestLocale(localeCandidate);

  const [article, t] = await Promise.all([
    getHowIBuildThisArticle(localeCandidate),
    getTranslations({
      locale: localeCandidate,
      namespace: "HowIBuildThis",
    }),
  ]);

  return (
    <HowIBuildThisPage
      article={article}
      copy={{
        backHomeLabel: t("backHomeLabel"),
        constructionNotice: t("constructionNotice"),
        contentLocaleLabel: t("contentLocaleLabel"),
        eyebrow: t("eyebrow"),
        languageLabel: t("languageLabel"),
      }}
      currentLocale={localeCandidate}
    />
  );
}
