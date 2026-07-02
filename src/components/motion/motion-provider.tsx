"use client";

import { MotionConfig, type MotionConfigProps } from "motion/react";

const noScriptRevealFallback =
  '[data-motion="viewport-reveal"]{opacity:1!important;transform:none!important;}';

type HomepageMotionProviderProps = Omit<
  MotionConfigProps,
  "reducedMotion" | "transition"
> & {
  reducedMotion?: MotionConfigProps["reducedMotion"];
  transition?: MotionConfigProps["transition"];
};

export function HomepageMotionProvider({
  reducedMotion = "user",
  transition = { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
  ...props
}: HomepageMotionProviderProps) {
  return (
    <>
      <MotionConfig
        reducedMotion={reducedMotion}
        transition={transition}
        {...props}
      />
      <noscript>
        <style>{noScriptRevealFallback}</style>
      </noscript>
    </>
  );
}
