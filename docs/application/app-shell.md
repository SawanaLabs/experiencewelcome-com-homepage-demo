---
title: App Shell
description: Stable notes for the localized Next.js app shell and homepage entrypoint.
updateAt: 2026-07-01
---

# App Shell

## Scope

- Covers `src/app/[locale]/layout.tsx`, `src/app/[locale]/(home)/page.tsx`, `src/app/globals.css`, and app-level behavior affected by `next.config.ts`.
- Covers the current localized homepage route while the project is still a homepage demo.

## Current Subdomain Docs

- `next.config.ts` enables `reactCompiler: true`.
- `next.config.ts` wraps the config with the next-intl plugin so `src/i18n/request.ts` is available to App Router.
- `src/app/[locale]/layout.tsx` validates the locale segment, sets request locale for static rendering, generates localized metadata, and loads Geist Sans and Geist Mono via `next/font/google`.
- Geist font variables are applied on `<html>` and the body uses `font-sans antialiased`; keep this shape unless Tailwind or Next guidance changes.
- `src/app/globals.css` uses literal Geist font families inside `@theme inline`, which avoids Tailwind v4 circular font token resolution.
- `src/app/[locale]/(home)/page.tsx` is the starter homepage entrypoint. Replace it directly when the real ExperienceWelcome homepage work begins.
- Keep `src/app/[locale]/(home)/page.tsx` as the homepage route entrypoint and page composition surface; put ExperienceWelcome homepage section components under `src/components/homepage/`.
- The `(home)` route group keeps the URL at `/{locale}` without adding a path segment.
- `next/image` usages include explicit dimensions plus `style={{ width: "auto", height: "auto" }}` to avoid aspect-ratio warnings after starter cleanup.

## Update Triggers

- Update this file when the localized layout, global theme tokens, app metadata, homepage route, or Next framework switches change.
- Update this file when a user correction clarifies how the homepage should be structured or presented.
