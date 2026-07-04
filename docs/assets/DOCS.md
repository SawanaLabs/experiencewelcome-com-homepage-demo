---
title: Documentation Assets Domain
description: Domain-level conventions for reference images and other files stored under docs/assets.
updateAt: 2026-07-04
---

# Documentation Assets Domain

## Domain Language

- **Documentation asset**: A non-Markdown file stored under `docs/assets/` to support project documentation, visual comparison, or implementation review.
- **Reference image**: A captured or exported image used as evidence for Figma replication, browser QA, or visual regression discussion.

## Collaboration Conventions

- Keep documentation assets under `docs/assets/` when they are referenced by docs or used as stable implementation evidence.
- Keep asset files directly under `docs/assets/` with descriptive filenames. Do not create nested subdirectories inside this domain; the docs verifier treats direct child directories as docs layout boundaries.
- Prefer descriptive filenames that include the feature or section name.
- Do not treat screenshots and exported references as source UI; implementation should still live in typed React, Tailwind classes, and project components.

## Boundary Principles

- `docs/assets/` owns flat supporting files for documentation and review.
- `public/` owns runtime assets served by the application.
- `src/components/` owns UI implementation.
- `docs/application/homepage-replication.md` owns the Figma replication process and should reference these assets when they become part of the durable workflow.
