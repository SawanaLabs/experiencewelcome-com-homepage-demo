---
title: App Shell
description: Stable notes for the root Next.js app shell and homepage entrypoint.
updateAt: 2026-07-01
---

# App Shell

## Scope

- Covers `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, and app-level behavior affected by `next.config.ts`.
- Covers the current `/` route while the project is still a homepage demo.

## Current Subdomain Docs

- `next.config.ts` enables `reactCompiler: true`.
- `src/app/layout.tsx` sets metadata for "ExperienceWelcome Homepage Demo" and loads Geist Sans and Geist Mono via `next/font/google`.
- Geist font variables are applied on `<html>` and the body uses `font-sans antialiased`; keep this shape unless Tailwind or Next guidance changes.
- `src/app/globals.css` uses literal Geist font families inside `@theme inline`, which avoids Tailwind v4 circular font token resolution.
- `src/app/page.tsx` is still the starter homepage entrypoint. Replace it directly when the real ExperienceWelcome homepage work begins.
- `next/image` usages include explicit dimensions plus `style={{ width: "auto", height: "auto" }}` to avoid aspect-ratio warnings after starter cleanup.

## Update Triggers

- Update this file when the root layout, global theme tokens, app metadata, homepage route, or Next framework switches change.
- Update this file when a user correction clarifies how the homepage should be structured or presented.
