import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SiteNavbar } from "./navbar";

describe("SiteNavbar", () => {
  it("renders the shared desktop navigation labels", () => {
    const html = renderToStaticMarkup(<SiteNavbar variant="floating" />);

    for (const label of [
      "Features",
      "Pricing",
      "Events",
      "About",
      "Blog",
      "Support",
      "Login",
      "Demo",
    ]) {
      expect(html).toContain(label);
    }
  });

  it("renders a language switcher before the demo action", () => {
    const html = renderToStaticMarkup(<SiteNavbar variant="floating" />);

    expect(html).toContain('aria-label="Change language"');
    expect(html.indexOf('aria-label="Change language"')).toBeLessThan(
      html.indexOf(">Demo<")
    );
  });

  it("uses an icon-only language switcher trigger", () => {
    const html = renderToStaticMarkup(
      <SiteNavbar currentLocale="zh" variant="floating" />
    );

    expect(html).toContain('aria-label="Change language"');
    expect(html).not.toContain(">ZH<");
  });

  it("renders localized navigation copy passed by the route", () => {
    const html = renderToStaticMarkup(
      <SiteNavbar
        copy={{
          accountNavigation: [
            { href: "#support", label: "支持" },
            { href: "#login", label: "登录" },
          ],
          brandAriaLabel: "Welcome 首页",
          demoLabel: "预约演示",
          languageLabel: "切换语言",
          primaryNavigation: [
            { href: "#features", label: "功能" },
            { href: "#pricing", label: "价格" },
            { href: "#events", label: "活动" },
            { href: "#about", label: "关于" },
            { href: "#blog", label: "博客" },
          ],
        }}
        currentLocale="zh"
        variant="floating"
      />
    );

    for (const label of ["功能", "价格", "支持", "登录", "预约演示"]) {
      expect(html).toContain(label);
    }
    expect(html).toContain('aria-label="切换语言"');
  });

  it("keeps the floating navbar in a centered three-column layout", () => {
    const html = renderToStaticMarkup(<SiteNavbar variant="floating" />);

    expect(html).toContain("lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]");
    expect(html).toContain("justify-self-center");
    expect(html).toContain("justify-self-end");
  });

  it("keeps the hero primary navigation centered for longer localized labels", () => {
    const html = renderToStaticMarkup(
      <SiteNavbar
        copy={{
          accountNavigation: [
            { href: "#support", label: "Assistance" },
            { href: "#login", label: "Connexion" },
          ],
          brandAriaLabel: "Accueil Welcome",
          demoLabel: "Démo",
          languageLabel: "Changer de langue",
          primaryNavigation: [
            { href: "#features", label: "Fonctionnalités" },
            { href: "#pricing", label: "Tarifs" },
            { href: "#events", label: "Événements" },
            { href: "#about", label: "À propos" },
            { href: "#blog", label: "Blog" },
          ],
        }}
        currentLocale="fr"
        variant="hero"
      />
    );

    expect(html).toContain("grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]");
    expect(html).toContain("justify-self-center");
    expect(html).toContain("justify-self-end");
    expect(html).toContain("relative z-50 grid");
    expect(html).toContain("gap-5 whitespace-nowrap xl:gap-7");
    expect(html).toContain("whitespace-nowrap");
    expect(html).not.toContain("absolute top-0 left-0");
  });

  it("can switch between hero and mobile header layouts by breakpoint", () => {
    const html = renderToStaticMarkup(
      <SiteNavbar autoBreakpoint="md" variant="auto" />
    );

    expect(html).toContain("hidden md:grid");
    expect(html).toContain("md:hidden");
    expect(html).toContain("Primary navigation");
    expect(html).toContain("Change language");
  });

  it("keeps the mobile header navbar compact", () => {
    const html = renderToStaticMarkup(<SiteNavbar variant="mobileHeader" />);

    expect(html).toContain("welcome");
    expect(html).toContain("Demo");
    expect(html).not.toContain("Features");
  });
});
