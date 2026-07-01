---
title: Tooling Domain
description: Domain-level conventions for package management, dependency policy, linting, formatting, and verification.
updateAt: 2026-07-02
---

# Tooling Domain

## Domain Language

- **Package manager contract**: The repository-level expectation that install, lockfile, scripts, and dependency overrides are managed with pnpm.
- **Quality gate**: A command that must pass before claiming a tooling or app change is clean.

## Collaboration Conventions

- Use `pnpm` commands for JavaScript dependencies and scripts.
- Keep `pnpm-lock.yaml` and `pnpm-workspace.yaml` synchronized with `package.json`.
- Run targeted verification after tooling changes; at minimum, use `pnpm test`, `pnpm run check`, and `pnpm run build` when the change can affect tests, compilation, or code quality.
- Keep dependency overrides explicit and documented in a tooling leaf doc.

## Boundary Principles

- `package.json` declares scripts, direct dependencies, and `packageManager`.
- `pnpm-lock.yaml` records resolved dependency versions.
- `pnpm-workspace.yaml` records pnpm workspace settings, build approvals, and dependency overrides.
- `biome.json` owns Ultracite-backed Biome configuration.
