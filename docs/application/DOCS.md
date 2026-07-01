---
title: Application Domain
description: Domain-level conventions for the Next.js application surface.
updateAt: 2026-07-01
---

# Application Domain

## Domain Language

- **App Router surface**: The route and layout tree under `src/app/`.
- **App shell**: The root layout, global CSS, metadata, and current homepage entrypoint that shape the visible application.

## Collaboration Conventions

- Read the relevant local Next.js guide in `node_modules/next/dist/docs/` before changing App Router APIs or framework conventions.
- Keep the first screen as the usable application surface when product work starts; avoid replacing it with generic marketing scaffolding.
- Prefer scoped changes in `src/app/` while the project remains a single-route homepage demo.

## Boundary Principles

- `src/app/layout.tsx` owns root metadata, font wiring, and shared document structure.
- `src/app/globals.css` owns Tailwind v4 theme tokens and global CSS variables.
- `src/app/page.tsx` owns the current `/` route implementation.
- `next.config.ts` owns framework-level switches such as React Compiler.
