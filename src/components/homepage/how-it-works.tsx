import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import {
  MotionButtonLink,
  MotionRevealDiv,
  MotionRevealH2,
  MotionRevealP,
} from "@/components/motion/motion-primitives";
import type { HomepageHowItWorksCopy } from "@/i18n/homepage-copy";

const stepAssets = [
  {
    layer: "how-it-works/create/media",
    src: "/homepage/how-it-works/how-it-works-create.png",
  },
  {
    layer: "how-it-works/engage/media",
    src: "/homepage/how-it-works/how-it-works-engage.png",
  },
  {
    layer: "how-it-works/analyze/media",
    src: "/homepage/how-it-works/how-it-works-analyze.png",
  },
] as const;

const linkFocusClasses =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#000000] focus-visible:outline-offset-4";

interface HomepageHowItWorksProps {
  copy: HomepageHowItWorksCopy;
}

function getHowItWorksSteps(copy: HomepageHowItWorksCopy) {
  if (copy.steps.length !== stepAssets.length) {
    throw new Error(
      `HomepageHowItWorks expected ${stepAssets.length} steps, received ${copy.steps.length}.`
    );
  }

  return stepAssets.map((asset, index) => {
    const stepCopy = copy.steps[index];

    if (!stepCopy) {
      throw new Error(
        `HomepageHowItWorks missing step copy at index ${index}.`
      );
    }

    return {
      ...asset,
      ...stepCopy,
    };
  });
}

export function HomepageHowItWorks({ copy }: HomepageHowItWorksProps) {
  const steps = getHowItWorksSteps(copy);

  return (
    <section
      className="w-full bg-[#000000] text-[#000000]"
      id="how-it-works"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <div
        className="mx-auto w-full max-w-[1440px] bg-[#ffffff] px-5 py-16 sm:px-8 lg:px-20 lg:pt-[106px] lg:pb-[80px]"
        data-figma-layer="how-it-works/section"
      >
        <div
          className="mx-auto max-w-[1280px]"
          data-figma-layer="how-it-works/content"
        >
          <div
            className="grid gap-8 lg:grid-cols-[minmax(0,580px)_minmax(360px,592px)] lg:items-start lg:justify-between"
            data-figma-layer="how-it-works/header"
          >
            <MotionRevealH2
              className="max-w-[640px] text-balance font-normal text-[64px] leading-[60px] tracking-[0] sm:text-[88px] sm:leading-[82px] lg:text-[126px] lg:leading-[116px]"
              data-figma-layer="how-it-works/title"
              delay={0.04}
              distance={14}
            >
              {copy.title}
            </MotionRevealH2>

            <MotionRevealDiv
              className="flex max-w-[592px] flex-col items-start gap-7 lg:pt-[6px]"
              data-figma-layer="how-it-works/intro"
              delay={0.12}
              distance={14}
            >
              <MotionRevealP
                className="text-pretty font-normal text-[22px] leading-[31px] tracking-[0] lg:text-[24px] lg:leading-[34px]"
                data-figma-layer="how-it-works/intro/copy"
                delay={0.16}
                distance={12}
              >
                {copy.intro}
              </MotionRevealP>

              <MotionButtonLink
                className={`inline-flex h-[50px] items-center justify-center rounded-full bg-[#5865ff] px-6 font-normal text-[#ffffff] text-[16px] leading-5 transition-opacity hover:opacity-90 ${linkFocusClasses}`}
                data-figma-layer="how-it-works/intro/cta"
                href="#features"
              >
                {copy.ctaLabel}
              </MotionButtonLink>
            </MotionRevealDiv>
          </div>

          <div
            className="mt-16 border-[rgba(0,0,0,0.14)] border-t lg:mt-[85px]"
            data-figma-layer="how-it-works/steps"
          >
            {steps.map((step, index) => (
              <HowItWorksStep
                key={step.title}
                revealDelay={0.08 * index}
                {...step}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface HowItWorksStepProps {
  description: string;
  layer: string;
  revealDelay: number;
  src: string;
  stepLabel: string;
  title: string;
}

function HowItWorksStep({
  description,
  layer,
  revealDelay,
  src,
  stepLabel,
  title,
}: HowItWorksStepProps) {
  const stepLayer = layer.replace("/media", "");

  return (
    <article
      className="grid gap-8 border-[rgba(0,0,0,0.14)] border-b py-10 lg:min-h-[320px] lg:grid-cols-[280px_minmax(0,944px)] lg:items-center lg:gap-14"
      data-figma-layer={stepLayer}
    >
      <MotionRevealDiv
        className="max-w-[460px]"
        data-figma-layer={`${stepLayer}/copy`}
        delay={revealDelay}
        distance={14}
      >
        <p className="font-normal text-[18px] leading-[25px] tracking-[0]">
          {stepLabel}
        </p>
        <h3 className="mt-5 flex items-center gap-4 font-normal text-[56px] leading-[58px] tracking-[0] sm:text-[64px] sm:leading-[66px] lg:text-[66px] lg:leading-[67px]">
          <span>{title}</span>
          <ArrowUpRightIcon
            aria-hidden="true"
            className="h-[0.78em] w-[0.78em] shrink-0 stroke-[1.6]"
          />
        </h3>
        <p className="mt-5 text-pretty font-normal text-[17px] leading-[24px] tracking-[0] lg:text-[18px] lg:leading-[25px]">
          {description}
        </p>
      </MotionRevealDiv>

      <MotionRevealDiv
        className="w-full overflow-hidden rounded-full bg-[#f3ffab]"
        data-figma-layer={layer}
        delay={revealDelay + 0.06}
        distance={18}
      >
        <Image
          alt=""
          aria-hidden="true"
          className="h-auto w-full rounded-full object-cover"
          height={240}
          loading="lazy"
          sizes="(max-width: 1023px) calc(100vw - 40px), 944px"
          src={src}
          width={944}
        />
      </MotionRevealDiv>
    </article>
  );
}
