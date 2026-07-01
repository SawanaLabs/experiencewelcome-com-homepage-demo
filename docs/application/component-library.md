---
title: Component Library
description: Stable conventions for project-owned UI components, pass-through props, and shadcn-inspired composition.
updateAt: 2026-07-01
---

# Component Library

## Scope

- Covers the planned project component surface under `src/components/`.
- Covers reusable UI primitives, application-level composition, prop pass-through, and class-name composition.
- Covers the project-owned `cn` utility in `src/lib/utils.ts`.

## Domain Language

- **Project-owned component**: A component whose source lives in this repository and can be edited directly.
- **UI primitive**: A reusable, product-agnostic component that owns presentation and accessible behavior, but no business workflow.
- **Pass-through component**: A component that preserves the underlying element or primitive interface by accepting and spreading the native props callers expect.

## Current Subdomain Docs

- The project does not install `shadcn/ui` as a component dependency. It adopts the same useful philosophy: own the source, keep components composable, expose predictable interfaces, and keep implementation readable to agents and humans.
- In this repository, `components/` means `src/components/`. Import components as `@/components/...`.
- Keep generic primitives in `src/components/` when they appear. These modules should be reusable across pages and should not import product copy, next-intl translations, route data, analytics, or feature-specific state.
- Keep site-wide ExperienceWelcome assemblies in `src/components/` when they are reused across pages but still own product-specific copy or assets. `src/components/navbar.tsx` owns the shared Welcome navigation content and exposes layout variants for the homepage hero, mobile header, and floating shell.
- Put ExperienceWelcome homepage section components under `src/components/homepage/`. These are product-specific assemblies, so they may depend on homepage copy, assets, layout choreography, and next-intl boundaries defined for the homepage.
- `src/components/button.tsx` is the first shadcn-style copied primitive. It intentionally avoids `radix-ui`, `Slot`, `asChild`, and `class-variance-authority`; use its exported `buttonVariants` to style other elements such as locale-aware links.
- For other future routes, keep page-specific assemblies near the page until repetition is proven. The ExperienceWelcome homepage is the current exception because its section components are intentionally organized under `src/components/homepage/`.
- Prefer native elements and accessible headless primitives over custom `div` controls. Do not drop `id`, `aria-*`, `data-*`, event handlers, form props, or `ref` behavior when wrapping an element.
- Type component props from the underlying element or primitive, then add only the small project-specific props the component truly owns:

```tsx
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "secondary";
};

export function Button({
  className,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium",
        variant === "secondary" && "border bg-transparent",
        className
      )}
      type={type}
      {...props}
    />
  );
}
```

- Use `...props` on the underlying native element or headless primitive root. If a wrapper must split props across multiple elements, document that interface explicitly because callers can no longer infer pass-through behavior.
- Use `className={cn(baseClasses, conditionalClasses, className)}` so caller classes extend the component while shared defaults remain local and readable.
- `src/lib/utils.ts` owns the shadcn-style `cn` helper. It uses `clsx` plus `tailwind-merge` so conditional classes and Tailwind conflicts such as `p-2 p-4` are handled centrally.
- `src/app/globals.css` owns the semantic Tailwind tokens used by copied shadcn-style components, including `primary`, `secondary`, `accent`, `destructive`, `border`, `input`, `ring`, and radius tokens.
- Keep variant props scarce. If a component starts collecting layout, icon, loading, tone, density, alignment, and behavior props, split composition into children or create a more specific component.
- Do not create silent fallbacks for invalid visual states. Prefer TypeScript unions and narrow props so impossible states fail during development.
- For localized UI, pass translated strings from route or section modules into primitives through `children`, labels, or ARIA props. Generic `src/components/` modules should not call next-intl directly.

## Decision Records

- **2026-07-01-source-owned-pass-through-components**: Build the component layer as project-owned, pass-through React modules inspired by shadcn's open-code and composition model.
  Status: Accepted.
  Context: The project needs shadcn's maintainability philosophy without adopting shadcn initialization or generated component ownership wholesale.
  Decision: Put reusable UI code under `src/components/`, preserve native props with `...props`, compose classes through `cn` from `src/lib/utils.ts`, and avoid broad configuration-style component interfaces. Do not import `shadcn/ui`; copy and adapt source locally.
  Consequences: Future components require slightly more local discipline, but callers keep DOM and accessibility escape hatches without wrapper workarounds.
- **2026-07-01-button-without-radix-or-cva**: Keep the first Button primitive dependency-light while preserving shadcn's class and prop-pass-through style.
  Status: Accepted.
  Context: The upstream Button source uses `radix-ui` Slot and `class-variance-authority`, but the current project only needs a native button and a reusable class generator.
  Decision: Implement `src/components/button.tsx` with local variant maps, export `buttonVariants`, keep `...props`, and limit new dependencies to `clsx` and `tailwind-merge` for `cn`.
  Consequences: The component does not support `asChild`; callers should apply `buttonVariants` directly to links or other elements when needed.

## Update Triggers

- Update this file when `src/components/` gains a reusable primitive.
- Update this file when the component folder structure changes.
- Update this file when `cn` or its dependencies change.
- Update this file when component prop, accessibility, variant, or localization conventions change.
