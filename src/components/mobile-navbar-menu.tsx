"use client";

import { ChevronRightIcon, MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { type ComponentProps, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/drawer";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { NavbarCopy } from "@/components/navbar";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const menuButtonClasses =
  "flex shrink-0 items-center justify-center rounded-full border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.06)] text-[#ffffff] transition-opacity hover:opacity-80";

const drawerLinkClasses =
  "group flex min-h-12 items-center justify-between rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.045)] px-4 font-normal text-[16px] leading-5 text-[#ffffff] transition-colors hover:bg-[rgba(255,255,255,0.09)] focus-visible:outline-[2px_solid_#ffffff] focus-visible:outline-offset-3";

interface MobileNavbarMenuProps {
  className?: string;
  copy: NavbarCopy;
  currentLocale: Locale;
  linkTabIndex?: ComponentProps<"button">["tabIndex"];
}

export function MobileNavbarMenu({
  className,
  copy,
  currentLocale,
  linkTabIndex,
}: MobileNavbarMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer onOpenChange={(nextOpen) => setOpen(nextOpen)} open={open}>
      <DrawerTrigger
        aria-label={copy.menuLabel}
        className={cn(menuButtonClasses, className)}
        tabIndex={linkTabIndex}
      >
        <MenuIcon aria-hidden="true" className="size-5" strokeWidth={1.8} />
      </DrawerTrigger>
      <DrawerContent>
        <div
          aria-hidden="true"
          className="mx-auto mt-3 h-1 w-11 rounded-full bg-white/28"
        />
        <DrawerHeader className="gap-5 px-5 pt-5 pb-3">
          <div className="flex items-center justify-between gap-4">
            <DrawerClose
              nativeButton={false}
              render={
                <a
                  aria-label={copy.brandAriaLabel}
                  className="flex min-w-0 items-center gap-2 rounded-full transition-opacity hover:opacity-80 focus-visible:outline-[2px_solid_#ffffff] focus-visible:outline-offset-4"
                  href="#top"
                  tabIndex={linkTabIndex}
                >
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="h-8 w-7 -translate-y-[2px]"
                    height={120}
                    src="/homepage/footer/welcome-mark.svg"
                    width={105}
                  />
                  <span className="font-semibold text-[20px] leading-6">
                    welcome
                  </span>
                </a>
              }
            />
            <DrawerClose
              aria-label={copy.menuCloseLabel}
              className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.06)] transition-opacity hover:opacity-80 focus-visible:outline-[2px_solid_#ffffff] focus-visible:outline-offset-3"
              tabIndex={linkTabIndex}
              type="button"
            >
              <XIcon aria-hidden="true" className="size-5" strokeWidth={1.8} />
            </DrawerClose>
          </div>
          <DrawerTitle className="sr-only">{copy.brandAriaLabel}</DrawerTitle>
        </DrawerHeader>

        <div className="overflow-y-auto px-5 pb-2">
          <nav aria-label="Primary navigation">
            <ul className="grid gap-2">
              {copy.primaryNavigation.map((link) => (
                <li key={link.label}>
                  <DrawerClose
                    nativeButton={false}
                    render={
                      <a
                        className={drawerLinkClasses}
                        href={link.href}
                        tabIndex={linkTabIndex}
                      >
                        <span>{link.label}</span>
                        <ChevronRightIcon
                          aria-hidden="true"
                          className="size-4 text-white/42 transition-transform group-hover:translate-x-0.5"
                          strokeWidth={1.8}
                        />
                      </a>
                    }
                  />
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {copy.accountNavigation.map((link) => (
              <DrawerClose
                key={link.label}
                nativeButton={false}
                render={
                  <a
                    className="flex min-h-11 items-center justify-center rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.035)] px-3 font-normal text-[14px] text-white/82 leading-5 transition-colors hover:bg-[rgba(255,255,255,0.08)] focus-visible:outline-[2px_solid_#ffffff] focus-visible:outline-offset-3"
                    href={link.href}
                    tabIndex={linkTabIndex}
                  >
                    {link.label}
                  </a>
                }
              />
            ))}
          </div>
        </div>

        <DrawerFooter className="flex-row gap-2 px-5 pt-4 pb-[calc(env(safe-area-inset-bottom)+1.25rem)]">
          <LanguageSwitcher
            ariaLabel={copy.languageLabel}
            className="size-12 bg-[rgba(255,255,255,0.08)] text-white/88"
            currentLocale={currentLocale}
            ignoreDrawerSwipe
            linkTabIndex={linkTabIndex}
          />
          <DrawerClose
            nativeButton={false}
            render={
              <a
                className="flex min-h-12 flex-1 items-center justify-center rounded-full bg-[#5865ff] px-5 font-normal text-[16px] text-white leading-5 transition-opacity hover:opacity-90 focus-visible:outline-[2px_solid_#ffffff] focus-visible:outline-offset-3"
                href="#demo"
                tabIndex={linkTabIndex}
              >
                {copy.demoLabel}
              </a>
            }
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
