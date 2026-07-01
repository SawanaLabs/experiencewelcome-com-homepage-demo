---
title: I18n Routing
description: Stable notes for next-intl routing, supported locales, localized metadata, localized navigation copy, and SEO alternates.
updateAt: 2026-07-02
---

# I18n Routing

## Scope

- Covers `src/i18n/`, `src/proxy.ts`, `src/app/[locale]/`, `src/app/sitemap.ts`, `src/app/robots.ts`, and `src/i18n/messages/*.json`.
- Covers URL, locale, and SEO behavior for the homepage demo.

## Current Subdomain Docs

- The app uses `next-intl` with App Router and the dynamic `src/app/[locale]/` route segment.
- Supported locales are `en`, `zh`, `ja`, `fr`, `es`, and `hi`; the default locale is `en`.
- `localePrefix: "as-needed"` keeps the default English homepage at `/` while non-default locales use prefixed paths such as `/zh`, `/ja`, `/fr`, `/es`, and `/hi`.
- The ExperienceWelcome homepage static replication phase uses English as the visual fidelity baseline. The shared Navbar, Header, CustomerStories, Footer, and homepage metadata are localized through message namespaces; remaining section copy is migrated incrementally.
- `src/app/[locale]/(home)/page.tsx` serves the locale homepage without adding a URL segment because `(home)` is a route group.
- `src/proxy.ts` uses next-intl middleware and excludes API routes, Next internals, Vercel internals, and dotted static assets from locale matching.
- `src/i18n/routing.ts` is the source of truth for locale codes, default locale, pathnames, and the locale type guard.
- `src/i18n/navigation.ts` exports the locale-aware navigation helpers from `createNavigation(routing)`.
- `src/i18n/request.ts` loads repo-local JSON messages from `src/i18n/messages/<locale>.json`.
- `src/i18n/messages/*.json` includes `Navbar`, `Header`, `CustomerStories`, `Footer`, and `HomeMetadata` namespaces. `src/app/[locale]/(home)/page.tsx` reads those messages server-side and passes plain copy objects into reusable homepage components.
- `src/i18n/seo.ts` centralizes canonical URL and hreflang URL generation. `NEXT_PUBLIC_SITE_URL` can override the default canonical origin, which is `https://experiencewelcome.com`.
- `src/app/[locale]/layout.tsx` uses `generateStaticParams` and `setRequestLocale` so each supported locale is statically generated.
- Localized metadata includes canonical and language alternates. `src/app/sitemap.ts` also emits language alternates for every locale URL, and `src/app/robots.ts` points crawlers to `/sitemap.xml`.

## Decision Records

- **2026-07-01-next-intl-routing**: Use next-intl App Router routing with dynamic locale segments.
  Status: Accepted.
  Context: The project needs English, Chinese, Japanese, French, Spanish, and Hindi with SEO-friendly localized URLs.
  Decision: Use `[locale]`, `localePrefix: "as-needed"`, static params, localized metadata, sitemap alternates, and repo-local JSON messages.
  Consequences: Add future localized pages through the `pathnames` map and keep SEO URL generation in `src/i18n/seo.ts`.
- **2026-07-02-navbar-localization-first**: Localize shared navigation copy before full homepage section copy.
  Status: Accepted.
  Context: The homepage replica is still being built section by section, but the top-bar language switcher needs visible language feedback immediately.
  Decision: Add a route-owned `Navbar` message namespace and pass translated Navbar copy into component assemblies as serializable props.
  Consequences: Keep section translation work incremental while avoiding next-intl imports inside reusable component modules.
- **2026-07-02-homepage-shell-localization**: Localize completed homepage shell sections and page metadata through server-owned copy objects.
  Status: Accepted.
  Context: Header, CustomerStories, and Footer are the completed homepage sections currently visible in the route, and the homepage needs locale-specific SEO metadata.
  Decision: Keep next-intl reads in the route layer, build typed copy objects in `src/i18n/homepage-copy.ts`, build page metadata in `src/i18n/homepage-metadata.ts`, and pass copy into section components as plain props.
  Consequences: Reusable homepage components stay framework-light, metadata follows Next.js `generateMetadata`, and each future section can join the same message-to-copy pattern with a focused contract test.

## Update Triggers

- Update this file when locales, default locale, locale prefix policy, localized pathnames, message loading, canonical URL behavior, sitemap behavior, or next-intl routing APIs change.
