import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { LanguageSwitcher } from "./language-switcher";

describe("LanguageSwitcher", () => {
  it("uses a pointer cursor for the icon trigger", () => {
    const html = renderToStaticMarkup(<LanguageSwitcher currentLocale="zh" />);

    expect(html).toContain('aria-label="Change language"');
    expect(html).toContain("cursor-pointer");
  });
});
