"use client";

import { GlobeIcon } from "lucide-react";
import type { ComponentProps } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import { getLocaleOptions } from "@/i18n/locale-options";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export interface LanguageSwitcherProps {
  ariaLabel?: string;
  className?: string;
  currentLocale: Locale;
  linkTabIndex?: ComponentProps<"button">["tabIndex"];
}

export function LanguageSwitcher({
  ariaLabel = "Change language",
  className,
  currentLocale,
  linkTabIndex,
}: LanguageSwitcherProps) {
  const localeOptions = getLocaleOptions();
  const hasActiveLocale = localeOptions.some(
    (option) => option.locale === currentLocale
  );

  if (!hasActiveLocale) {
    throw new Error(`Unsupported locale: ${currentLocale}`);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={ariaLabel}
        className={cn(
          "flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.06)] font-normal text-[#ffffff] transition-opacity hover:opacity-80",
          className
        )}
        tabIndex={linkTabIndex}
      >
        <GlobeIcon aria-hidden="true" className="size-4" strokeWidth={1.75} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={10}>
        <DropdownMenuRadioGroup value={currentLocale}>
          {localeOptions.map((option) => (
            <DropdownMenuRadioItem
              key={option.locale}
              label={option.label}
              render={
                <Link
                  aria-current={
                    option.locale === currentLocale ? "page" : undefined
                  }
                  href="/"
                  locale={option.locale}
                />
              }
              value={option.locale}
            >
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
