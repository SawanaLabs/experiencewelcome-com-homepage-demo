import Image from "next/image";
import type { ComponentProps } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
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
          "absolute top-0 left-0 z-50 grid h-[min(69.8px,4.847vw)] w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center border-[rgba(255,255,255,0.1)] border-b bg-[rgba(0,0,0,0.8)] px-[min(80px,5.556vw)] text-[#ffffff]",
          className
        )}
      >
        <BrandLink
          ariaLabel={copy.brandAriaLabel}
          className="min-w-0 gap-[min(8px,0.556vw)] justify-self-start"
          linkTabIndex={linkTabIndex}
          logoClassName="h-[min(32px,2.222vw)] w-[min(28px,1.944vw)]"
          logoPriority={logoPriority}
          textClassName="font-semibold text-[min(20px,1.389vw)] leading-[min(24px,1.667vw)]"
        />

        <nav
          aria-label="Primary navigation"
          className="min-w-0 justify-self-center px-[min(48px,3.333vw)]"
        >
          <ul className="flex min-w-0 items-center justify-center gap-[clamp(16px,1.944vw,28px)] whitespace-nowrap">
            {copy.primaryNavigation.map((link) => (
              <li key={link.label}>
                <a
                  className={cn(
                    "font-normal text-[min(14px,0.972vw)] leading-[min(17px,1.181vw)] transition-opacity hover:opacity-70",
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
          <ul className="flex items-center gap-[min(24px,1.667vw)] whitespace-nowrap">
            {copy.accountNavigation.map((link) => (
              <li key={link.label}>
                <a
                  className={cn(
                    "font-normal text-[min(14px,0.972vw)] leading-[min(17px,1.181vw)] transition-opacity hover:opacity-70",
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
                className="h-[min(47px,3.264vw)] w-[min(47px,3.264vw)]"
                currentLocale={currentLocale}
                linkTabIndex={linkTabIndex}
              />
            </li>
            <li>
              <DemoLink
                className="h-[min(47px,3.264vw)] min-w-[min(90px,6.25vw)] px-[min(24px,1.667vw)] text-[min(16px,1.111vw)] leading-[min(20px,1.389vw)]"
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
          "relative z-20 flex items-center justify-between border-[rgba(255,255,255,0.1)] border-b pb-5 text-[#ffffff]",
          className
        )}
      >
        <BrandLink
          ariaLabel={copy.brandAriaLabel}
          className="gap-2"
          linkTabIndex={linkTabIndex}
          logoClassName="h-8 w-7"
          logoPriority={logoPriority}
          textClassName="font-semibold text-[20px] leading-6"
        />
        <LanguageSwitcher
          ariaLabel={copy.languageLabel}
          className="mr-3 ml-auto size-11"
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
        logoClassName="h-8 w-7"
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
        <ul className="flex items-center gap-6">
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
          <li>
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
