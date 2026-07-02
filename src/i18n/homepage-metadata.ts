import type { Metadata } from "next";
import type { Locale } from "./routing";
import { getAbsoluteUrl, getLanguageAlternates, getSiteUrl } from "./seo";

export interface HomepageMetadataCopy {
  description: string;
  imageAlt: string;
  title: string;
}

const homepageSocialImage = {
  height: 765,
  url: "/homepage/header/home-hero-card.png",
  width: 1246,
};

export function createHomepageMetadata(
  locale: Locale,
  copy: HomepageMetadataCopy
): Metadata {
  const canonicalUrl = getAbsoluteUrl(locale);
  const socialTitle = `${copy.title} | ExperienceWelcome`;
  const image = {
    ...homepageSocialImage,
    alt: copy.imageAlt,
  };

  return {
    alternates: {
      canonical: canonicalUrl,
      languages: getLanguageAlternates(),
    },
    description: copy.description,
    metadataBase: getSiteUrl(),
    openGraph: {
      description: copy.description,
      images: [image],
      locale,
      siteName: "ExperienceWelcome",
      title: socialTitle,
      type: "website",
      url: canonicalUrl,
    },
    title: copy.title,
    twitter: {
      card: "summary_large_image",
      description: copy.description,
      images: [image],
      title: socialTitle,
    },
  };
}
