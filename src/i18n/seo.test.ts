import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("i18n SEO URLs", () => {
  it("generates canonical hreflang URLs for every supported locale", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.com");
    vi.resetModules();

    const { getLanguageAlternates } = await import("./seo");

    expect(getLanguageAlternates()).toEqual({
      en: "https://example.com/",
      zh: "https://example.com/zh",
      ja: "https://example.com/ja",
      fr: "https://example.com/fr",
      es: "https://example.com/es",
      hi: "https://example.com/hi",
      "x-default": "https://example.com/",
    });
  });
});
