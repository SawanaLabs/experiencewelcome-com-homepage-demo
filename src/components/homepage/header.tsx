import Image from "next/image";
import homeHeroBlurImage from "@/assets/homepage/header/home-hero-blur.webp";
import homeHeroCardImage from "@/assets/homepage/header/home-hero-card.webp";
import {
  MotionButtonLink,
  MotionRevealDiv,
  MotionRevealH1,
  MotionRevealP,
} from "@/components/motion/motion-primitives";
import { type NavbarCopy, SiteNavbar } from "@/components/navbar";
import type { HomepageHeaderCopy } from "@/i18n/homepage-copy";
import type { Locale } from "@/i18n/routing";

const linkFocusClasses =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ffffff] focus-visible:outline-offset-4";
const homeHeroBlurBlurDataUrl =
  "data:image/webp;base64,UklGRoQAAABXRUJQVlA4THgAAAAvCcAAADWwjWxbyXf3j0vM0AEZQ0gB5NRATP81vFEiSVIzR1IUFs3//wYqR7WNJDX72P6rJCXycN//IMAQAgBAAhHoFwau1P5rH+K5Rlnu5uaV5h4vASSs+57l31nPHK9pX+2/r0eoGIBCPT5dm553vHYwtuRvxAA=";
const homeHeroCardBlurDataUrl =
  "data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAACQAABQAAQUxQSDUAAAABT6AmAJA2y54/AbhIYBEjIsZpEe/1h5pIUiQTCPol4AELpESbX7SKz0JE/+MAzCO5X+0uAQBWUDggPgAAAPABAJ0BKgoABgACgEIllAJ0ANxLFmJgAAD+76fzueQGbtIhsdk8ZGyf+VMHUqM8gN+xtH6Gp3IN+YgRwAAA";

interface HomepageHeaderProps {
  copy: HomepageHeaderCopy;
  currentLocale: Locale;
  navbarCopy: NavbarCopy;
}

export function HomepageHeader({
  copy,
  currentLocale,
  navbarCopy,
}: HomepageHeaderProps) {
  return (
    <header className="w-full bg-[#000000] text-[#ffffff]">
      <div className="mx-auto w-full max-w-[1440px] overflow-hidden bg-[#000000]">
        <SiteNavbar
          autoBreakpoint="lg"
          copy={navbarCopy}
          currentLocale={currentLocale}
          data-figma-layer="header/nav"
          data-homepage-header-nav="true"
          logoPriority
          variant="auto"
        />

        <div
          className="px-5 pt-10 pb-16 lg:px-20 lg:pt-[6px] lg:pb-[82px]"
          data-figma-layer="header/content"
        >
          <div className="mx-auto flex max-w-[1280px] flex-col items-center text-center">
            <MotionRevealH1
              className="relative z-20 max-w-[1180px] text-wrap font-normal text-[56px] leading-[60px] tracking-[0] sm:text-[72px] sm:leading-[78px] lg:text-[88px] lg:leading-[100px] xl:text-[103px] xl:leading-[121px]"
              data-figma-layer="header/content/title"
              delay={0.04}
              distance={14}
            >
              {copy.title}
            </MotionRevealH1>
            <MotionRevealP
              className="relative z-20 mt-6 max-w-[585px] text-pretty font-normal text-[20px] text-[rgba(255,255,255,0.7)] leading-[28px] tracking-[0] lg:text-[22px] lg:leading-[31px] xl:text-[24px] xl:leading-[34px]"
              data-figma-layer="header/content/subtitle"
              delay={0.12}
              distance={14}
            >
              {copy.subtitle}
            </MotionRevealP>

            <MotionRevealDiv
              className="relative z-20 mt-8 flex flex-wrap items-center justify-center gap-2 lg:mt-4"
              data-figma-layer="header/content/cta"
              delay={0.2}
              distance={12}
            >
              <MotionButtonLink
                className={`flex h-[50px] items-center justify-center rounded-full bg-[#5865ff] px-6 font-normal text-[16px] leading-5 transition-opacity hover:opacity-90 ${linkFocusClasses}`}
                href="#demo"
              >
                {copy.primaryCtaLabel}
              </MotionButtonLink>
              <MotionButtonLink
                className={`flex h-[50px] items-center justify-center gap-3 rounded-full border border-[rgba(255,255,255,0.16)] bg-[rgba(0,0,0,0.2)] px-6 font-normal text-[16px] leading-5 transition-opacity hover:opacity-80 ${linkFocusClasses}`}
                href="#how-it-works"
              >
                <span
                  aria-hidden="true"
                  className="h-0 w-0 border-y-[5px] border-y-transparent border-l-[#ffffff] border-l-[8px]"
                />
                {copy.secondaryCtaLabel}
              </MotionButtonLink>
            </MotionRevealDiv>

            <MotionRevealDiv
              className="relative z-10 mt-4 grid aspect-[760/520] w-full max-w-[760px] grid-cols-1 grid-rows-1 place-items-center overflow-visible lg:mt-[10px] lg:aspect-[1280/654] lg:max-w-[1280px]"
              data-figma-layer="header/media-stage"
              delay={0.28}
              distance={20}
            >
              <Image
                alt=""
                aria-hidden="true"
                blurDataURL={homeHeroBlurBlurDataUrl}
                className="pointer-events-none z-0 col-start-1 row-start-1 w-[145%] max-w-none lg:w-[156.25%]"
                data-figma-layer="header/home-hero-blur"
                height={659}
                placeholder="blur"
                preload
                src={homeHeroBlurImage}
                unoptimized
                width={1600}
              />

              <Image
                alt=""
                aria-hidden="true"
                className="pointer-events-none z-10 col-start-1 row-start-1 hidden w-[106%] max-w-none lg:block lg:translate-y-[21px]"
                data-figma-layer="header/home-hero-mockup"
                height={774}
                preload
                src="/homepage/header/home-hero-mockup.png"
                width={1600}
              />

              <div
                className="relative z-20 col-start-1 row-start-1 aspect-[1088/607] w-full max-w-[760px] overflow-hidden rounded-[12px] bg-[rgba(255,255,255,0.002)] lg:w-[85%] lg:max-w-[1088px] lg:rounded-[16px]"
                data-figma-layer="header/hero-card"
              >
                <div className="absolute top-[-6.76%] left-[-10.29%] h-[126.03%] w-[114.52%]">
                  <Image
                    alt={copy.previewAlt}
                    blurDataURL={homeHeroCardBlurDataUrl}
                    className="object-fill"
                    fill
                    placeholder="blur"
                    preload
                    sizes="(max-width: 1023px) calc((100vw - 40px) * 1.1452), 1246px"
                    src={homeHeroCardImage}
                    unoptimized
                  />
                </div>
              </div>
            </MotionRevealDiv>
          </div>
        </div>
      </div>
    </header>
  );
}
