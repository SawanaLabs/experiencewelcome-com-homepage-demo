import Image from "next/image";
import { type NavbarCopy, SiteNavbar } from "@/components/navbar";
import type { Locale } from "@/i18n/routing";

const linkFocusClasses =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ffffff] focus-visible:outline-offset-4";

interface HomepageHeaderProps {
  currentLocale: Locale;
  navbarCopy: NavbarCopy;
}

export function HomepageHeader({
  currentLocale,
  navbarCopy,
}: HomepageHeaderProps) {
  return (
    <header className="w-full bg-[#000000] text-[#ffffff]">
      <div className="relative mx-auto hidden h-[min(1142px,79.306vw)] w-full max-w-[1440px] overflow-hidden bg-[#000000] lg:block">
        <SiteNavbar
          copy={navbarCopy}
          currentLocale={currentLocale}
          data-figma-layer="header/nav"
          data-homepage-header-nav="true"
          logoPriority
          variant="hero"
        />

        <div
          aria-hidden="true"
          className="absolute top-[min(283.81px,19.709vw)] left-[max(-280px,-19.444vw)] z-0 h-[min(823.73px,57.204vw)] w-[min(2000px,138.889vw)]"
          data-figma-layer="header/home-hero-blur"
        >
          <Image
            alt=""
            className="h-full w-full object-fill"
            height={659}
            priority
            src="/homepage/header/home-hero-blur.png"
            width={1600}
          />
        </div>

        <div
          aria-hidden="true"
          className="absolute top-[min(403.42px,28.015vw)] left-[min(41.6px,2.889vw)] z-10 h-[min(656.34px,45.579vw)] w-[min(1356.8px,94.222vw)]"
          data-figma-layer="header/home-hero-mockup"
        >
          <Image
            alt=""
            className="h-full w-full object-fill"
            height={774}
            priority
            src="/homepage/header/home-hero-mockup.png"
            width={1600}
          />
        </div>

        <div
          className="absolute top-[min(406.1px,28.201vw)] left-[min(172.8px,12vw)] z-20 h-[min(606.55px,42.122vw)] w-[min(1088px,75.556vw)] rounded-[min(16px,1.111vw)] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.002)]"
          data-figma-layer="header/hero-card"
        >
          <Image
            alt="Launch day webinar preview"
            className="absolute top-[-6.76%] left-[-10.29%] h-[126.12%] w-[114.52%] max-w-none object-fill"
            height={765}
            priority
            src="/homepage/header/home-hero-card.png"
            width={1246}
          />
        </div>

        <div
          className="absolute top-[min(16px,1.111vw)] left-[min(80px,5.556vw)] z-40 h-[min(289.38px,20.096vw)] w-[min(1280px,88.889vw)]"
          data-figma-layer="header/content"
        >
          <h1
            className="absolute top-[min(60px,4.167vw)] left-[min(166.34px,11.551vw)] h-[min(121px,8.403vw)] w-[min(946px,65.694vw)] text-center font-normal text-[min(103px,7.153vw)] leading-[min(121px,8.403vw)] tracking-[-2px]"
            data-figma-layer="header/content/title"
          >
            Captivate &amp; Convert
          </h1>
          <p
            className="absolute top-[min(205px,14.236vw)] left-[min(347.75px,24.149vw)] h-[min(63px,4.375vw)] w-[min(584.7px,40.604vw)] text-center font-normal text-[min(24px,1.667vw)] text-[rgba(255,255,255,0.7)] leading-[min(31.2px,2.167vw)] tracking-[0]"
            data-figma-layer="header/content/subtitle"
          >
            A webinar platform designed for marketers to host jaw-dropping
            experiences that drive revenue.
          </p>

          <div
            className="absolute top-[min(283.4px,19.681vw)] left-0 flex h-[min(50px,3.472vw)] w-[min(1280px,88.889vw)] items-center gap-[min(8px,0.556vw)] px-[min(502.05px,34.865vw)]"
            data-figma-layer="header/content/cta"
          >
            <a
              className={`flex h-full items-center justify-center rounded-full bg-[#5865ff] px-[min(24px,1.667vw)] font-normal text-[min(16px,1.111vw)] leading-[min(20px,1.389vw)] transition-opacity hover:opacity-90 ${linkFocusClasses}`}
              href="#demo"
            >
              Demo
            </a>
            <a
              className={`flex h-full items-center justify-center gap-[min(12px,0.833vw)] rounded-full border border-[rgba(255,255,255,0.16)] bg-[rgba(0,0,0,0.2)] px-[min(24px,1.667vw)] font-normal text-[min(16px,1.111vw)] leading-[min(20px,1.389vw)] transition-opacity hover:opacity-80 ${linkFocusClasses}`}
              href="#how-it-works"
            >
              <span
                aria-hidden="true"
                className="h-0 w-0 border-y-[min(5px,0.347vw)] border-y-transparent border-l-[#ffffff] border-l-[min(8px,0.556vw)]"
              />
              How it works
            </a>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden px-5 pt-5 pb-16 lg:hidden">
        <SiteNavbar
          copy={navbarCopy}
          currentLocale={currentLocale}
          data-homepage-header-nav="true"
          logoPriority
          variant="mobileHeader"
        />

        <div className="relative z-20 mx-auto mt-10 max-w-[640px] text-center">
          <h1 className="font-normal text-[56px] leading-[60px] tracking-[0] sm:text-[72px] sm:leading-[78px]">
            Captivate &amp; Convert
          </h1>
          <p className="mx-auto mt-6 max-w-[560px] font-normal text-[20px] text-[rgba(255,255,255,0.65)] leading-[26px] tracking-[0]">
            A webinar platform designed for marketers to host jaw-dropping
            experiences that drive revenue.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <a
              className={`flex h-[50px] items-center justify-center rounded-full bg-[#5865ff] px-6 font-normal text-[16px] leading-5 ${linkFocusClasses}`}
              href="#demo"
            >
              Demo
            </a>
            <a
              className={`flex h-[50px] items-center justify-center gap-3 rounded-full border border-[rgba(255,255,255,0.16)] bg-[rgba(0,0,0,0.2)] px-6 font-normal text-[16px] leading-5 ${linkFocusClasses}`}
              href="#how-it-works"
            >
              <span
                aria-hidden="true"
                className="h-0 w-0 border-y-[5px] border-y-transparent border-l-[#ffffff] border-l-[8px]"
              />
              How it works
            </a>
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-12 max-w-[760px]">
          <Image
            alt="Launch day webinar preview"
            className="relative z-20 h-auto w-full"
            height={765}
            priority
            src="/homepage/header/home-hero-card.png"
            width={1246}
          />
          <Image
            alt=""
            aria-hidden="true"
            className="absolute top-[-12%] left-1/2 z-0 h-auto w-[145%] max-w-none -translate-x-1/2"
            height={659}
            priority
            src="/homepage/header/home-hero-blur.png"
            width={1600}
          />
        </div>
      </div>
    </header>
  );
}
