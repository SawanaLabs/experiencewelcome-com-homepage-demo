---
title: Application Domain
description: Domain-level conventions for the Next.js application surface.
updateAt: 2026-07-01
---

# Application Domain

## Domain Language

- **App Router surface**: The route and layout tree under `src/app/`.
- **App shell**: The localized layout, global CSS, metadata, and current homepage entrypoint that shape the visible application.
- **Component library surface**: The reusable project-owned UI modules under `src/components/`.
- **Locale route**: The `src/app/[locale]/` segment used by next-intl to serve each supported language.

## Collaboration Conventions

- Read the relevant local Next.js guide in `node_modules/next/dist/docs/` before changing App Router APIs or framework conventions.
- Keep the first screen as the usable application surface when product work starts; avoid replacing it with generic marketing scaffolding.
- Prefer scoped changes in `src/app/` and `src/i18n/` while the project remains a single-route homepage demo.

## Boundary Principles

- `src/app/[locale]/layout.tsx` owns localized metadata, font wiring, and shared document structure.
- `src/app/globals.css` owns Tailwind v4 theme tokens and global CSS variables.
- `src/app/[locale]/(home)/page.tsx` owns the current localized homepage route implementation.
- `src/components/` owns reusable UI modules once they are promoted out of a route or page.
- `src/lib/` owns shared application utilities such as `cn`.
- `src/i18n/` owns locale lists, JSON messages, next-intl request configuration, localized navigation helpers, and SEO URL helpers.
- `next.config.ts` owns framework-level switches such as React Compiler.
