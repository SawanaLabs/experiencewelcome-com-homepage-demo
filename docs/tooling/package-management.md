---
title: Package Management
description: Stable notes for pnpm usage, lockfiles, build approvals, and dependency overrides.
updateAt: 2026-07-01
---

# Package Management

## Scope

- Covers `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, and package-manager-related README instructions.

## Current Subdomain Docs

- The repository uses `pnpm@11.7.0`, declared in `package.json` via `packageManager`.
- Use `pnpm install`, `pnpm dev`, and `pnpm run <script>` for normal development commands.
- `package-lock.json` was removed during the pnpm migration; do not reintroduce npm lockfile artifacts.
- `pnpm-workspace.yaml` currently allows `sharp`, `@parcel/watcher`, and `@swc/core` build scripts because Next and next-intl depend on native image, watcher, and SWC packages.
- `pnpm-workspace.yaml` overrides `next>postcss` to `8.5.16` so `next@16.2.9` resolves a patched PostCSS version.

## Decision Records

- **2026-07-01-next-postcss-override**: Override Next's transitive PostCSS dependency to the patched version.
  Status: Accepted.
  Context: `pnpm audit --prod` flagged `postcss <8.5.10` through `next>postcss`, and the forced npm audit path suggested an unacceptable framework downgrade.
  Decision: Use the root `pnpm-workspace.yaml` override `"next>postcss": "8.5.16"` and keep the lockfile on pnpm.
  Consequences: Revisit this override after Next publishes a stable release that depends on `postcss >=8.5.10`.

## Update Triggers

- Update this file when the package manager version, lockfile policy, install commands, pnpm workspace settings, build approvals, or dependency overrides change.
