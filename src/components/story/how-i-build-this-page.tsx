import { ArrowLeftIcon, BookOpenTextIcon, InfoIcon } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MarkdownRenderer } from "@/components/story/markdown-renderer";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { HowIBuildThisArticle } from "@/lib/content/how-i-build-this";

interface HowIBuildThisPageCopy {
  backHomeLabel: string;
  constructionNotice: string;
  contentLocaleLabel: string;
  eyebrow: string;
  languageLabel: string;
}

interface HowIBuildThisPageProps {
  article: HowIBuildThisArticle;
  copy: HowIBuildThisPageCopy;
  currentLocale: Locale;
}

export function HowIBuildThisPage({
  article,
  copy,
  currentLocale,
}: HowIBuildThisPageProps) {
  return (
    <main className="min-h-screen bg-[#f7f9f4] text-[#101312]">
      <header className="sticky top-0 z-40 border-[#d7e2dc] border-b bg-[#f7f9f4]/92 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
          <Link
            className="inline-flex items-center gap-2 rounded-md font-medium text-[#17201c] text-sm transition-colors hover:text-[#0b5f75] focus-visible:outline-[2px_solid_#0b5f75] focus-visible:outline-offset-4"
            href="/"
            locale={currentLocale}
          >
            <ArrowLeftIcon aria-hidden="true" className="size-4" />
            <span>{copy.backHomeLabel}</span>
          </Link>
          <LanguageSwitcher
            ariaLabel={copy.languageLabel}
            className="size-10 border-[#101312]/15 bg-[#101312] text-[#ffffff] hover:opacity-90"
            currentLocale={currentLocale}
            href="/how-i-build-this"
          />
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-5 py-12 md:px-8 md:py-16 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex flex-wrap items-center gap-3 lg:block lg:space-y-5">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#1d7f70]/25 bg-[#e7f4ef] px-3 py-1 text-[#1d5f55] text-xs uppercase tracking-normal">
              <BookOpenTextIcon aria-hidden="true" className="size-3.5" />
              {copy.eyebrow}
            </p>
            <p className="max-w-[34rem] text-[#425049] text-sm leading-6 lg:max-w-none">
              {article.description}
            </p>
            <p className="rounded-md border border-[#d7e2dc] bg-[#ffffff] px-3 py-2 font-mono text-[#617069] text-xs">
              {copy.contentLocaleLabel}
            </p>
          </div>
        </aside>

        <article className="min-w-0 pb-24">
          <MarkdownRenderer
            blocks={article.blocks}
            renderAfterFirstList={
              <aside className="flex max-w-[75ch] items-start gap-3 rounded-md border border-[#c8d8d3] bg-[#ffffff] px-4 py-3 text-[#34413b] text-sm leading-6">
                <InfoIcon
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-[#1d7f70]"
                />
                <p>{copy.constructionNotice}</p>
              </aside>
            }
          />
        </article>
      </div>
    </main>
  );
}
