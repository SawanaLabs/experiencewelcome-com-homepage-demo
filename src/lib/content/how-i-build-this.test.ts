import { describe, expect, it } from "vitest";
import { locales } from "@/i18n/routing";
import {
  getHowIBuildThisArticle,
  parseHowIBuildThisMarkdown,
  parseMarkdownBlocks,
} from "./how-i-build-this";

describe("How I Build This content", () => {
  it("loads a locale-specific source article for every localized route", async () => {
    const articles = await Promise.all(
      locales.map((locale) => getHowIBuildThisArticle(locale))
    );

    expect(
      articles.map((article) => ({
        contentLocale: article.contentLocale,
        locale: article.locale,
        title: article.title,
      }))
    ).toEqual([
      {
        contentLocale: "en",
        locale: "en",
        title: "How I Build This: Starting from a Figma Assignment",
      },
      {
        contentLocale: "zh",
        locale: "zh",
        title: "How I Build This：从一个 Figma 任务开始",
      },
      {
        contentLocale: "ja",
        locale: "ja",
        title: "How I Build This: Figma の課題から始める",
      },
      {
        contentLocale: "fr",
        locale: "fr",
        title: "How I Build This : partir d'une mission Figma",
      },
      {
        contentLocale: "es",
        locale: "es",
        title: "How I Build This: desde una tarea de Figma",
      },
      {
        contentLocale: "hi",
        locale: "hi",
        title: "How I Build This: एक Figma assignment से शुरुआत",
      },
    ]);
    expect(
      articles.every(
        (article) =>
          article.description.length > 0 &&
          article.blocks.length > 0 &&
          article.headings.length > 0
      )
    ).toBe(true);
  });

  it("parses the supported markdown block shapes", () => {
    const parsed = parseHowIBuildThisMarkdown(`---
title: "Example"
description: "Demo"
---
# Heading

- [Item](#item)
  - Nested

Paragraph with \`code\`.
`);

    expect(parsed).toEqual({
      body: "# Heading\n\n- [Item](#item)\n  - Nested\n\nParagraph with `code`.\n",
      description: "Demo",
      title: "Example",
    });
    expect(parseMarkdownBlocks(parsed.body)).toMatchObject([
      {
        id: "heading",
        level: 1,
        text: "Heading",
        type: "heading",
      },
      {
        items: [
          { depth: 0, text: "[Item](#item)" },
          { depth: 1, text: "Nested" },
        ],
        type: "list",
      },
      {
        text: "Paragraph with `code`.",
        type: "paragraph",
      },
    ]);
  });
});
