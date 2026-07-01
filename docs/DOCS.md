---
title: Project Knowledge Protocol
description: Repository-wide conventions and boundaries for durable project knowledge.
updateAt: 2026-07-01
---

# Project Knowledge Protocol

## Domain Language

- **ExperienceWelcome homepage demo**: The Next.js App Router demo project for ExperienceWelcome.com.
- **Durable project knowledge**: Stable facts, conventions, boundaries, and decisions that future agents should reuse across tasks.

## Collaboration Conventions

- Start with `docs/index.md` and this file before changing project structure, tooling, or app architecture.
- For Next.js work, read the relevant local guide under `node_modules/next/dist/docs/` before writing code; this project tracks a version with breaking changes.
- Use `pnpm` for JavaScript package management. Keep npm lockfile artifacts out of the repository.
- Use Ultracite and Biome through the existing package scripts before claiming code quality is clean.
- Keep docs updates scoped to stable project knowledge. Do not add short-lived debugging notes or speculative product direction.

## Boundary Principles

- Application code lives under `src/app/` until the app has a clear reason to introduce another runtime surface.
- Repository-level tooling belongs in root config files such as `package.json`, `pnpm-workspace.yaml`, `biome.json`, and `next.config.ts`.
- Agent skills live under `.agents/skills/`; the installed skill inventory is tracked by `skills-lock.json`.
- Put project-wide conventions here, domain navigation in `docs/index.md`, domain-specific conventions in `docs/<domain>/DOCS.md`, and leaf knowledge in `docs/<domain>/<subdomain>.md`.
