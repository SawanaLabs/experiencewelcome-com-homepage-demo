---
title: How I Build This
description: Stable framing for the product-independent build-process article and route.
updateAt: 2026-07-05
---

# How I Build This

## Scope

- Covers the planned product-independent `How I Build This` article route.
- Covers article framing, writing voice, reference inspirations, and the durable macro concepts behind the feature.
- Covers how the article should explain this repository as evidence for a transferable Figma-to-web delivery method.
- Covers the source-content workflow for the future Markdown article.
- Excludes the final article copy and route implementation details until the writing and UI pass begins.

## Domain Language

- **How I Build This route**: A product-independent route that hosts the author's build-process article for human readers, AI agents, developer peers, and future collaborators.
- **Build-process article**: An article that explains how a landing page work was built and what the author thought through while building it.
- **Developer narrative essay**: The preferred writing style: a developer's experience, process, judgment, and analysis told through the build story, with structure used only where it improves comprehension.
- **Figma visual reference material**: A Figma input used primarily as a visual target for front-end delivery; it may be designer-authored, community-sourced, website-captured, or AI-generated, and should not be assumed to contain complete design-system semantics, responsive rules, interaction behavior, product decisions, or production-ready code structure.
- **Figma-to-web delivery**: The end-to-end process of turning Figma visual reference material for a responsive landing page into a maintainable front-end web project.
- **Project engineering practices**: The repository's delivery-facing hard content and local best practices: directory structure, code organization, components, styling, content, i18n, assets, docs, tests, quality gates, and verification habits.
- **Harness engineering system**: The coding-agent behavior system that lets an AI agent open a fresh session, understand a requested landing page or section change, discover local tools and best practices, implement end-to-end, verify the result, and deliver work results to humans.
- **Harness formula**: `Model + repository context + skills + tools = Harness`.
- **Engineering-practices-Harness split**: Project engineering practices describe the repository materials and local best practices humans and agents work from; Harness describes how an agent works inside it.
- **Agent-ready frontend delivery system**: A front-end project and Harness system designed so human developers and coding agents can understand the product surface, extend landing page work, follow local conventions, run checks, and hand off verified changes with increasing team throughput.
- **Article source Markdown**: The `src/content/how-i-build-this-zh.md` Chinese source draft for focused article writing before the route renders it as a webpage and before an English version is produced.
- **AI Native Product Engineer**: The future-facing product engineer role the article should describe in chapter 0: someone who uses an agent-ready delivery system to ship modules or pages while continuously improving the system's context, docs, best practices, verification paths, and Harness.

## Current Subdomain Docs

- The current Chinese article title is `How I Build This：从一个 Figma 任务开始`.
- The Chinese source draft starts with chapter 0, which first describes the future-facing agent-ready engineering state, then introduces the `AI Native Product Engineer` role as both a user and continuous improver of that state.
- The article starts from a concrete Figma task: a visual reference material for a landing page needed to become a real webpage.
- The article should use that concrete task to introduce the larger question: how Figma visual reference material can become an agent-ready frontend delivery system for landing page work.
- Treat Figma as a broad input category for this system. The source may be a designer-authored file, a community/template file, a website capture or conversion, an AI-generated mockup, or a prototype-like material.
- The article should not overclaim that the input was a complete designer handoff. Many Figma materials are still primarily static visual references for front-end work, even though the Figma platform now includes prototypes, Figma Make, Figma Sites, AI generation, and code layers.
- This wider Figma-input boundary belongs in docs now; final article wording should be decided during paragraph drafting.
- The core framing is an evidence-backed transferable method. This repository is the proof surface; the method should remain useful beyond this single ExperienceWelcome homepage.
- The article uses a dual-track build narrative:
  - Visible track: how this project was actually built from Figma to Web.
  - Underlying track: how project engineering practices and Harness thinking formed through the work, including the author's prior engineering experience.
- The writing should be a human-agent readable article. Narrative flow comes first, while commands, paths, decisions, tools, and verification evidence appear where they naturally support the story.
- Do not pre-lock the full article outline or evidence categories before drafting. Items such as readable context, executable workflow, composable architecture, Figma-to-code method, and verification habits are useful candidate material, not the article's fixed structure.
- Failures, detours, and reflections should come from the author's actual build process during drafting. Do not invent failure points just to make the article feel credible.
- "One day" can appear as result context, but the article's center of gravity is the method and foundation, not speed as a standalone claim.
- The article should avoid sounding like a framework manual. It should expose technical choices through concrete moments of judgment.
- Store the article's editable Chinese Markdown source at `src/content/how-i-build-this-zh.md`; produce the English version after the Chinese draft is stable.
- Use the Markdown file as the focused content workspace. During writing, update it directly through normal additions, removals, and rewrites; do not add a separate writing-state system.
- Start the Markdown file with a table of contents that reflects the current outline. Chapter titles should read like an essay, not a project log. Chapter 0 frames the future role, chapter 1 starts from the Figma assignment, chapter 2 opens the project-building process with second-level subsections, and chapter 3 closes on what the project became.
- Decide evidence, images, paths, commands, and other Markdown inserts while discussing concrete paragraphs. Do not predefine a rigid evidence insertion rule before drafting.

## Reference Inputs

- Figma input-shape references:
  - [`Turn webpages into editable design layers`](https://help.figma.com/hc/en-us/articles/40826832449303-Turn-webpages-into-editable-design-layers) shows the official Figma Chrome extension flow for capturing webpages into editable Figma layers, with limitations around design-system mapping, complex scroll effects, canvas-rendered sites, and heavy JavaScript pages.
  - [`Use AI tools in Figma Design`](https://help.figma.com/hc/en-us/articles/23870272542231-Use-AI-tools-in-Figma-Design) frames Figma AI as useful for starting faster while still requiring judgment because AI output may be misleading or wrong.
  - [`Free AI Website Generator`](https://www.figma.com/solutions/ai-website-generator/) shows Figma Make generating responsive, interactive sites from natural-language prompts.
  - [`html.to.design`](https://html.to.design/home/) is the third-party reference for converting websites into editable Figma designs.
- Clerk is the functional reference for developer-facing article mechanics:
  - [`Clerk Init: The fastest way to start a new project`](https://clerk.com/blog/clerk-init) shows a blog article with jump links, "Explore with AI", terminal commands, agent pairing, and a start-from-zero product setup story.
  - [`Add Google as a social connection`](https://clerk.com/docs/guides/configure/auth-strategies/social-connections/google) shows functional documentation with prerequisites, development and production paths, warnings, testing instructions, and security notes.
- Vercel and Claude/Anthropic are the agent-engineering references:
  - [`The no-nonsense approach to AI agent development`](https://vercel.com/blog/the-no-nonsense-approach-to-ai-agent-development) supports the idea that effective agents are narrow, domain-specific, built from manual task simulation, ordinary software structure, tools, loops, and reliability work.
  - [`Building effective agents`](https://www.anthropic.com/engineering/building-effective-agents) supports the preference for simple, composable patterns and a clear distinction between workflows and more autonomous agents.
  - [`Introducing: React Best Practices`](https://vercel.com/blog/introducing-react-best-practices) is a reference for packaging engineering practices so coding agents and humans can apply the same decisions across a codebase.
- Tessl's Ryan Lopopolo/OpenAI podcast page is the Harness Engineering goal-state reference:
  - [`OpenAI's Framework for Shipping Code at 70 PRs/Week`](https://tessl.io/podcast/109/) frames Harness Engineering as context plus tools around coding agents, describes new hires making a team faster within two weeks, and gives concrete loops such as anti-slopification CI, reviewer agents, and spec distillation.
- Raft is the narrative and concept-introduction reference:
  - [`Is Having Agents in the Room Meant to Be Chaotic?`](https://raft.build/resources/blog/is-having-agents-in-the-room-meant-to-be-chaotic/) uses a concrete collaboration scene to reveal a deeper agent-experience problem, then names the concept and explains it through practical design moves.

## Writing Direction

- Start from a concrete scene rather than an abstract framework definition.
- Use chapter 0 to describe the engineering state and goal state before the concrete Figma assignment: the article is also about how an AI Native Product Engineer uses and improves that state.
- Let the Figma task expose the deeper problem: a good result needs a project that a human or agent can continue from.
- Use third-person retrospective framing when describing the author, while keeping the tone close to a developer explaining their own choices and trade-offs.
- Prefer conversational chapter titles such as "Starting from a Figma assignment" and "Starting to build the project" over titles that sound like logs, records, or internal engineering documentation.
- Define `Harness` through the work rather than as a detached theory chapter.
- Use `Project Engineering Practices` and `Harness` as two recurring lenses:
  - Project engineering practices explain the repository's maintainable front-end delivery materials and local best practices.
  - Harness explains the agent behavior design that makes end-to-end work possible in fresh sessions.
- Treat Clerk, Vercel/Claude, and Raft as reference lenses, not as templates to copy.

## Update Triggers

- Update this file when the `How I Build This` route, article title, writing voice, macro structure, or reference set changes.
- Update this file when drafting reveals stable article principles that should guide future implementation or writing passes.
- Update this file when the feature moves from concept into route/component implementation.
- Update this file if the article source path moves away from `src/content/how-i-build-this-zh.md`.
