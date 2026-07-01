import Image from "next/image";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const primaryNavigation = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Events", href: "#events" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "#blog" },
];

const accountNavigation = [
  { label: "Support", href: "#support" },
  { label: "Login", href: "#login" },
];

const linkFocusClasses =
  "focus-visible:outline-[2px_solid_#ffffff] focus-visible:outline-offset-4";

type NavbarVariant = "floating" | "hero" | "mobileHeader";

type SiteNavbarProps = ComponentProps<"div"> & {
  linkTabIndex?: ComponentProps<"a">["tabIndex"];
  logoPriority?: boolean;
  variant?: NavbarVariant;
};

interface BrandLinkProps {
  className?: string;
  linkTabIndex?: ComponentProps<"a">["tabIndex"];
  logoClassName: string;
  logoPriority?: boolean;
  textClassName: string;
}

function BrandLink({
  className,
  linkTabIndex,
  logoClassName,
  logoPriority = false,
  textClassName,
}: BrandLinkProps) {
  return (
    <a
      aria-label="Welcome home"
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
  linkTabIndex,
}: {
  className?: string;
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
      Demo
    </a>
  );
}

export function SiteNavbar({
  className,
  linkTabIndex,
  logoPriority = false,
  variant = "floating",
  ...props
}: SiteNavbarProps) {
  if (variant === "hero") {
    return (
      <div
        {...props}
        className={cn(
          "absolute top-0 left-0 z-50 h-[min(69.8px,4.847vw)] w-full border-[rgba(255,255,255,0.1)] border-b bg-[rgba(0,0,0,0.8)] text-[#ffffff]",
          className
        )}
      >
        <BrandLink
          className="absolute top-[min(18px,1.25vw)] left-[min(80px,5.556vw)] gap-[min(8px,0.556vw)]"
          linkTabIndex={linkTabIndex}
          logoClassName="h-[min(32px,2.222vw)] w-[min(28px,1.944vw)]"
          logoPriority={logoPriority}
          textClassName="font-semibold text-[min(20px,1.389vw)] leading-[min(24px,1.667vw)]"
        />

        <nav aria-label="Primary navigation">
          <ul className="absolute top-[min(27px,1.875vw)] left-[min(549px,38.125vw)] flex items-center gap-[min(32px,2.222vw)]">
            {primaryNavigation.map((link) => (
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

        <nav aria-label="Account navigation">
          <ul className="absolute top-[min(11px,0.764vw)] right-[min(80px,5.556vw)] flex items-center gap-[min(24px,1.667vw)]">
            {accountNavigation.map((link) => (
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
              <DemoLink
                className="h-[min(47px,3.264vw)] min-w-[min(90px,6.25vw)] px-[min(24px,1.667vw)] text-[min(16px,1.111vw)] leading-[min(20px,1.389vw)]"
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
          className="gap-2"
          linkTabIndex={linkTabIndex}
          logoClassName="h-8 w-7"
          logoPriority={logoPriority}
          textClassName="font-semibold text-[20px] leading-6"
        />
        <DemoLink
          className="h-11 px-5 text-[16px] leading-5"
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
          {primaryNavigation.map((link) => (
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
          {accountNavigation.map((link) => (
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
            <DemoLink
              className="h-[42px] shrink-0 px-5 text-[16px] leading-5 sm:h-12 sm:px-6 lg:px-7"
              linkTabIndex={linkTabIndex}
            />
          </li>
        </ul>
      </nav>
    </div>
  );
}
