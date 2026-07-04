import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Locale } from "@/i18n/routing";

export type HowIBuildThisContentLocale = Locale;

export interface HowIBuildThisArticle {
  blocks: MarkdownBlock[];
  contentLocale: HowIBuildThisContentLocale;
  description: string;
  headings: MarkdownHeading[];
  locale: Locale;
  title: string;
}

export type MarkdownBlock = MarkdownHeading | MarkdownList | MarkdownParagraph;

export interface MarkdownHeading {
  id: string;
  key: string;
  level: 1 | 2 | 3;
  text: string;
  type: "heading";
}

export interface MarkdownList {
  items: MarkdownListItem[];
  key: string;
  type: "list";
}

export interface MarkdownListItem {
  depth: number;
  key: string;
  text: string;
}

export interface MarkdownParagraph {
  key: string;
  text: string;
  type: "paragraph";
}

interface ParsedFrontmatter {
  body: string;
  description: string;
  title: string;
}

const frontmatterPattern = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
const frontmatterFieldPattern = /^([A-Za-z][\w-]*):\s*(.+)$/;
const lineBreakPattern = /\r?\n/;
const headingPattern = /^(#{1,3})\s+(.+)$/;
const listItemPattern = /^(\s*)-\s+(.+)$/;
const headingColonPattern = /[：:]/g;
const headingUnsafeCharacterPattern = /[^\p{Letter}\p{Number}\s-]/gu;
const headingWhitespacePattern = /\s+/g;
const tabPattern = /\t/g;

const sourceFileByLocale = {
  en: "how-i-build-this-en.md",
  es: "how-i-build-this-es.md",
  fr: "how-i-build-this-fr.md",
  hi: "how-i-build-this-hi.md",
  ja: "how-i-build-this-ja.md",
  zh: "how-i-build-this-zh.md",
} satisfies Record<HowIBuildThisContentLocale, string>;

function stripWrappingQuotes(value: string) {
  const trimmedValue = value.trim();

  if (
    (trimmedValue.startsWith('"') && trimmedValue.endsWith('"')) ||
    (trimmedValue.startsWith("'") && trimmedValue.endsWith("'"))
  ) {
    return trimmedValue.slice(1, -1);
  }

  return trimmedValue;
}

export function parseHowIBuildThisMarkdown(
  markdown: string
): ParsedFrontmatter {
  const frontmatterMatch = frontmatterPattern.exec(markdown);

  if (!frontmatterMatch?.[1]) {
    throw new Error("How I Build This markdown is missing frontmatter.");
  }

  const metadata = Object.fromEntries(
    frontmatterMatch[1].split(lineBreakPattern).map((line) => {
      const fieldMatch = frontmatterFieldPattern.exec(line);

      if (!fieldMatch) {
        throw new Error(`Invalid frontmatter line: ${line}`);
      }

      return [fieldMatch[1], stripWrappingQuotes(fieldMatch[2])];
    })
  );

  if (typeof metadata.title !== "string" || metadata.title.length === 0) {
    throw new Error("How I Build This markdown frontmatter is missing title.");
  }

  if (
    typeof metadata.description !== "string" ||
    metadata.description.length === 0
  ) {
    throw new Error(
      "How I Build This markdown frontmatter is missing description."
    );
  }

  return {
    body: markdown.slice(frontmatterMatch[0].length),
    description: metadata.description,
    title: metadata.title,
  };
}

function createHeadingId(text: string, usedIds: Map<string, number>) {
  const baseId = text
    .toLowerCase()
    .replace(headingColonPattern, "")
    .replace(headingUnsafeCharacterPattern, "")
    .trim()
    .replace(headingWhitespacePattern, "-");
  const safeBaseId = baseId || "section";
  const currentCount = usedIds.get(safeBaseId) ?? 0;

  usedIds.set(safeBaseId, currentCount + 1);

  return currentCount === 0 ? safeBaseId : `${safeBaseId}-${currentCount}`;
}

export function parseMarkdownBlocks(markdownBody: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = [];
  const paragraphLines: string[] = [];
  let listItems: MarkdownListItem[] = [];
  let blockSequence = 0;
  let listItemSequence = 0;
  const usedHeadingIds = new Map<string, number>();

  const nextKey = (prefix: string) => {
    blockSequence += 1;
    return `${prefix}-${blockSequence}`;
  };

  const flushParagraph = () => {
    if (paragraphLines.length === 0) {
      return;
    }

    blocks.push({
      key: nextKey("paragraph"),
      text: paragraphLines.join(" "),
      type: "paragraph",
    });
    paragraphLines.length = 0;
  };

  const flushList = () => {
    if (listItems.length === 0) {
      return;
    }

    blocks.push({
      items: listItems,
      key: nextKey("list"),
      type: "list",
    });
    listItems = [];
  };

  for (const line of markdownBody.split(lineBreakPattern)) {
    const trimmedLine = line.trim();

    if (trimmedLine.length === 0) {
      flushParagraph();
      flushList();
      continue;
    }

    const headingMatch = headingPattern.exec(trimmedLine);

    if (headingMatch) {
      flushParagraph();
      flushList();

      const text = headingMatch[2].trim();

      blocks.push({
        id: createHeadingId(text, usedHeadingIds),
        key: nextKey("heading"),
        level: headingMatch[1].length as 1 | 2 | 3,
        text,
        type: "heading",
      });
      continue;
    }

    const listMatch = listItemPattern.exec(line);

    if (listMatch) {
      flushParagraph();
      listItemSequence += 1;
      listItems.push({
        depth: Math.floor(listMatch[1].replace(tabPattern, "  ").length / 2),
        key: `list-item-${listItemSequence}`,
        text: listMatch[2].trim(),
      });
      continue;
    }

    flushList();
    paragraphLines.push(trimmedLine);
  }

  flushParagraph();
  flushList();

  return blocks;
}

function getArticleFilePath(contentLocale: HowIBuildThisContentLocale) {
  return path.join(
    process.cwd(),
    "src",
    "content",
    sourceFileByLocale[contentLocale]
  );
}

export async function getHowIBuildThisArticle(
  locale: Locale
): Promise<HowIBuildThisArticle> {
  const contentLocale = locale;
  const markdown = await readFile(getArticleFilePath(contentLocale), "utf8");
  const parsed = parseHowIBuildThisMarkdown(markdown);
  const blocks = parseMarkdownBlocks(parsed.body);

  return {
    blocks,
    contentLocale,
    description: parsed.description,
    headings: blocks.filter(
      (block): block is MarkdownHeading => block.type === "heading"
    ),
    locale,
    title: parsed.title,
  };
}
