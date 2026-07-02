import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("i18n SEO URLs", () => {
  it("uses explicit site URL configuration first", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.com");
    vi.resetModules();

    const { getSiteUrl } = await import("./seo");

    expect(getSiteUrl().toString()).toBe("https://example.com/");
  });

  it("uses the current Vercel deployment URL outside production", async () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    vi.stubEnv("VERCEL_URL", "preview-deployment.vercel.app");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "production-domain.com");
    vi.resetModules();

    const { getSiteUrl } = await import("./seo");

    expect(getSiteUrl().toString()).toBe(
      "https://preview-deployment.vercel.app/"
    );
  });

  it("uses the Vercel production project URL in production", async () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("VERCEL_URL", "generated-deployment.vercel.app");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "production-domain.com");
    vi.resetModules();

    const { getSiteUrl } = await import("./seo");

    expect(getSiteUrl().toString()).toBe("https://production-domain.com/");
  });

  it("uses localhost with the current port outside Vercel", async () => {
    vi.stubEnv("PORT", "4010");
    vi.resetModules();

    const { getSiteUrl } = await import("./seo");

    expect(getSiteUrl().toString()).toBe("http://localhost:4010/");
  });

  it("fails fast on Vercel when no site URL is available", async () => {
    vi.stubEnv("VERCEL", "1");
    vi.resetModules();

    const { getSiteUrl } = await import("./seo");

    expect(() => getSiteUrl()).toThrow("Missing site URL");
  });

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
