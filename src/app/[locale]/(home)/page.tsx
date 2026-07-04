import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HomepageCustomerStories } from "@/components/homepage/customer-stories";
import { FloatingNavbar } from "@/components/homepage/floating-navbar";
import { HomepageFooter } from "@/components/homepage/footer";
import { HomepageHeader } from "@/components/homepage/header";
import { HomepageHowItWorks } from "@/components/homepage/how-it-works";
import { HomepageMotionProvider } from "@/components/motion/motion-provider";
import { StoryFloatingLink } from "@/components/story/story-floating-link";
import { createHomepageCopy } from "@/i18n/homepage-copy";
import { createHomepageMetadata } from "@/i18n/homepage-metadata";
import { isLocale, type Locale } from "@/i18n/routing";

interface HomeProps {
  params: Promise<{
    locale: string;
  }>;
}

async function getHomepageCopy(locale: Locale) {
  const [navbar, header, howItWorks, customerStories, footer] =
    await Promise.all([
      getTranslations({ locale, namespace: "Navbar" }),
      getTranslations({ locale, namespace: "Header" }),
      getTranslations({ locale, namespace: "HowItWorks" }),
      getTranslations({ locale, namespace: "CustomerStories" }),
      getTranslations({ locale, namespace: "Footer" }),
    ]);

  return createHomepageCopy({
    customerStories,
    footer,
    header,
    howItWorks,
    navbar,
  });
}

export async function generateMetadata({
  params,
}: HomeProps): Promise<Metadata> {
  const { locale: localeCandidate } = await params;

  if (!isLocale(localeCandidate)) {
    notFound();
  }

  const t = await getTranslations({
    locale: localeCandidate,
    namespace: "HomeMetadata",
  });

  return createHomepageMetadata(localeCandidate, {
    description: t("description"),
    imageAlt: t("imageAlt"),
    title: t("title"),
  });
}

export default async function Home({ params }: HomeProps) {
  const { locale: localeCandidate } = await params;

  if (!isLocale(localeCandidate)) {
    notFound();
  }

  setRequestLocale(localeCandidate);
  const [copy, storyEntry] = await Promise.all([
    getHomepageCopy(localeCandidate),
    getTranslations({ locale: localeCandidate, namespace: "StoryEntry" }),
  ]);

  return (
    <main className="min-h-screen bg-[#000000] py-6">
      <HomepageMotionProvider>
        <HomepageHeader
          copy={copy.header}
          currentLocale={localeCandidate}
          navbarCopy={copy.navbar}
        />
        <FloatingNavbar
          currentLocale={localeCandidate}
          navbarCopy={copy.navbar}
        />
        <HomepageHowItWorks copy={copy.howItWorks} />
        <HomepageCustomerStories copy={copy.customerStories} />
        <HomepageFooter copy={copy.footer} />
        <StoryFloatingLink
          ariaLabel={storyEntry("ariaLabel")}
          currentLocale={localeCandidate}
          label={storyEntry("label")}
        />
      </HomepageMotionProvider>
    </main>
  );
}
