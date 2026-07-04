# ExperienceWelcome Homepage Demo

This context defines the product and delivery language for the ExperienceWelcome homepage replication demo.

## Language

**Figma homepage source section**:
The complete `experiencewelcome.com` source section inside the `Top 16 Websites of 2024 Awwwards Community` Figma file. A Figma `node-id` is a navigation anchor into that file, not a limit on implementation scope.

**Public reference site**:
The live `experiencewelcome.com` website. It can support copy, module semantics, SEO wording, and missing-asset interpretation, but it is not the primary visual acceptance source.

**Figma visual reference material**:
A Figma input used primarily as a visual target for front-end delivery. It may be designer-authored, community-sourced, website-captured, or AI-generated, and it should not be assumed to contain complete design-system semantics, responsive rules, interaction behavior, product decisions, or production-ready code structure.

**Homepage replication**:
The localized single-page Next.js implementation of the Figma homepage source section. It excludes other websites, unrelated frames, and additional business pages outside the assigned homepage.

**Homepage section**:
A vertical content block in the ExperienceWelcome homepage source section, such as the hero, social proof, product overview, FAQ, CTA, or footer area. Sections are the primary planning unit for the replication work.

**Static replication phase**:
The first implementation phase that focuses on reproducing the Figma homepage source section as static HTML, Tailwind styling, localized text, and exported assets before adding motion, Lighthouse optimization, and final SEO polish.

**Content-resilient layout**:
A layout approach where meaningful content such as headings, body copy, navigation labels, CTAs, and testimonials can grow, wrap, and re-center across languages and viewport sizes while preserving the intended visual hierarchy.

**Motion enhancement phase**:
The follow-up implementation phase that adds restrained homepage animation and interaction after static replication is stable, without changing the Figma-derived section structure or static visual acceptance baseline.

**Viewport entry animation**:
A one-time reveal used when a homepage section or meaningful content group enters the viewport, usually expressed as subtle opacity and position changes.

**Micro-interaction**:
A small interaction response for homepage controls and visual objects, such as CTA hover, tap feedback, card hover depth, carousel control feedback, or navigation affordances.

**Reduced-motion contract**:
The accessibility rule that homepage motion must respect the visitor's reduced-motion preference by removing or simplifying large movement, parallax, autoplay, and continuous decorative motion.

**How I Build This route**:
A product-independent route that hosts the author's build-process article. It helps human readers, AI agents, developer peers, and future collaborators understand the author's process, tools, trade-offs, and reflections behind the landing page work.

**Build-process article**:
An article that explains how a landing page work was built and what the author thought through while building it. It can include tutorial-like steps and evidence, but its primary job is to expose judgment, process, trade-offs, and collaboration style.

**Third-person engineering retrospective**:
The writing voice for the build-process article. It explains the author's work from a third-person perspective and pairs narrative claims with concrete engineering evidence such as directory structure, docs, commands, code boundaries, test results, browser checks, and deployment milestones.

**Developer narrative essay**:
The preferred article style for How I Build This. It should read like a developer explaining experience, process, judgment, and analysis through the build story, with structure used only where it improves comprehension. Technical choices should naturally reveal the author's reasoning instead of turning the article into a rigid framework document.

**Figma-to-web delivery**:
The end-to-end process of turning Figma visual reference material for a responsive landing page into a maintainable front-end web project. It starts with source inspection and project initialization, then moves through project engineering practices, component boundaries, responsive layout, localization, asset handling, AI-agent collaboration, tests, quality gates, and browser verification.

**Harness engineering system**:
The coding-agent behavior system that lets an AI agent open a fresh session, understand a requested landing page or section change, discover the repository's tools and best practices, implement the change end-to-end, choose and run the right verification steps, and deliver work results to humans with minimal human steering.

**Harness formula**:
Model + repository context + skills + tools = Harness. The model supplies reasoning and generation; repository context supplies local truth; skills supply repeatable working methods; tools supply executable capabilities. A working Harness then runs an implementation and verification loop so an agent can implement, verify, and hand off work end-to-end.

**Project engineering practices**:
The repository's delivery-facing hard content and local best practices: directory structure, code organization, components, styling, content, i18n, assets, docs, tests, quality gates, and verification habits.

**Engineering-practices-Harness split**:
Project engineering practices describe the repository materials and local best practices humans and agents work from. Harness describes how an agent works inside the project and how its behavior is guided, verified, and handed off.

**Evidence-backed transferable method**:
The article's framing: use this repository as concrete evidence for a broader, reusable method of turning varied Figma visual reference materials into maintainable front-end web projects with agent-ready workflows.

**Human-agent readable article**:
A writing target where the same article is readable by humans and useful to AI agents. It should preserve narrative flow and reflection while exposing commands, paths, decisions, and verification evidence in forms that developers can also read comfortably.

**Dual-track build narrative**:
The build-process article uses a visible track and an underlying track. The visible track follows how this project was actually built from Figma to Web; the underlying track shows how project engineering practices and Harness thinking formed through that work, including relevant prior engineering experience.

**Figma-material-to-delivery-system arc**:
The article starts from a concrete task: a Figma visual reference material for a landing page needed to become a real webpage. The story then shows how that task became a complete, extensible, convention-rich front-end delivery system within one day.

**How I Build This title**:
How I Build This：从一个 Figma 任务开始.

**Agent-ready frontend delivery system**:
A front-end project and Harness system designed so human developers and coding agents can understand the product surface, extend landing page work, follow local conventions, run the right checks, and hand off verified changes with increasing team throughput.

**Agent-ready engineering state**:
A software engineering state where human developers and AI agents enter a project through shared readable context, understand product and engineering constraints, add judgment, reduce coordination friction, and continue delivery through executable verification loops.

**AI project context entrypoint**:
The role AI plays when a new human contributor asks it to explain implementation reasons, historical decisions, technical stack, module locations, and relevant docs so they can land in the project faster.

**Article source Markdown**:
The editable Chinese source draft for the How I Build This article at `src/content/how-i-build-this-zh.md`, before it is rendered as a webpage and before an English version is produced.

**AI Native Product Engineer**:
A future-facing product engineer role that uses an agent-ready delivery system to ship modules or pages while continuously improving that system's context, docs, best practices, verification paths, and Harness so the next landing becomes easier.

**Marketing web foundation**:
The reusable project foundation that lets future developers and AI agents extend a landing page work into a broader marketing and growth website without losing maintainability.

**Landing page work**:
The broader portfolio category for current and future pages in this repository. The ExperienceWelcome homepage is one landing page work; future pages may be separate landing page works that share the same process-story surface.
