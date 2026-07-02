"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { type NavbarCopy, SiteNavbar } from "@/components/navbar";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const headerNavbarSelector = "[data-homepage-header-nav]";
const floatingNavbarVariants = {
  hidden: {
    opacity: 0,
    scaleX: 1.02,
    y: -12,
  },
  visible: {
    opacity: 1,
    scaleX: 1,
    y: 0,
  },
};

function isVisibleInViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const style = getComputedStyle(element);

  return (
    style.display !== "none" &&
    rect.width > 0 &&
    rect.height > 0 &&
    rect.bottom > 0 &&
    rect.top < window.innerHeight
  );
}

interface FloatingNavbarProps {
  currentLocale: Locale;
  navbarCopy: NavbarCopy;
}

export function FloatingNavbar({
  currentLocale,
  navbarCopy,
}: FloatingNavbarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const headerNavbars = Array.from(
      document.querySelectorAll<HTMLElement>(headerNavbarSelector)
    );

    if (headerNavbars.length === 0) {
      throw new Error(
        `FloatingNavbar expected at least one ${headerNavbarSelector} trigger.`
      );
    }

    let animationFrame = 0;
    const updateVisibility = () => {
      setIsVisible(!headerNavbars.some(isVisibleInViewport));
    };
    const scheduleUpdate = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("scroll", scheduleUpdate);
    };
  }, []);

  return (
    <motion.div
      animate={isVisible ? "visible" : "hidden"}
      aria-hidden={!isVisible}
      className={cn(
        "fixed inset-x-0 top-4 z-[100] mx-auto w-[calc(100%-32px)] origin-top",
        isVisible ? "max-w-[1280px]" : "pointer-events-none max-w-[1376px]"
      )}
      data-homepage-floating-navbar="true"
      initial={false}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      variants={floatingNavbarVariants}
    >
      <SiteNavbar
        copy={navbarCopy}
        currentLocale={currentLocale}
        linkTabIndex={isVisible ? undefined : -1}
      />
    </motion.div>
  );
}
