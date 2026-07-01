---
title: I18n Routing
description: Stable notes for next-intl routing, supported locales, localized metadata, and SEO alternates.
updateAt: 2026-07-01
---

# I18n Routing

## Scope

- Covers `src/i18n/`, `src/proxy.ts`, `src/app/[locale]/`, `src/app/sitemap.ts`, `src/app/robots.ts`, and `src/i18n/messages/*.json`.
- Covers URL, locale, and SEO behavior for the homepage demo.

## Current Subdomain Docs

- The app uses `next-intl` with App Router and the dynamic `src/app/[locale]/` route segment.
- Supported locales are `en`, `zh`, `ja`, `fr`, `es`, and `hi`; the default locale is `en`.
- `localePrefix: "as-needed"` keeps the default English homepage at `/` while non-default locales use prefixed paths such as `/zh`, `/ja`, `/fr`, `/es`, and `/hi`.
- The ExperienceWelcome homepage static replication phase keeps locale routing active but uses English as the content and visual baseline. Multilingual homepage content polish is deferred until after static fidelity is stable.
- `src/app/[locale]/(home)/page.tsx` serves the locale homepage without adding a URL segment because `(home)` is a route group.
- `src/proxy.ts` uses next-intl middleware and excludes API routes, Next internals, Vercel internals, and dotted static assets from locale matching.
- `src/i18n/routing.ts` is the source of truth for locale codes, default locale, pathnames, and the locale type guard.
- `src/i18n/navigation.ts` exports the locale-aware navigation helpers from `createNavigation(routing)`.
- `src/i18n/request.ts` loads repo-local JSON messages from `src/i18n/messages/<locale>.json`.
- `src/i18n/seo.ts` centralizes canonical URL and hreflang URL generation. `NEXT_PUBLIC_SITE_URL` can override the default canonical origin, which is `https://experiencewelcome.com`.
- `src/app/[locale]/layout.tsx` uses `generateStaticParams` and `setRequestLocale` so each supported locale is statically generated.
- Localized metadata includes canonical and language alternates. `src/app/sitemap.ts` also emits language alternates for every locale URL, and `src/app/robots.ts` points crawlers to `/sitemap.xml`.

## Decision Records

- **2026-07-01-next-intl-routing**: Use next-intl App Router routing with dynamic locale segments.
  Status: Accepted.
  Context: The project needs English, Chinese, Japanese, French, Spanish, and Hindi with SEO-friendly localized URLs.
  Decision: Use `[locale]`, `localePrefix: "as-needed"`, static params, localized metadata, sitemap alternates, and repo-local JSON messages.
  Consequences: Add future localized pages through the `pathnames` map and keep SEO URL generation in `src/i18n/seo.ts`.

## Update Triggers

- Update this file when locales, default locale, locale prefix policy, localized pathnames, message loading, canonical URL behavior, sitemap behavior, or next-intl routing APIs change.
