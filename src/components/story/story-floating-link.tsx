import { ArrowUpRightIcon, BookOpenTextIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

interface StoryFloatingLinkProps {
  ariaLabel: string;
  currentLocale: Locale;
  label: string;
}

export function StoryFloatingLink({
  ariaLabel,
  currentLocale,
  label,
}: StoryFloatingLinkProps) {
  return (
    <Link
      aria-label={ariaLabel}
      className="fixed right-4 bottom-4 z-[90] inline-flex max-w-[calc(100vw-2rem)] items-center gap-2 rounded-full border border-[#ffffff]/20 bg-[#ffffff] px-4 py-3 font-medium text-[#101312] text-sm shadow-[0_18px_45px_rgba(0,0,0,0.32)] transition-transform hover:-translate-y-0.5 focus-visible:outline-[2px_solid_#ffffff] focus-visible:outline-offset-4 sm:right-6 sm:bottom-6"
      href="/how-i-build-this"
      locale={currentLocale}
    >
      <BookOpenTextIcon aria-hidden="true" className="size-4 shrink-0" />
      <span className="truncate">{label}</span>
      <ArrowUpRightIcon aria-hidden="true" className="size-4 shrink-0" />
    </Link>
  );
}
