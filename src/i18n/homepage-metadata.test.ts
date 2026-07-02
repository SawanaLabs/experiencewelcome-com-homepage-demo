import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("createHomepageMetadata", () => {
  it("builds localized homepage metadata with canonical and social fields", async () => {
    vi.stubEnv(
      "NEXT_PUBLIC_SITE_URL",
      "https://experiencewelcome-com-homepage-demo.vercel.app"
    );
    vi.resetModules();

    const { createHomepageMetadata } = await import("./homepage-metadata");

    expect(
      createHomepageMetadata("zh", {
        description:
          "专为营销团队打造的线上研讨会平台，帮助你举办令人惊艳并推动收入增长的活动。",
        imageAlt: "ExperienceWelcome 首页预览",
        title: "吸引并转化",
      })
    ).toMatchObject({
      alternates: {
        canonical: "https://experiencewelcome-com-homepage-demo.vercel.app/zh",
        languages: {
          en: "https://experiencewelcome-com-homepage-demo.vercel.app/",
          zh: "https://experiencewelcome-com-homepage-demo.vercel.app/zh",
          "x-default":
            "https://experiencewelcome-com-homepage-demo.vercel.app/",
        },
      },
      description:
        "专为营销团队打造的线上研讨会平台，帮助你举办令人惊艳并推动收入增长的活动。",
      openGraph: {
        description:
          "专为营销团队打造的线上研讨会平台，帮助你举办令人惊艳并推动收入增长的活动。",
        locale: "zh",
        title: "吸引并转化 | ExperienceWelcome",
        type: "website",
        url: "https://experiencewelcome-com-homepage-demo.vercel.app/zh",
      },
      title: "吸引并转化",
      twitter: {
        card: "summary_large_image",
        description:
          "专为营销团队打造的线上研讨会平台，帮助你举办令人惊艳并推动收入增长的活动。",
        title: "吸引并转化 | ExperienceWelcome",
      },
    });
  });
});
