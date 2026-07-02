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
});
