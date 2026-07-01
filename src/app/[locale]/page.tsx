import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

interface HomeProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "HomePage" });

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-1 flex-col items-center justify-between bg-white px-16 py-32 sm:items-start dark:bg-black">
        <Image
          alt={t("nextLogoAlt")}
          className="dark:invert"
          height={20}
          priority
          src="/next.svg"
          style={{ width: "auto", height: "auto" }}
          width={100}
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs font-semibold text-3xl text-black leading-10 tracking-tight dark:text-zinc-50">
            {t("headline")}
          </h1>
          <p className="max-w-md text-lg text-zinc-600 leading-8 dark:text-zinc-400">
            {t("body")}
          </p>
        </div>
        <div className="flex flex-col gap-4 font-medium text-base sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] md:w-auto md:min-w-[158px] dark:hover:bg-[#ccc]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image
              alt={t("vercelLogoAlt")}
              className="dark:invert"
              height={16}
              src="/vercel.svg"
              style={{ width: "auto", height: "auto" }}
              width={16}
            />
            {t("deployNow")}
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-black/[.08] border-solid px-5 transition-colors hover:border-transparent hover:bg-black/[.04] md:w-auto md:min-w-[158px] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            rel="noopener noreferrer"
            target="_blank"
          >
            {t("documentation")}
          </a>
        </div>
      </main>
    </div>
  );
}
