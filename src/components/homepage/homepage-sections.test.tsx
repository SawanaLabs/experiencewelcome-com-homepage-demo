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
});
