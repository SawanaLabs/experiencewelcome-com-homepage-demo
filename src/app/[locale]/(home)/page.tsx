import { setRequestLocale } from "next-intl/server";
import { HomepageCustomerStories } from "@/components/homepage/customer-stories";
import { HomepageFooter } from "@/components/homepage/footer";
import { HomepageHeader } from "@/components/homepage/header";
import type { Locale } from "@/i18n/routing";

interface HomeProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-[#000000] py-6">
      <HomepageHeader />
      <HomepageCustomerStories />
      <HomepageFooter />
    </main>
  );
}
