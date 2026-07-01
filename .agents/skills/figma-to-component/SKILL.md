---
name: figma-to-component
description: Figma to component replication workflow for turning a specific Figma section, frame, or node into a faithful repository component. Use when the user asks to replicate, implement, recreate, or port a Figma design into code, export Figma assets, map a Figma layer tree to component DOM, or verify visual fidelity in browser.
---

# Figma To Component

Use this skill to run a trace from a Figma source section to a committed-quality component. A trace means every layout, color, asset, and verification claim can point back to Figma, an exported asset, repository code, or browser measurement.

## Non-Negotiables

- Treat Figma as the source of truth for structure, dimensions, spacing, copy, colors, and exported assets.
- Preserve the meaningful Figma box tree. Semantic HTML is allowed, but do not flatten layout groups that exist to position children.
- Use Tailwind arbitrary values for Figma colors, such as `bg-[#000000]` or `text-[rgba(255,255,255,0.65)]`. Do not substitute theme tokens unless the user explicitly maps them.
- Use exported screenshots as references and exported SVGs/images as assets. Do not implement a section by pasting one screenshot as the UI.
- If Dev Mode is unavailable, say so and continue with the viewer tree, reference screenshots, exported assets, and browser measurements.
- Ask at most one blocking question before implementation; otherwise make the conservative choice that keeps the trace strongest.

## Workflow

### 1. Pin The Target

Identify the exact Figma section and the code surface it should affect.

Capture:

- Figma file URL and node ID, if available.
- Selected layer name as shown in Figma.
- Target viewport width for first-pass fidelity, usually the design frame width.
- Target component path and route/page where the component will be mounted for verification.
- Stage constraints, such as static-only, no i18n, exported assets allowed, or one-section-per-commit.

Completion criterion: the target layer, viewport, component path, mounting route, and acceptance rules are explicit or can be stated as assumptions.

### 2. Read The Repository Contract

Before editing, read the repo rules and the local surface being changed.

For this Next.js repo, include:

- `AGENTS.md`
- relevant `node_modules/next/dist/docs/` guide before writing Next.js code
- current route/page file that will mount the component
- existing component conventions under `src/components/`
- existing asset and docs folders under `public/` and `docs/assets/`

Completion criterion: you know where the component belongs, where raw references belong, where browser-served assets belong, and which commands verify the change.

### 3. Extract Figma Truth

Use Figma and exported files to gather enough facts to code without guessing.

Record:

- top-layer dimensions, flow direction, padding, gap, and background color
- direct child groups and their names
- key x/y positions and sizes at the target viewport
- text content, font size, line height, and visible color
- borders, opacity, fills, and strokes
- exported asset dimensions and original filenames

Asset handling:

- Save section screenshots as references, for example `docs/assets/homepage/<section>/<section>-reference.png`.
- Move browser-served assets to `public/homepage/<section>/`.
- Rename assets semantically, such as `welcome-mark.svg`, `youtube.svg`, or `linkedin.svg`.
- Preserve exported SVG/image contents unless the user asks for optimization.

Completion criterion: you can list the section's main child hierarchy, colors, dimensions, and asset files without relying on visual memory.

### 4. Map Figma Layers To Code

Design the component tree before writing the JSX.

Map:

- Figma section/frame -> exported React component
- Figma layout groups -> nested `div`, `section`, `nav`, `ul`, or other semantic containers
- repeated link/card groups -> local data arrays
- exported icons/images -> `public/` paths with explicit width and height
- page-level verification mount -> minimal route composition

Keep the component cohesive. Put section-local data beside the component until reuse is real. Avoid a new abstraction unless it removes meaningful duplication.

Completion criterion: each meaningful Figma group has a corresponding code container or an explicit reason for being merged.

### 5. Implement The Static Component

Build the static section first.

Rules:

- Put homepage section components under `src/components/homepage/`.
- Use `next/image` for `public/` assets when working in Next.js and dimensions are known.
- Encode Figma desktop dimensions with Tailwind arbitrary values at the relevant breakpoint.
- Add responsive behavior below the target viewport without changing the desktop trace.
- Keep static-stage copy hard-coded if the user has deferred i18n.
- Preserve accessibility basics: semantic landmarks, link labels, decorative image `alt=""`, and visible focus styles.

Completion criterion: the component renders on the chosen route and all referenced assets load from `public/`.

### 6. Verify The Trace

Run both code checks and visual checks.

Code checks:

- Run the repo's lint/check command.
- Run production build when the change touches rendered app code.
- If a dev server and build write to the same `.next` directory at the same time, restart the dev server before judging dev stability.

Browser checks:

- Start the local dev server.
- Use the in-app browser for viewport control and DOM inspection.
- Set the design viewport when the browser supports it.
- Measure key nodes with `getBoundingClientRect()`: section size, major child x/y positions, image sizes, and divider/border positions.
- Read computed colors with `getComputedStyle()`.
- Take a screenshot when the browser surface returns a trustworthy image. If screenshots are clipped or scaled, use DOM measurements as the fidelity evidence and report the screenshot limitation.

Completion criterion: report the verification commands and the measured facts that prove the implementation matches the Figma source.

## Proven Footer Trace

Use this repo's footer as the first precedent:

- reference: `docs/assets/homepage/footer/footer-reference.png` at `1440 x 536`
- assets: `public/homepage/footer/welcome-mark.svg`, `youtube.svg`, `twitter.svg`, `linkedin.svg`
- component: `src/components/homepage/footer.tsx`
- route mount: `src/app/[locale]/(home)/page.tsx`
- desktop measurements: footer `1440 x 536`, top area `457px`, bottom area `79px` including `1px` border, logo `105 x 120` at `x=80 y=112`, nav headings at `x=428/750/1072 y=112`

This precedent is useful for process, not for copy-pasting dimensions into unrelated sections.
