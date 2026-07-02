---
title: Homepage Replication
description: Stable constraints for the ExperienceWelcome Figma homepage replication.
updateAt: 2026-07-01
---

# Homepage Replication

## Scope

- Covers the implementation of the ExperienceWelcome Figma homepage source section.
- Covers `src/app/[locale]/(home)/page.tsx`, `src/components/homepage/`, Figma-exported image assets, localized homepage messages, and homepage-specific interaction behavior.
- Excludes other websites in the Figma community file, other ExperienceWelcome business pages, and extra landing-page sections not present in the assigned homepage source section.

## Domain Language

- **Figma homepage source section**: The complete `experiencewelcome.com` source section inside the `Top 16 Websites of 2024 Awwwards Community` Figma file.
- **Homepage section**: A vertical content block from that source section, used as the main component boundary for implementation.
- **Public reference site**: The live `experiencewelcome.com` site, used only for supporting copy, module semantics, SEO wording, and missing-asset interpretation.
- **Content-resilient layout**: A layout approach where meaningful content can grow, wrap, and re-center across languages and viewport sizes while preserving the intended visual hierarchy.

## Current Subdomain Docs

- Use the complete `experiencewelcome.com` source section in the Figma file as the primary visual acceptance source. Treat the `node-id` URL as a navigation anchor into the file.
- Use the public reference site only as auxiliary evidence when Figma does not expose enough copy, asset, or semantic context.
- Implement the homepage as code-first high-fidelity React and Tailwind, with real image assets exported from Figma.
- Export image assets for logos, avatars, product screenshots, complex illustrations, textures, and other non-textual visuals. Keep Figma-exported assets as-is by default, without manual retouching, recomposition, or design-side post-processing.
- Allow animated assets such as GIFs or other Figma-exported motion media in the static replication phase when they are part of the source visual. Defer format optimization until the later performance phase unless the asset cannot render correctly in the app.
- Keep headings, paragraphs, navigation labels, CTA labels, FAQ copy, and other meaningful content as real HTML text so i18n, SEO, accessibility, selection, and responsive layout remain controllable.
- Put homepage section components under `src/components/homepage/`. Keep `src/app/[locale]/(home)/page.tsx` as the localized route entrypoint and composition surface.
- Promote truly generic UI primitives to top-level `src/components/` modules, such as `src/components/button.tsx`; keep homepage-specific assemblies under `src/components/homepage/`.
- Use the Figma layer tree to find source boundaries, then rename code components by product semantics instead of copying generic names such as `section`, `div`, or `a`.
- Treat Figma CSS, measurements, colors, typography, and layout metadata as inspection inputs. Translate them into maintainable TypeScript, React, Tailwind, and project components instead of pasting generated CSS as the final implementation.
- Allow precise Figma-derived Tailwind arbitrary values inside `src/components/homepage/` during static replication, such as exact pixel widths, spacing, font sizes, and colors. Do not push those one-off values into generic components or global theme tokens unless they prove reusable.
- Prefer content-resilient layout for meaningful text, controls, and primary section structure. Use Flexbox, Grid, `gap`, `max-width`, `mx-auto`, padding, margin, and responsive variants for headings, paragraphs, CTAs, cards, media stages, and navigation groups.
- Use absolute positioning only for local, intentional overlap that cannot be expressed cleanly with normal layout, such as a background glow inside a bounded media stage. Do not turn an entire section into a coordinate canvas when centering, stacking, or spacing can be expressed with Flexbox, Grid, normal flow, transforms, or margins.
- Treat Figma coordinates as visual evidence, not a final layout API. Stable constraints such as maximum section width, asset aspect ratio, colors, typography scale, and major spacing rhythm can remain Figma-derived; fragile coordinates such as fixed `top`, `left`, `width`, and `height` on content blocks should be converted into flow layout.
- Prioritize the static replication phase first: reproduce the Figma layout, assets, text, color, typography, and spacing as a static page before optimizing motion, Lighthouse scores, structured data, and final SEO details.
- In the static replication phase, use the 1440px desktop Figma source as the primary acceptance surface. The acceptance target is approximate high-fidelity: preserve the section structure, visual hierarchy, asset proportions, color, typography character, and spacing rhythm while allowing content-resilient flow layout to differ from raw Figma text coordinates.
- Keep mobile from breaking during desktop static fidelity work, then do product-grade mobile adaptation after desktop behavior is stable.
- Keep the existing i18n routing infrastructure active during static replication. For localized sections, use content-resilient layout so multilingual content remains readable while the 1440px desktop view stays visually close to the reference screenshot.
- Implement the footer first as the pilot section. Use it to settle the repeatable workflow for Figma inspection, asset export, translation shape, component placement, styling fidelity, responsive behavior, and verification before batching the remaining sections.
- Add interaction after static fidelity is stable. Prefer subtle hover states, active states, scroll reveal, image/card micro-interactions, and mobile navigation behavior that respect `prefers-reduced-motion`.
- Validate in stages: first visual static comparison, then responsive behavior, then i18n route checks, then Lighthouse mobile Performance and SEO 90+, then README documentation of AI tool usage plus human trade-offs.

## Decision Records

- **2026-07-01-figma-homepage-source-section**: Use the complete `experiencewelcome.com` source section in the Figma file as the visual source of truth.
  Status: Accepted.
  Context: The test prompt links a Figma community file and a specific node, while the file contains multiple website source sections.
  Decision: Treat the `experiencewelcome.com` source section as the implementation scope; use the node URL only for locating it.
  Consequences: The live site can inform semantics, but visual acceptance should track Figma first.
- **2026-07-01-homepage-components-under-components**: Place homepage section components under `src/components/homepage/`.
  Status: Accepted.
  Context: Route-local `_components` would be a normal Next.js organization choice, but this project wants the component surface organized under `src/components/`.
  Decision: Keep page orchestration in `src/app/[locale]/(home)/page.tsx` and put homepage sections in `src/components/homepage/`.
  Consequences: The component tree is easier to inspect from one shared component root, but `src/components/` must distinguish generic primitives from homepage-specific assemblies.
- **2026-07-02-content-resilient-homepage-layout**: Convert localized homepage content layers from fixed Figma coordinates into resilient flow layout.
  Status: Accepted.
  Context: The first static Header implementation used Figma-derived absolute positioning for content. After localization, longer languages such as Japanese exposed that fixed text geometry as fragile.
  Decision: For meaningful content, controls, and primary section structure, prefer Tailwind Flexbox/Grid flow layout, responsive spacing, max-width constraints, and text wrapping utilities. Use local absolute positioning only for intentional overlap that normal layout cannot express cleanly.
  Consequences: Desktop screenshots may drift slightly from raw Figma coordinates, but localized content remains readable, maintainable, and responsive while retaining Figma-derived hierarchy, colors, assets, and proportions. The 1440px desktop view remains the primary visual acceptance surface and should stay broadly aligned with the reference screenshot.

## Update Triggers

- Update this file when the Figma source boundary, asset-export policy, homepage section structure, component placement, interaction strategy, or validation strategy changes.
- Update this file when implementation work reveals a durable homepage-specific convention.
