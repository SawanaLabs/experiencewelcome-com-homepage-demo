import { describe, expect, it } from "vitest";
import { createHomepageCopy } from "./homepage-copy";
import zhMessages from "./messages/zh.json";

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

describe("createHomepageCopy", () => {
  it("builds localized copy for the homepage sections", () => {
    const copy = createHomepageCopy({
      customerStories: createNamespaceTranslator("CustomerStories"),
      footer: createNamespaceTranslator("Footer"),
      header: createNamespaceTranslator("Header"),
      navbar: createNamespaceTranslator("Navbar"),
    });

    expect(copy.header.title).toBe("吸引并转化");
    expect(copy.header.primaryCtaLabel).toBe("预约演示");
    expect(copy.customerStories.title).toBe("深受喜爱与信任");
    expect(copy.customerStories.previousStoryLabel).toBe("上一条客户故事");
    expect(copy.customerStories.testimonials[0]?.author).toBe("Ally Masi");
    expect(copy.customerStories.testimonials[0]?.role).toBe("行业活动营销总监");
    expect(copy.footer.navigation[0]?.title).toBe("产品");
    expect(copy.footer.navigation[0]?.links[2]?.label).toBe("预约演示");
    expect(copy.footer.legalLinks[1]?.label).toBe("服务条款");
  });
});
