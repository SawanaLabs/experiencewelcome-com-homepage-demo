# Components

This directory owns project UI modules. The durable convention is documented in `../../docs/application/component-library.md`.

Local rules:

- Put reusable, product-agnostic primitives in `src/components/`.
- Put site-wide product assemblies in `src/components/` once they are reused across pages; keep their names product-specific enough to avoid confusing them with generic primitives.
- Keep shadcn-style components source-owned here; do not import a `shadcn/ui` runtime package.
- `button.tsx` avoids `radix-ui` and `class-variance-authority`; use `buttonVariants` when another element needs button styling.
- Keep page-only assemblies near their route until reuse or file size justifies promotion.
- Type props from the underlying element or primitive, then add only the props this module owns.
- Destructure `className` and local props, then spread `...props` onto the underlying element or primitive root.
- Compose classes with `cn` from `src/lib/utils.ts`.
- Preserve accessibility and DOM escape hatches: `id`, `aria-*`, `data-*`, events, form props, and ref behavior.
- Keep localized text outside generic primitives; pass translated labels through `children` or explicit label props.
