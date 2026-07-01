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

  it("keeps the floating navbar in a centered three-column layout", () => {
    const html = renderToStaticMarkup(<SiteNavbar variant="floating" />);

    expect(html).toContain("lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]");
    expect(html).toContain("justify-self-center");
    expect(html).toContain("justify-self-end");
  });

  it("keeps the mobile header navbar compact", () => {
    const html = renderToStaticMarkup(<SiteNavbar variant="mobileHeader" />);

    expect(html).toContain("welcome");
    expect(html).toContain("Demo");
    expect(html).not.toContain("Features");
  });
});
