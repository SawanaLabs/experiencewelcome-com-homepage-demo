import Image from "next/image";
import type { ComponentProps } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileNavbarMenu } from "@/components/mobile-navbar-menu";
import { defaultLocale, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface NavbarLink {
  href: string;
  label: string;
}

export interface NavbarCopy {
  accountNavigation: NavbarLink[];
  brandAriaLabel: string;
  demoLabel: string;
  languageLabel: string;
  menuCloseLabel: string;
  menuLabel: string;
  primaryNavigation: NavbarLink[];
}

const defaultNavbarCopy = {
  accountNavigation: [
    { label: "Support", href: "#support" },
    { label: "Login", href: "#login" },
  ],
  brandAriaLabel: "Welcome home",
  demoLabel: "Demo",
  languageLabel: "Change language",
  menuCloseLabel: "Close menu",
  menuLabel: "Open menu",
  primaryNavigation: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Events", href: "#events" },
    { label: "About", href: "#about" },
    { label: "Blog", href: "#blog" },
  ],
} satisfies NavbarCopy;

const linkFocusClasses =
  "focus-visible:outline-[2px_solid_#ffffff] focus-visible:outline-offset-4";
const brandLogoClasses = "h-8 w-7 -translate-y-[2px]";

type NavbarVariant = "auto" | "floating" | "hero" | "mobileHeader";
type NavbarBreakpoint = "sm" | "md" | "lg" | "xl";

const navbarAutoBreakpointClasses = {
  sm: { desktop: "hidden sm:grid", mobile: "sm:hidden" },
  md: { desktop: "hidden md:grid", mobile: "md:hidden" },
  lg: { desktop: "hidden lg:grid", mobile: "lg:hidden" },
  xl: { desktop: "hidden xl:grid", mobile: "xl:hidden" },
} satisfies Record<
  NavbarBreakpoint,
  {
    desktop: string;
    mobile: string;
  }
>;

type SiteNavbarProps = ComponentProps<"div"> & {
  autoBreakpoint?: NavbarBreakpoint;
  copy?: NavbarCopy;
  currentLocale?: Locale;
  linkTabIndex?: ComponentProps<"a">["tabIndex"];
  logoPriority?: boolean;
  variant?: NavbarVariant;
};

interface BrandLinkProps {
  ariaLabel: string;
  className?: string;
  linkTabIndex?: ComponentProps<"a">["tabIndex"];
  logoClassName: string;
  logoPriority?: boolean;
  textClassName: string;
}

function BrandLink({
  ariaLabel,
  className,
  linkTabIndex,
  logoClassName,
  logoPriority = false,
  textClassName,
}: BrandLinkProps) {
  return (
    <a
      aria-label={ariaLabel}
      className={cn(
        "flex items-center transition-opacity hover:opacity-80",
        linkFocusClasses,
        className
      )}
      href="#top"
      tabIndex={linkTabIndex}
    >
      <Image
        alt=""
        aria-hidden="true"
        className={logoClassName}
        height={120}
        priority={logoPriority}
        src="/homepage/footer/welcome-mark.svg"
        width={105}
      />
      <span className={textClassName}>welcome</span>
    </a>
  );
}

function DemoLink({
  className,
  label,
  linkTabIndex,
}: {
  className?: string;
  label: string;
  linkTabIndex?: ComponentProps<"a">["tabIndex"];
}) {
  return (
    <a
      className={cn(
        "flex items-center justify-center rounded-full bg-[#5865ff] font-normal transition-opacity hover:opacity-90",
        linkFocusClasses,
        className
      )}
      href="#demo"
      tabIndex={linkTabIndex}
    >
      {label}
    </a>
  );
}

export function SiteNavbar({
  autoBreakpoint = "lg",
  className,
  copy = defaultNavbarCopy,
  currentLocale = defaultLocale,
  linkTabIndex,
  logoPriority = false,
  variant = "floating",
  ...props
}: SiteNavbarProps) {
  if (variant === "auto") {
    const breakpointClasses = navbarAutoBreakpointClasses[autoBreakpoint];

    return (
      <>
        <SiteNavbar
          {...props}
          className={cn(breakpointClasses.desktop, className)}
          copy={copy}
          currentLocale={currentLocale}
          linkTabIndex={linkTabIndex}
          logoPriority={logoPriority}
          variant="hero"
        />
        <SiteNavbar
          {...props}
          className={cn(breakpointClasses.mobile, className)}
          copy={copy}
          currentLocale={currentLocale}
          linkTabIndex={linkTabIndex}
          logoPriority={logoPriority}
          variant="mobileHeader"
        />
      </>
    );
  }

  if (variant === "hero") {
    return (
      <div
        {...props}
        className={cn(
          "relative z-50 grid h-[70px] w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center border-[rgba(255,255,255,0.1)] border-b bg-[rgba(0,0,0,0.8)] px-10 text-[#ffffff] lg:px-12 xl:px-20",
          className
        )}
      >
        <BrandLink
          ariaLabel={copy.brandAriaLabel}
          className="min-w-0 gap-2 justify-self-start"
          linkTabIndex={linkTabIndex}
          logoClassName={brandLogoClasses}
          logoPriority={logoPriority}
          textClassName="font-semibold text-[20px] leading-6"
        />

        <nav
          aria-label="Primary navigation"
          className="min-w-0 justify-self-center px-6 xl:px-12"
        >
          <ul className="flex min-w-0 items-center justify-center gap-5 whitespace-nowrap xl:gap-7">
            {copy.primaryNavigation.map((link) => (
              <li key={link.label}>
                <a
                  className={cn(
                    "font-normal text-[14px] leading-[17px] transition-opacity hover:opacity-70",
                    linkFocusClasses
                  )}
                  href={link.href}
                  tabIndex={linkTabIndex}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Account navigation" className="justify-self-end">
          <ul className="flex items-center gap-5 whitespace-nowrap xl:gap-6">
            {copy.accountNavigation.map((link) => (
              <li key={link.label}>
                <a
                  className={cn(
                    "font-normal text-[14px] leading-[17px] transition-opacity hover:opacity-70",
                    linkFocusClasses
                  )}
                  href={link.href}
                  tabIndex={linkTabIndex}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <LanguageSwitcher
                ariaLabel={copy.languageLabel}
                className="h-[47px] w-[47px]"
                currentLocale={currentLocale}
                linkTabIndex={linkTabIndex}
              />
            </li>
            <li>
              <DemoLink
                className="h-[47px] min-w-[90px] px-6 text-[16px] leading-5"
                label={copy.demoLabel}
                linkTabIndex={linkTabIndex}
              />
            </li>
          </ul>
        </nav>
      </div>
    );
  }

  if (variant === "mobileHeader") {
    return (
      <div
        {...props}
        className={cn(
          "relative z-20 flex items-center justify-between border-[rgba(255,255,255,0.1)] border-b px-5 pb-5 text-[#ffffff]",
          className
        )}
      >
        <BrandLink
          ariaLabel={copy.brandAriaLabel}
          className="gap-2"
          linkTabIndex={linkTabIndex}
          logoClassName={brandLogoClasses}
          logoPriority={logoPriority}
          textClassName="font-semibold text-[20px] leading-6"
        />
        <MobileNavbarMenu
          className="mr-3 ml-auto size-11"
          copy={copy}
          currentLocale={currentLocale}
          linkTabIndex={linkTabIndex}
        />
        <DemoLink
          className="h-11 px-5 text-[16px] leading-5"
          label={copy.demoLabel}
          linkTabIndex={linkTabIndex}
        />
      </div>
    );
  }

  return (
    <div
      {...props}
      className={cn(
        "grid h-[58px] grid-cols-[1fr_auto] items-center rounded-full border border-[rgba(255,255,255,0.14)] bg-[rgba(0,0,0,0.78)] px-[10px] text-[#ffffff] shadow-[0_18px_55px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:h-[64px] lg:h-[68px] lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]",
        className
      )}
    >
      <BrandLink
        ariaLabel={copy.brandAriaLabel}
        className="ml-[2px] min-w-0 gap-2 justify-self-start lg:ml-[7px]"
        linkTabIndex={linkTabIndex}
        logoClassName={brandLogoClasses}
        logoPriority={logoPriority}
        textClassName="font-semibold text-[20px] leading-6"
      />

      <nav
        aria-label="Primary navigation"
        className="hidden justify-self-center lg:block"
      >
        <ul className="flex items-center gap-8 whitespace-nowrap">
          {copy.primaryNavigation.map((link) => (
            <li key={link.label}>
              <a
                className={cn(
                  "font-normal text-[14px] leading-[17px] transition-opacity hover:opacity-70",
                  linkFocusClasses
                )}
                href={link.href}
                tabIndex={linkTabIndex}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <nav aria-label="Account navigation" className="justify-self-end">
        <ul className="flex items-center gap-3 sm:gap-4 lg:gap-6">
          {copy.accountNavigation.map((link) => (
            <li className="hidden lg:block" key={link.label}>
              <a
                className={cn(
                  "font-normal text-[14px] leading-[17px] transition-opacity hover:opacity-70",
                  linkFocusClasses
                )}
                href={link.href}
                tabIndex={linkTabIndex}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="lg:hidden">
            <MobileNavbarMenu
              className="size-[42px] sm:size-12"
              copy={copy}
              currentLocale={currentLocale}
              linkTabIndex={linkTabIndex}
            />
          </li>
          <li className="hidden lg:block">
            <LanguageSwitcher
              ariaLabel={copy.languageLabel}
              className="size-[42px] sm:size-12"
              currentLocale={currentLocale}
              linkTabIndex={linkTabIndex}
            />
          </li>
          <li>
            <DemoLink
              className="h-[42px] shrink-0 px-5 text-[16px] leading-5 sm:h-12 sm:px-6 lg:px-7"
              label={copy.demoLabel}
              linkTabIndex={linkTabIndex}
            />
          </li>
        </ul>
      </nav>
    </div>
  );
}
