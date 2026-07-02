import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  MotionButtonLink,
  MotionRevealDiv,
} from "@/components/motion/motion-primitives";
import { HomepageMotionProvider } from "@/components/motion/motion-provider";

describe("homepage motion primitives", () => {
  it("preserves regular DOM props on reveal wrappers", () => {
    const html = renderToStaticMarkup(
      <MotionRevealDiv
        aria-label="Animated content"
        className="custom-class"
        data-example="kept"
        id="motion-target"
      >
        Animated copy
      </MotionRevealDiv>
    );

    expect(html).toContain('id="motion-target"');
    expect(html).toContain('aria-label="Animated content"');
    expect(html).toContain('data-example="kept"');
    expect(html).toContain('data-motion="viewport-reveal"');
    expect(html).toContain("custom-class");
    expect(html).toContain("Animated copy");
  });

  it("starts reveal content from the entrance state", () => {
    const html = renderToStaticMarkup(
      <MotionRevealDiv>Visible without JavaScript</MotionRevealDiv>
    );

    expect(html).toContain("Visible without JavaScript");
    expect(html).toContain("opacity:0");
    expect(html).toContain("translateY(18px)");
  });

  it("preserves link props on button-like link wrappers", () => {
    const html = renderToStaticMarkup(
      <MotionButtonLink
        aria-label="Request a demo"
        className="cta-link"
        href="#demo"
      >
        Demo
      </MotionButtonLink>
    );

    expect(html).toContain('href="#demo"');
    expect(html).toContain('aria-label="Request a demo"');
    expect(html).toContain('data-motion="micro-interaction"');
    expect(html).toContain("cta-link");
    expect(html).toContain("Demo");
  });

  it("renders provider children without adding page chrome", () => {
    const html = renderToStaticMarkup(
      <HomepageMotionProvider>
        <span>Inside provider</span>
      </HomepageMotionProvider>
    );

    expect(html).toContain("Inside provider");
    expect(html).toContain("<noscript>");
    expect(html).toContain(
      '[data-motion="viewport-reveal"]{opacity:1!important;transform:none!important;}'
    );
  });
});
