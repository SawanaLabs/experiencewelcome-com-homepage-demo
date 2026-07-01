import { describe, expect, it } from "vitest";
import { getLocaleOptions } from "./locale-options";

describe("getLocaleOptions", () => {
  it("exposes every supported homepage language in display order", () => {
    expect(getLocaleOptions()).toEqual([
      { label: "English", locale: "en", shortLabel: "EN" },
      { label: "中文", locale: "zh", shortLabel: "ZH" },
      { label: "日本語", locale: "ja", shortLabel: "JA" },
      { label: "Français", locale: "fr", shortLabel: "FR" },
      { label: "Español", locale: "es", shortLabel: "ES" },
      { label: "हिन्दी", locale: "hi", shortLabel: "HI" },
    ]);
  });
});
