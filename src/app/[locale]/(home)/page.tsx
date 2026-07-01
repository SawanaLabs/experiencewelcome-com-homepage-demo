import { getTranslations, setRequestLocale } from "next-intl/server";
import { HomepageCustomerStories } from "@/components/homepage/customer-stories";
import { FloatingNavbar } from "@/components/homepage/floating-navbar";
import { HomepageFooter } from "@/components/homepage/footer";
import { HomepageHeader } from "@/components/homepage/header";
import type { NavbarCopy } from "@/components/navbar";
import type { Locale } from "@/i18n/routing";

interface HomeProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Navbar");
  const navbarCopy: NavbarCopy = {
    accountNavigation: [
      { href: "#support", label: t("accountNavigation.support") },
      { href: "#login", label: t("accountNavigation.login") },
    ],
    brandAriaLabel: t("brandAriaLabel"),
    demoLabel: t("demoLabel"),
    languageLabel: t("languageLabel"),
    primaryNavigation: [
      { href: "#features", label: t("primaryNavigation.features") },
      { href: "#pricing", label: t("primaryNavigation.pricing") },
      { href: "#events", label: t("primaryNavigation.events") },
      { href: "#about", label: t("primaryNavigation.about") },
      { href: "#blog", label: t("primaryNavigation.blog") },
    ],
  };

  return (
    <main className="min-h-screen bg-[#000000] py-6">
      <HomepageHeader currentLocale={locale} navbarCopy={navbarCopy} />
      <FloatingNavbar currentLocale={locale} navbarCopy={navbarCopy} />
      <HomepageCustomerStories />
      <HomepageFooter />
    </main>
  );
}
