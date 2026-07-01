---
name: figma-to-component
description: Figma to component replication workflow for turning a specific Figma section, frame, or node into a faithful repository component. Use when the user asks to replicate, implement, recreate, or port a Figma design into code, export Figma assets, map a Figma layer tree to component DOM, or verify visual fidelity in browser.
---

# Figma To Component

Use this skill to run a trace from a Figma source section to a committed-quality component. A trace means every layout, color, asset, and verification claim can point back to Figma, an exported asset, repository code, or browser measurement.

## Non-Negotiables

- Treat Figma as the source of truth for structure, dimensions, spacing, copy, colors, and exported assets.
- Preserve the meaningful Figma box tree. Semantic HTML is allowed, but do not flatten layout groups that exist to position children.
- Encode Figma colors exactly in the repo's styling system. In Tailwind repos, use arbitrary values such as `bg-[#000000]` or `text-[rgba(255,255,255,0.65)]`. Do not substitute theme tokens unless the user explicitly maps them.
- Export references and assets from selected Figma nodes whenever browser access is available. Export the selected section/frame as a visual reference, usually PNG. Prefer SVG for vector icons, logos, and simple graphic groups; use PNG, JPEG, WebP, GIF, or video when the source content requires raster or motion output.
- Use exported section references as visual references and exported SVGs/images as assets. Do not implement a section by pasting one screenshot as the UI.
- If Dev Mode is unavailable, say so and continue with the viewer tree, exported references, exported assets, and browser measurements.
- Ask at most one blocking question before implementation; otherwise make the conservative choice that keeps the trace strongest.

## Workflow

### 1. Pin The Target

Identify the exact Figma section and the code surface it should affect.

Capture:

- Figma file URL and node ID, if available.
- Selected layer name as shown in Figma.
- Target viewport or viewport set for first-pass fidelity. Derive it from the selected Figma frame, user request, or responsive variants in the design.
- Target component path and route/page where the component will be mounted for verification.
- Stage constraints, such as static-only, no i18n, exported assets allowed, or one-section-per-commit.

Completion criterion: the target layer, viewport set, component path, mounting route, and acceptance rules are explicit or can be stated as assumptions.

### 2. Read The Repository Contract

Before editing, read the repo rules and the local surface being changed.

Include:

- repo instructions such as `AGENTS.md`, `CLAUDE.md`, or local project docs
- relevant framework docs required by the repo before writing framework-specific code
- current route/page file that will mount the component
- existing component conventions
- existing asset and reference folders

Completion criterion: you know where the component belongs, where raw references belong, where browser-served assets belong, and which commands verify the change.

### 3. Extract Figma Truth

Use Figma and exported files to gather enough facts to code without guessing.

Extraction principles:

- Work in an authenticated browser session that can access the intended Figma file. When this environment provides `chrome-live-profile`, use that skill and follow its current instructions.
- Use visible UI automation when Figma selection or export requires direct browser interaction. When this environment provides `computer-use:computer-use`, use that skill and follow its current instructions.
- Confirm the browser is on the intended Figma file before extracting facts.
- Select the target section/frame and export it as the visual reference.
- Select child nodes that represent reusable assets, such as logo marks, icons, decorative vectors, product screenshots, or media frames, and export each asset from its own Figma node.
- Choose export formats by asset nature: SVG for vector content; raster or motion formats for raster, bitmap-like, or animated content.
- Move downloaded exports into the repository only after recording the original filenames and selected Figma layer names.
- Do not encode Figma UI coordinates, panel locations, profile labels, profile directory names, account names, or local paths in this skill.

Record:

- top-layer dimensions, flow direction, padding, gap, and background color
- direct child groups and their names
- key x/y positions and sizes at the target viewport
- text content, font size, line height, and visible color
- borders, opacity, fills, and strokes
- exported asset dimensions and original filenames

Asset handling:

- Save exported section references in the repo's reference or docs-assets area.
- Move browser-served assets to the repo's served asset area.
- Rename assets semantically, using the Figma layer purpose rather than the browser download name.
- Preserve exported SVG/image contents unless the user asks for optimization.

Completion criterion: you can list the section's main child hierarchy, colors, dimensions, and asset files without relying on visual memory.

### 4. Map Figma Layers To Code

Design the component tree before writing the JSX.

Map:

- Figma section/frame -> exported React component
- Figma layout groups -> nested `div`, `section`, `nav`, `ul`, or other semantic containers
- repeated link/card groups -> local data arrays
- exported icons/images -> served asset paths with explicit width and height
- page-level verification mount -> minimal route composition

Keep the component cohesive. Put section-local data beside the component until reuse is real. Avoid a new abstraction unless it removes meaningful duplication.

Completion criterion: each meaningful Figma group has a corresponding code container or an explicit reason for being merged.

### 5. Implement The Static Component

Build the static section first.

Rules:

- Put components under the repo's established component directory and domain grouping.
- Use the framework's image component for served assets when dimensions are known and the repo already uses one.
- Encode Figma dimensions at the relevant breakpoint.
- Add responsive behavior outside the target viewport without changing the target viewport trace.
- Keep static-stage copy hard-coded if the user has deferred i18n.
- Preserve accessibility basics: semantic landmarks, link labels, decorative image `alt=""`, and visible focus styles.

Completion criterion: the component renders on the chosen route and all referenced assets load from the repo's served asset system.

### 6. Verify The Trace

Run both code checks and visual checks.

Code checks:

- Run the repo's lint/check command.
- Run production build when the change touches rendered app code.
- If a dev server and build write to the same `.next` directory at the same time, restart the dev server before judging dev stability.

Browser checks:

- Start the local dev server.
- Use the repo's normal browser verification tool for viewport control and DOM inspection.
- Set every target viewport when the browser supports it.
- Measure key nodes with `getBoundingClientRect()`: section size, major child x/y positions, image sizes, and divider/border positions.
- Read computed colors with `getComputedStyle()`.
- Take a screenshot when the browser surface returns a trustworthy image. If screenshots are clipped or scaled, use DOM measurements as the fidelity evidence and report the screenshot limitation.

Completion criterion: report the verification commands and the measured facts that prove the implementation matches the Figma source.
