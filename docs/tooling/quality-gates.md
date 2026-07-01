---
title: Quality Gates
description: Stable notes for Ultracite, Biome, and verification commands.
updateAt: 2026-07-02
---

# Quality Gates

## Scope

- Covers `biome.json`, `vitest.config.mts`, package scripts in `package.json`, and verification commands for this Next.js app.

## Current Subdomain Docs

- `pnpm run check` runs `ultracite check`, which delegates to Biome for formatting, linting, and import-sorting checks.
- `pnpm run fix` runs `ultracite fix`, which delegates to Biome write mode for safe fixes, formatting, and import sorting.
- `pnpm test` runs `vitest run`.
- `biome.json` extends `ultracite/biome/core`, `ultracite/biome/react`, and `ultracite/biome/next`.
- `biome.json` disables `suspicious.noUnknownAtRules` because Tailwind v4 uses directives such as `@theme`.
- `biome.json` treats locale-aware navigation as a quality gate: import `Link`, `permanentRedirect`, `redirect`, `usePathname`, and `useRouter` from `@/i18n/navigation` instead of `next/link` or the matching names from `next/navigation`.
- `vitest.config.mts` uses the Node test environment and inlines `next-intl`, which is required when tests exercise `createNavigation`-backed helpers.
- `pnpm run build` is the production compilation gate for Next.js.

## Update Triggers

- Update this file when scripts, Ultracite configuration, Biome rules, Vitest configuration, Tailwind-related lint exceptions, or verification expectations change.
