import type { ReactNode } from "react";
import type { MarkdownBlock } from "@/lib/content/how-i-build-this";
import { cn } from "@/lib/utils";

const inlineTokenPattern = /(`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
const inlineLinkPattern = /^\[([^\]]+)\]\(([^)]+)\)$/;
const absoluteUrlPattern = /^https?:\/\//i;

function renderInline(text: string) {
  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(inlineTokenPattern)) {
    const token = match[0];
    const index = match.index ?? 0;

    if (index > cursor) {
      nodes.push(text.slice(cursor, index));
    }

    if (token.startsWith("`")) {
      nodes.push(
        <code
          className="rounded bg-[#10211a]/8 px-1.5 py-0.5 font-mono text-[#10211a] text-[0.88em]"
          key={`${index}-code`}
        >
          {token.slice(1, -1)}
        </code>
      );
    } else {
      const linkMatch = inlineLinkPattern.exec(token);

      if (!linkMatch) {
        throw new Error(`Invalid markdown inline link: ${token}`);
      }

      const href = linkMatch[2];
      const isExternal = absoluteUrlPattern.test(href);

      nodes.push(
        <a
          className="font-medium text-[#0b5f75] underline decoration-2 decoration-[#73d2de] underline-offset-4 transition-colors hover:text-[#073f4d]"
          href={href}
          key={`${index}-link`}
          rel={isExternal ? "noreferrer" : undefined}
          target={isExternal ? "_blank" : undefined}
        >
          {linkMatch[1]}
        </a>
      );
    }

    cursor = index + token.length;
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return nodes;
}

function getHeadingClassName(level: 1 | 2 | 3) {
  if (level === 1) {
    return "scroll-mt-24 text-balance pt-2 font-semibold text-[clamp(2.55rem,5vw,5.4rem)] leading-[0.95] tracking-normal text-[#101312]";
  }

  if (level === 2) {
    return "scroll-mt-24 pt-14 font-semibold text-3xl leading-tight tracking-normal text-[#101312] md:text-5xl";
  }

  return "scroll-mt-24 pt-8 font-semibold text-2xl leading-tight tracking-normal text-[#101312] md:text-3xl";
}

interface MarkdownRendererProps {
  blocks: MarkdownBlock[];
  renderAfterFirstList?: ReactNode;
}

export function MarkdownRenderer({
  blocks,
  renderAfterFirstList,
}: MarkdownRendererProps) {
  let hasRenderedAfterFirstList = false;

  return (
    <div className="space-y-7">
      {blocks.map((block) => {
        if (block.type === "heading") {
          const HeadingTag = `h${block.level}` as "h1" | "h2" | "h3";

          return (
            <HeadingTag
              className={getHeadingClassName(block.level)}
              id={block.id}
              key={block.key}
            >
              {renderInline(block.text)}
            </HeadingTag>
          );
        }

        if (block.type === "list") {
          const shouldRenderAfterList =
            renderAfterFirstList && !hasRenderedAfterFirstList;

          hasRenderedAfterFirstList = true;

          return (
            <div className="space-y-4" key={block.key}>
              <ul className="space-y-2 border-[#c8d8d3] border-l pl-5 text-[#2f3a35] text-[15px] leading-7 md:text-base">
                {block.items.map((item) => (
                  <li
                    className={cn(
                      "relative before:absolute before:top-[0.8em] before:-left-5 before:size-1.5 before:rounded-full before:bg-[#1d7f70]",
                      item.depth > 0 && "text-[#52615b]"
                    )}
                    key={item.key}
                    style={{
                      marginLeft: item.depth
                        ? `${item.depth * 1.25}rem`
                        : undefined,
                    }}
                  >
                    {renderInline(item.text)}
                  </li>
                ))}
              </ul>
              {shouldRenderAfterList ? renderAfterFirstList : null}
            </div>
          );
        }

        return (
          <p
            className="max-w-[75ch] text-[#28312d] text-[17px] leading-8 md:text-[18px] md:leading-9"
            key={block.key}
          >
            {renderInline(block.text)}
          </p>
        );
      })}
    </div>
  );
}
