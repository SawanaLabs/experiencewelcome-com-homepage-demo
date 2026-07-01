---
title: Quality Gates
description: Stable notes for Ultracite, Biome, and verification commands.
updateAt: 2026-07-01
---

# Quality Gates

## Scope

- Covers `biome.json`, package scripts in `package.json`, and verification commands for this Next.js app.

## Current Subdomain Docs

- `pnpm run check` runs `ultracite check`.
- `pnpm run fix` runs `ultracite fix`.
- `pnpm run lint` runs `biome check`.
- `pnpm run format` runs `biome format --write`.
- `biome.json` extends `ultracite/biome/core`, `ultracite/biome/react`, and `ultracite/biome/next`.
- `biome.json` disables `suspicious.noUnknownAtRules` because Tailwind v4 uses directives such as `@theme`.
- `pnpm run build` is the production compilation gate for Next.js.

## Update Triggers

- Update this file when scripts, Ultracite configuration, Biome rules, Tailwind-related lint exceptions, or verification expectations change.
