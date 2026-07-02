"use client";

import { type HTMLMotionProps, motion, useReducedMotion } from "motion/react";

const revealEase = [0.22, 1, 0.36, 1] as const;
const revealViewport = { amount: 0.32, once: true } as const;
const interactiveTransition = {
  damping: 28,
  stiffness: 420,
  type: "spring",
} as const;

interface RevealOptions {
  delay?: number;
  distance?: number;
  duration?: number;
}

type RevealDivProps = HTMLMotionProps<"div"> & RevealOptions;
type RevealHeadingProps = HTMLMotionProps<"h1"> & RevealOptions;
type RevealH2Props = HTMLMotionProps<"h2"> & RevealOptions;
type RevealParagraphProps = HTMLMotionProps<"p"> & RevealOptions;
type RevealNavProps = HTMLMotionProps<"nav"> & RevealOptions;
type RevealArticleProps = HTMLMotionProps<"article"> & RevealOptions;
type ButtonLinkProps = HTMLMotionProps<"a">;
type InteractiveButtonProps = HTMLMotionProps<"button">;

function getRevealMotionProps({
  delay = 0,
  distance = 18,
  duration = 0.62,
}: RevealOptions) {
  return {
    initial: { opacity: 0, y: distance },
    transition: { delay, duration, ease: revealEase },
    viewport: revealViewport,
    whileInView: { opacity: 1, y: 0 },
  };
}

function useRevealMotionProps(options: RevealOptions) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return { initial: false };
  }

  return getRevealMotionProps(options);
}

export function MotionRevealDiv({
  delay,
  distance,
  duration,
  ...props
}: RevealDivProps) {
  const revealProps = useRevealMotionProps({ delay, distance, duration });

  return (
    <motion.div data-motion="viewport-reveal" {...revealProps} {...props} />
  );
}

export function MotionRevealH1({
  delay,
  distance,
  duration,
  ...props
}: RevealHeadingProps) {
  const revealProps = useRevealMotionProps({ delay, distance, duration });

  return (
    <motion.h1 data-motion="viewport-reveal" {...revealProps} {...props} />
  );
}

export function MotionRevealH2({
  delay,
  distance,
  duration,
  ...props
}: RevealH2Props) {
  const revealProps = useRevealMotionProps({ delay, distance, duration });

  return (
    <motion.h2 data-motion="viewport-reveal" {...revealProps} {...props} />
  );
}

export function MotionRevealP({
  delay,
  distance,
  duration,
  ...props
}: RevealParagraphProps) {
  const revealProps = useRevealMotionProps({ delay, distance, duration });

  return <motion.p data-motion="viewport-reveal" {...revealProps} {...props} />;
}

export function MotionRevealNav({
  delay,
  distance,
  duration,
  ...props
}: RevealNavProps) {
  const revealProps = useRevealMotionProps({ delay, distance, duration });

  return (
    <motion.nav data-motion="viewport-reveal" {...revealProps} {...props} />
  );
}

export function MotionRevealArticle({
  delay,
  distance,
  duration,
  ...props
}: RevealArticleProps) {
  const revealProps = useRevealMotionProps({ delay, distance, duration });

  return (
    <motion.article data-motion="viewport-reveal" {...revealProps} {...props} />
  );
}

export function MotionButtonLink({ style, ...props }: ButtonLinkProps) {
  return (
    <motion.a
      data-motion="micro-interaction"
      style={{ transformOrigin: "center", ...style }}
      transition={interactiveTransition}
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.985 }}
      {...props}
    />
  );
}

export function MotionInteractiveButton({
  style,
  ...props
}: InteractiveButtonProps) {
  return (
    <motion.button
      data-motion="micro-interaction"
      style={{ transformOrigin: "center", ...style }}
      transition={interactiveTransition}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      {...props}
    />
  );
}
