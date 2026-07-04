---
title: Documentation Assets Domain
description: Domain-level conventions for reference images and other files stored under docs/assets.
updateAt: 2026-07-05
---

# Documentation Assets Domain

## Domain Language

- **Documentation asset**: A non-Markdown file stored under `docs/assets/` to support project documentation, visual comparison, or implementation review.
- **Reference image**: A captured or exported image used as evidence for Figma replication, browser QA, or visual regression discussion.

## Collaboration Conventions

- Keep documentation assets under `docs/assets/` when they are referenced by docs or used as stable implementation evidence.
- Nested asset folders are allowed for non-Markdown files when they make ownership or usage clearer, such as `homepage/` and `readme/`.
- Avoid one-file leaf directories for assets unless the directory is expected to grow or carries a meaningful ownership boundary.
- Prefer descriptive filenames that include the feature or section name.
- Do not treat screenshots and exported references as source UI; implementation should still live in typed React, Tailwind classes, and project components.

## Boundary Principles

- `docs/assets/` owns supporting files for documentation and review.
- `public/` owns runtime assets served by the application.
- `src/components/` owns UI implementation.
- `docs/application/homepage-replication.md` owns the Figma replication process and should reference these assets when they become part of the durable workflow.
