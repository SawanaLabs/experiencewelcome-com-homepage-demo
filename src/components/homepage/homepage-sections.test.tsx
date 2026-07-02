import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { createHomepageCopy } from "@/i18n/homepage-copy";
import zhMessages from "@/i18n/messages/zh.json";
import { HomepageCustomerStories } from "./customer-stories";
import { HomepageFooter } from "./footer";
import { HomepageHeader } from "./header";

function createNamespaceTranslator(namespace: keyof typeof zhMessages) {
  const messages = zhMessages[namespace];

  return (key: string) =>
    key.split(".").reduce<unknown>((value, segment) => {
      if (typeof value !== "object" || value === null) {
        throw new Error(`Missing message: ${namespace}.${key}`);
      }

      return (value as Record<string, unknown>)[segment];
    }, messages) as string;
}

function createZhHomepageCopy() {
  return createHomepageCopy({
    customerStories: createNamespaceTranslator("CustomerStories"),
    footer: createNamespaceTranslator("Footer"),
    header: createNamespaceTranslator("Header"),
    navbar: createNamespaceTranslator("Navbar"),
  });
}

describe("localized homepage sections", () => {
  it("renders localized copy in header, customer stories, and footer", () => {
    const copy = createZhHomepageCopy();
    const html = renderToStaticMarkup(
      <>
        <HomepageHeader
          copy={copy.header}
          currentLocale="zh"
          navbarCopy={copy.navbar}
        />
        <HomepageCustomerStories copy={copy.customerStories} />
        <HomepageFooter copy={copy.footer} />
      </>
    );

    expect(html).toContain("吸引并转化");
    expect(html).toContain("工作原理");
    expect(html).toContain("深受喜爱与信任");
    expect(html).toContain("行业活动营销总监");
    expect(html).toContain("隐私政策");
    expect(html).toContain("服务条款");
  });

  it("keeps the header content in resilient flow layout", () => {
    const copy = createZhHomepageCopy();
    const html = renderToStaticMarkup(
      <HomepageHeader
        copy={copy.header}
        currentLocale="zh"
        navbarCopy={copy.navbar}
      />
    );

    expect(html).toContain("flex-col items-center text-center");
    expect(html).toContain("max-w-[1280px]");
    expect(html).toContain("max-w-[1180px]");
    expect(html).toContain("text-wrap");
    expect(html).toContain("relative z-20 mt-8");
    expect(html).toContain("grid-cols-1 grid-rows-1 place-items-center");
    expect(html).toContain("relative z-10 mt-4 grid");
    expect(html).toContain("pointer-events-none z-0");
    expect(html).toContain("pointer-events-none z-10");
    expect(html).toContain("lg:aspect-[1280/654]");
    expect(html).toContain("lg:translate-y-[21px]");
    expect(html).toContain("aspect-[1088/607]");
    expect(html).toContain("relative z-20");
    expect(html).toContain(
      "top-[-6.76%] left-[-10.29%] h-[126.03%] w-[114.52%]"
    );
    expect(html).toContain('data-nimg="fill"');
    expect(html).toContain('src="/homepage/header/home-hero-card.png"');
    expect(html).toContain("object-fill");
    expect(html).not.toContain("mt-12");
    expect(html).not.toContain("top-[min(");
    expect(html).not.toContain("left-[min(");
  });

  it("keeps the customer stories section in resilient flow layout", () => {
    const copy = createZhHomepageCopy();
    const html = renderToStaticMarkup(
      <HomepageCustomerStories copy={copy.customerStories} />
    );

    expect(html).toContain("relative z-10 mx-auto max-w-[1280px]");
    expect(html).toContain("flex flex-col items-start justify-between");
    expect(html).toContain("lg:min-h-[230px]");
    expect(html).toContain("sm:self-end");
    expect(html).toContain("text-balance");
    expect(html).toContain("lg:max-w-[760px]");
    expect(html).toContain("data-customer-stories-previous");
    expect(html).toContain("data-customer-stories-next");
    expect(html).toContain("aria-controls");
    expect(html).toContain("transition-opacity hover:opacity-70");
    expect(html).toContain("h-full w-full object-contain");
    expect(html).toContain("snap-x snap-mandatory");
    expect(html).toContain("overflow-x-auto");
    expect(html).toContain("scroll-smooth");
    expect(html).toContain("data-customer-story-card");
    expect(html).toContain("shrink-0 snap-start");
    expect(html).toContain("w-full");
    expect(html).toContain("lg:min-h-[416px]");
    expect(html).toContain("lg:w-[clamp(480px,42.708vw,615px)]");
    expect(html).toContain("lg:text-[23px] lg:leading-[31px]");
    expect(html).toContain("salesforce-logo.png");
    expect(html).not.toContain("lg:hidden");
    expect(html).not.toContain("hidden h-[min(");
    expect(html).not.toContain("flex-col gap-10");
    expect(html).not.toContain("bg-[rgba(255,255,255,0.24)]");
    expect(html).not.toContain("shadow-[0_6px_24px_rgba(0,0,0,0.12)]");
    expect(html).not.toContain("absolute top-[min(");
    expect(html).not.toContain("left-[min(");
    expect(html).not.toContain("tracking-[-");
  });

  it("keeps the footer navigation in resilient flow layout", () => {
    const copy = createZhHomepageCopy();
    const html = renderToStaticMarkup(<HomepageFooter copy={copy.footer} />);

    expect(html).toContain("xl:gap-x-[clamp(96px,16.875vw,243px)]");
    expect(html).toContain("xl:pb-[197px]");
    expect(html).toContain("xl:flex-1");
    expect(html).toContain("xl:grid-cols-[repeat(3,minmax(0,1fr))]");
    expect(html).toContain("md:justify-between");
    expect(html).not.toContain("min-h-[457px]");
    expect(html).not.toContain("lg:h-[457px]");
    expect(html).not.toContain("lg:h-[78px]");
    expect(html).not.toContain("lg:flex-row");
    expect(html).not.toContain("lg:ml-auto");
    expect(html).not.toContain("xl:ml-auto");
    expect(html).not.toContain("xl:max-w-[932px]");
    expect(html).not.toContain("lg:ml-[243px]");
    expect(html).not.toContain("lg:grid-cols-[120px_120px_140px]");
    expect(html).not.toContain("lg:gap-[202px]");
  });
});
