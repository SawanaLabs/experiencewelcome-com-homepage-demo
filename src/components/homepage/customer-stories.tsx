"use client";

import { useReducedMotion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useId, useRef } from "react";
import {
  MotionInteractiveButton,
  MotionRevealArticle,
  MotionRevealDiv,
  MotionRevealH2,
} from "@/components/motion/motion-primitives";
import type { HomepageCustomerStoriesCopy } from "@/i18n/homepage-copy";

const testimonialAssets = [
  {
    avatar: "/homepage/customer-stories/ally-masi-avatar.png",
    cardLayer: "customer-stories/card-salesforce",
    logo: {
      height: 162,
      src: "/homepage/customer-stories/salesforce-logo.png",
      width: 240,
    },
  },
  {
    avatar: "/homepage/customer-stories/talisha-brantley-avatar.png",
    cardLayer: "customer-stories/card-bitwise",
    logo: {
      height: 64,
      src: "/homepage/customer-stories/bitwise-logo.png",
      width: 241,
    },
  },
  {
    avatar: "/homepage/customer-stories/madeleine-sava-avatar.png",
    cardLayer: "customer-stories/card-dribbble",
    logo: {
      height: 61,
      src: "/homepage/customer-stories/dribbble-logo.png",
      width: 240,
    },
  },
];

const controlButtonClasses =
  "relative flex h-11 w-11 items-center justify-center transition-opacity hover:opacity-70 lg:h-16 lg:w-16";
const controlFocusClasses =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#000000] focus-visible:outline-offset-4";
const controlIconClasses = "h-full w-full object-contain";

interface HomepageCustomerStoriesProps {
  copy: HomepageCustomerStoriesCopy;
}

function getCarouselScrollTargets(carousel: HTMLElement) {
  const cards = Array.from(
    carousel.querySelectorAll<HTMLElement>("[data-customer-story-card]")
  );
  const firstCard = cards[0];

  if (!firstCard) {
    return [];
  }

  const maxScroll = Math.max(0, carousel.scrollWidth - carousel.clientWidth);
  const baseOffset = firstCard.offsetLeft;
  const positions = cards.map((card) =>
    Math.min(maxScroll, Math.max(0, card.offsetLeft - baseOffset))
  );

  return positions.filter(
    (position, index) =>
      index === 0 || Math.abs(position - positions[index - 1]) > 1
  );
}

function getNextCarouselScrollTarget(carousel: HTMLElement, direction: -1 | 1) {
  const targets = getCarouselScrollTargets(carousel);

  if (targets.length === 0) {
    return null;
  }

  let currentIndex = 0;
  let currentDistance = Number.POSITIVE_INFINITY;

  for (const [index, target] of targets.entries()) {
    const distance = Math.abs(carousel.scrollLeft - target);

    if (distance < currentDistance) {
      currentDistance = distance;
      currentIndex = index;
    }
  }

  return targets[(currentIndex + direction + targets.length) % targets.length];
}

function getTestimonialCards(copy: HomepageCustomerStoriesCopy) {
  if (copy.testimonials.length !== testimonialAssets.length) {
    throw new Error(
      `HomepageCustomerStories expected ${testimonialAssets.length} testimonials, received ${copy.testimonials.length}.`
    );
  }

  return testimonialAssets.map((asset, index) => {
    const testimonialCopy = copy.testimonials[index];

    if (!testimonialCopy) {
      throw new Error(
        `HomepageCustomerStories missing testimonial copy at index ${index}.`
      );
    }

    return {
      ...asset,
      ...testimonialCopy,
    };
  });
}

export function HomepageCustomerStories({
  copy,
}: HomepageCustomerStoriesProps) {
  const testimonials = getTestimonialCards(copy);
  const carouselId = useId();
  const carouselRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const scrollCarousel = useCallback(
    (direction: -1 | 1) => {
      const carousel = carouselRef.current;

      if (!carousel) {
        return;
      }

      const nextScrollTarget = getNextCarouselScrollTarget(carousel, direction);

      if (nextScrollTarget === null) {
        return;
      }

      carousel.scrollTo({
        behavior: shouldReduceMotion ? "auto" : "smooth",
        left: nextScrollTarget,
      });
    },
    [shouldReduceMotion]
  );

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const intervalId = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        scrollCarousel(1);
      }
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [scrollCarousel, shouldReduceMotion]);

  return (
    <section
      className="w-full bg-[#000000] text-[#ffffff]"
      id="customer-stories"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <div
        className="relative mx-auto w-full max-w-[1440px] overflow-hidden bg-[#000000] px-5 pt-16 pb-20 sm:px-8 lg:px-20 lg:pt-[clamp(112px,10.417vw,150px)] lg:pb-[clamp(112px,10.069vw,145px)]"
        data-figma-layer="customer-stories/section"
      >
        <Image
          alt=""
          aria-hidden="true"
          className="object-cover"
          data-figma-layer="customer-stories/background"
          fill
          priority
          sizes="1440px"
          src="/homepage/customer-stories/customer-stories-background.jpg"
        />

        <div
          className="relative z-10 mx-auto max-w-[1280px]"
          data-figma-layer="customer-stories/content"
        >
          <MotionRevealDiv
            className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:gap-5 lg:min-h-[230px]"
            data-figma-layer="customer-stories/top-row"
            distance={16}
          >
            <MotionRevealH2
              className="max-w-[min(100%,360px)] text-balance font-normal text-[#000000] text-[64px] leading-[60px] tracking-[0] sm:max-w-[520px] sm:text-[84px] sm:leading-[80px] lg:max-w-[760px] lg:text-[clamp(96px,8.403vw,121px)] lg:leading-[clamp(92px,8vw,115px)]"
              data-figma-layer="customer-stories/title"
              delay={0.06}
              distance={12}
            >
              {copy.title}
            </MotionRevealH2>
            <div
              className="flex shrink-0 items-center gap-2 self-start sm:self-end lg:gap-4"
              data-figma-layer="customer-stories/controls"
            >
              <MotionInteractiveButton
                aria-controls={carouselId}
                aria-label={copy.previousStoryLabel}
                className={`${controlButtonClasses} ${controlFocusClasses}`}
                data-customer-stories-previous="true"
                onClick={() => scrollCarousel(-1)}
                type="button"
              >
                <Image
                  alt=""
                  aria-hidden="true"
                  className={controlIconClasses}
                  height={128}
                  src="/homepage/customer-stories/arrow-left.png"
                  width={128}
                />
              </MotionInteractiveButton>
              <MotionInteractiveButton
                aria-controls={carouselId}
                aria-label={copy.nextStoryLabel}
                className={`${controlButtonClasses} ${controlFocusClasses}`}
                data-customer-stories-next="true"
                onClick={() => scrollCarousel(1)}
                type="button"
              >
                <Image
                  alt=""
                  aria-hidden="true"
                  className={controlIconClasses}
                  height={128}
                  src="/homepage/customer-stories/arrow-right.png"
                  width={128}
                />
              </MotionInteractiveButton>
            </div>
          </MotionRevealDiv>

          <div
            className="mt-16 flex w-full snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain scroll-smooth pb-6 [-ms-overflow-style:none] [scrollbar-width:none] lg:mt-[clamp(56px,5.069vw,73px)] lg:gap-8 [&::-webkit-scrollbar]:hidden"
            data-figma-layer="customer-stories/carousel"
            id={carouselId}
            ref={carouselRef}
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.cardLayer}
                revealDelay={0.08 * index}
                {...testimonial}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  author: string;
  avatar: string;
  cardLayer: string;
  company: string;
  logo: {
    height: number;
    src: string;
    width: number;
  };
  logoAlt: string;
  quote: string;
  revealDelay: number;
  role: string;
}

function TestimonialCard({
  author,
  avatar,
  cardLayer,
  company,
  logoAlt,
  logo,
  quote,
  revealDelay,
  role,
}: TestimonialCardProps) {
  return (
    <MotionRevealArticle
      className="w-full shrink-0 snap-start rounded-tr-[32px] border-[#ffffff] border-t border-r pt-8 pr-6 sm:w-[420px] md:w-[520px] lg:min-h-[416px] lg:w-[clamp(480px,42.708vw,615px)] lg:pt-[45px] lg:pr-8"
      data-customer-story-card="true"
      data-figma-layer={cardLayer}
      delay={revealDelay}
      distance={16}
    >
      <p
        className="font-normal text-[20px] leading-[28px] tracking-[0] lg:text-[23px] lg:leading-[31px]"
        data-figma-layer={`${cardLayer}/quote`}
      >
        {quote}
      </p>

      <div
        className="mt-8 flex items-center lg:mt-10"
        data-figma-layer={`${cardLayer}/author`}
      >
        <Image
          alt=""
          aria-hidden="true"
          className="h-14 w-14 rounded-full object-cover lg:h-16 lg:w-16"
          height={97}
          src={avatar}
          width={97}
        />
        <div className="ml-4">
          <p className="font-normal text-[18px] leading-[22px] lg:text-[19px] lg:leading-[23px]">
            {author}
          </p>
          <p className="mt-1 max-w-[380px] font-normal text-[14px] text-[rgba(255,255,255,0.65)] leading-[20px] lg:text-[15px] lg:leading-[21px]">
            {role}
            <br />
            {company}
          </p>
        </div>
      </div>

      <Image
        alt={logoAlt}
        className="mt-8 h-auto w-[120px] lg:mt-[33px]"
        data-figma-layer={`${cardLayer}/logo`}
        height={logo.height}
        src={logo.src}
        style={{ height: "auto" }}
        width={logo.width}
      />
    </MotionRevealArticle>
  );
}
