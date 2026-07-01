"use client";

import { useEffect, useState } from "react";
import { SiteNavbar } from "@/components/navbar";
import { cn } from "@/lib/utils";

const headerNavbarSelector = "[data-homepage-header-nav]";

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

export function FloatingNavbar() {
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
    <div
      aria-hidden={!isVisible}
      className={cn(
        "fixed inset-x-0 top-4 z-[100] mx-auto w-[calc(100%-32px)] origin-top transition-[max-width,opacity,transform] duration-300 ease-out",
        isVisible
          ? "max-w-[1280px] translate-y-0 scale-x-100 opacity-100"
          : "pointer-events-none max-w-[1376px] -translate-y-3 scale-x-[1.02] opacity-0"
      )}
      data-homepage-floating-navbar="true"
    >
      <SiteNavbar linkTabIndex={isVisible ? undefined : -1} />
    </div>
  );
}
