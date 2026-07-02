---
title: Component Library
description: Stable conventions for project-owned UI components, Base UI-backed primitives, pass-through props, and shadcn-inspired composition.
updateAt: 2026-07-02
---

# Component Library

## Scope

- Covers the planned project component surface under `src/components/`.
- Covers reusable UI primitives, application-level composition, wrapper components, prop pass-through, and class-name composition.
- Covers the project-owned `cn` utility in `src/lib/utils.ts`.

## Domain Language

- **Project-owned component**: A component whose source lives in this repository and can be edited directly.
- **UI primitive**: A reusable, product-agnostic component that owns presentation and accessible behavior, but no business workflow.
- **Pass-through component**: A component that preserves the underlying element or primitive interface by accepting and spreading the native props callers expect.
- **Wrapper component**: A component whose main job is to add styling, behavior, animation, or accessibility defaults around an underlying element, primitive, or child tree while preserving the caller's expected escape hatches.
- **Base UI-backed primitive**: A source-owned project component that wraps or adapts `@base-ui/react` behavior while keeping project styling, props, and exports under `src/components/`.
- **Custom hook boundary**: A `use*` function that owns stateful React logic such as effects, refs, browser APIs, subscriptions, event lifecycles, or reusable interaction behavior.
- **Pure calculation helper**: A deterministic TypeScript function that transforms, validates, sorts, maps, or derives data without reading React state, mutating inputs, or touching browser/server side effects.

## Current Subdomain Docs

- The project does not install `shadcn/ui` as a component dependency. It adopts the same useful philosophy: own the source, keep components composable, expose predictable interfaces, and keep implementation readable to agents and humans.
- In this repository, `components/` means `src/components/`. Import components as `@/components/...`.
- Keep generic primitives in `src/components/` when they appear. These modules should be reusable across pages and should not import product copy, next-intl translations, route data, analytics, or feature-specific state.
- Keep site-wide ExperienceWelcome assemblies in `src/components/` when they are reused across pages but still own product-specific copy or assets. `src/components/navbar.tsx` owns the shared Welcome navigation content and exposes layout variants for the homepage hero, mobile header, and floating shell.
- Put ExperienceWelcome homepage section components under `src/components/homepage/`. These are product-specific assemblies, so they may depend on homepage copy, assets, layout choreography, and next-intl boundaries defined for the homepage.
- Treat TS/TSX line-limit failures as responsibility probes. Split page and section components by user-visible UI boundaries first: route composition, section, subsection, visual block, repeated item, or interaction island. For Figma replication work, preserve the source layer intent and DOM semantics while reducing the function size.
- Extract a custom hook when the oversized component mixes JSX with stateful behavior: `useState`, `useEffect`, `useRef`, browser APIs, subscriptions, timers, observers, carousel state, menu state, or event lifecycle wiring. Keep hook names concrete and use-case oriented; a hook should expose intent to the component instead of leaking implementation details.
- Extract pure calculation helpers when the oversized code is deterministic data work: copy shaping, asset-to-copy merging, assertions, sorting, filtering, URL building, measurement math, or test fixtures. Keep these helpers outside React components so they are easy to test and do not expand the render path.
- Split oversized tests by subject or behavior rather than by line count alone. Prefer focused `describe` blocks for section contracts such as Header, Customer Stories, and Footer, plus small shared render helpers when repeated setup obscures the assertion.
- Keep Server Components as the default boundary for route entries, section shells, copy shaping, and static structure. Move Client Components and hooks toward leaf interaction nodes unless a whole section already owns client-only behavior.
- `src/components/button.tsx` is the first shadcn-style copied primitive. It intentionally avoids headless UI dependencies, `Slot`, `asChild`, and `class-variance-authority`; use its exported `buttonVariants` to style other elements such as locale-aware links.
- `src/components/drawer.tsx` is a shadcn-style copied primitive backed by Base UI Drawer. It owns the project's bottom-sheet presentation, overlay, portal composition, and Drawer part exports without adding Vaul or Radix dependencies.
- For new copied shadcn-style interactive primitives that need managed accessibility behavior, prefer the shadcn Base UI variant and `@base-ui/react` primitives over Radix-based implementations.
- Use native elements first for simple controls such as plain buttons, links, and static layout. Use Base UI for menus, dropdowns, select-like controls, popovers, dialogs, tabs, tooltips, and other stateful interaction patterns where keyboard behavior, focus management, positioning, or ARIA semantics would otherwise be hand-written.
- Keep Base UI as an implementation detail behind source-owned project modules. Callers should import from `@/components/...`, not from `@base-ui/react/...`, unless a low-level module is intentionally being built.
- Do not add new `@radix-ui/*` dependencies by default. Use Radix only for a documented exception when the current shadcn Base UI variant or Base UI primitive cannot cover the component.
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
- Treat visual wrapper components, including motion wrappers, as pass-through components by default. Type props from the wrapped element or primitive, destructure only local options plus `className`, compose classes with `cn`, and forward the remaining props to the element that callers conceptually target.
- Do not swallow DOM and accessibility escape hatches in wrappers. Preserve `id`, `aria-*`, `data-*`, event handlers, form props, and ref behavior unless the component explicitly documents why a prop cannot pass through.
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
- **2026-07-02-base-ui-for-headless-primitives**: Prefer Base UI for new interactive shadcn-style primitives.
  Status: Accepted.
  Context: shadcn now documents both Radix UI and Base UI variants, while Base UI is an actively maintained, unstyled React primitive library built for accessible, composable component systems.
  Decision: For new interactive primitives, copy and adapt the shadcn Base UI implementation or wrap `@base-ui/react` directly inside a project-owned component. Keep native implementations for simple controls and avoid new Radix dependencies unless there is a documented gap.
  Consequences: Future dropdown, menu, select, popover, dialog, tabs, tooltip, and similar components should be Base UI-backed by default while preserving the repository's source-owned component surface.
- **2026-07-02-base-ui-drawer-primitive**: Add a local Drawer primitive for mobile navigation and future bottom sheets.
  Status: Accepted.
  Context: The mobile navbar needs a Drawer interaction, while the upstream shadcn registry Drawer currently introduces Vaul and Radix Dialog dependencies.
  Decision: Implement `src/components/drawer.tsx` as a source-owned wrapper around `@base-ui/react/drawer`, preserving shadcn-style part exports and project styling.
  Consequences: Mobile and future Drawer surfaces use the existing Base UI dependency, with one local styling point for overlays, portals, and sheet motion.
- **2026-07-02-tsx-refactoring-boundaries**: Use line-limit failures to reveal responsibility boundaries.
  Status: Accepted.
  Context: TS/TSX files now have hard maintainability gates for function and file size, but the codebase should not be split mechanically just to satisfy a number.
  Decision: Classify refactors by component structure, custom hook extraction, pure calculation helpers, test organization, and Server/Client boundaries. Start with the boundary that matches the code's responsibility, then keep the resulting module cohesive and shallow.
  Consequences: Large UI files become easier to review without fragmenting Figma-derived structure, while stateful logic and pure data work move into boundaries that are easier to test and reuse.

## Update Triggers

- Update this file when `src/components/` gains a reusable primitive.
- Update this file when the component folder structure changes.
- Update this file when `cn` or its dependencies change.
- Update this file when component prop, accessibility, variant, or localization conventions change.
- Update this file when TS/TSX refactoring boundaries change.
