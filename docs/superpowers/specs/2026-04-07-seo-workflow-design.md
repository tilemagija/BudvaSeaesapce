# SEO Workflow Design — Budva Sea Escape

**Date:** 2026-04-07
**Project:** budvaseaescape.com — boat tour business, Budva, Montenegro
**Stack:** Next.js 15 App Router · Sanity CMS · Tailwind v4 · Vercel
**i18n:** ME / EN / RU (next-intl, `[locale]` segment)

---

## Goal

Achieve Google visibility for key queries: "Budva boat tour", "Budva sunset cruise", "sea tours Montenegro". Current state: live site, zero SEO work done. Baseline metadata exists in `[locale]/layout.tsx` but no sitemap, no robots.txt, no structured data, no analytics.

---

## Decision: Tour Detail Pages — YES

Each tour gets a dedicated route `/[locale]/tours/[slug]`. Rationale: Sanity `tour` schema already has `slug`, `shortDescription`, `longDescription`, `price`, `duration`, `coverImage`. Without dedicated pages, TouristTrip JSON-LD has no URL to point to and we can't rank for tour-specific keywords. This is the highest SEO leverage available.

---

## Phase Overview

| # | Phase | Size | What Gets Built | User Action Required |
|---|-------|------|-----------------|----------------------|
| 1 | Technical Foundation | S | `robots.ts`, `sitemap.ts` (Sanity-powered), root layout cleanup, OG default image check | None |
| 2 | Tour Detail Pages | M | `/[locale]/tours/[slug]/page.tsx` — dynamic route, per-tour metadata, Sanity render, WhatsApp CTA, breadcrumb | None |
| 3 | Structured Data (JSON-LD) | M/L | LocalBusiness + Organization on home, TouristTrip on each tour page, Person for captain, BreadcrumbList. `src/lib/schema.ts` helper. | Supply: address, geo coords, business hours, price range, founding year |
| 4 | Meta & OG Polish | S | OG default image (or dynamic `opengraph-image.tsx`), per-tour OG, canonical audit | Approve OG design or supply 1200×630 brand asset |
| 5 | Core Web Vitals | M | Audit + fix LCP (video hero), CLS (particles/animations), INP (3D tilt). Lighthouse > 90. | None |
| 6 | Analytics | S | Vercel Analytics install + event tracking (WhatsApp click, audio play, scroll depth). Optional GA4. | Enable Vercel Analytics in Vercel dashboard (1-click). Optionally supply GA4 Measurement ID. |
| 7 | External Setup (user only) | S | Step-by-step instructions: GSC verify + sitemap submit, Google Business Profile, optional Bing WMT | Everything manual — GSC, GBP |

---

## Phase 1 — Technical Foundation (Detail)

**Goal:** Google can find, crawl, and understand the site's URL structure. No indexing errors.

### robots.ts

`src/app/robots.ts` — Next.js metadata route. Rules:
- Allow all crawlers on public routes
- Disallow `/admin` (Sanity Studio)
- Include `Sitemap:` directive pointing to `https://budvaseaescape.com/sitemap.xml`

### sitemap.ts

`src/app/sitemap.ts` — dynamic sitemap, fetches tours from Sanity at build/revalidate time.

URLs to include:
- Home per locale: `/en`, `/me`, `/ru`
- Tour detail per locale × per tour: `/en/tours/[slug]`, `/me/tours/[slug]`, `/ru/tours/[slug]`

Each URL includes `lastModified`, `changeFrequency`, `priority`. Home pages: priority 1.0. Tour pages: priority 0.8.

Sanity fetch: GROQ query for `*[_type == "tour" && isActive == true]{ slug, _updatedAt }`. Revalidate: 3600s.

### Root layout.tsx cleanup

`src/app/layout.tsx` has two issues:
1. `lang="me"` is hardcoded — the `<html>` tag will always declare Montenegrin regardless of which locale is active. The fix is to move `<html>/<body>` rendering into `[locale]/layout.tsx` so it can use the dynamic `locale` param, and strip them from root layout.
2. The `metadata` export in root layout is redundant — `[locale]/layout.tsx` already generates full per-locale metadata. Root layout metadata should be removed to avoid confusion.

### OG default image

`public/og-default.jpg` is referenced in `[locale]/layout.tsx` as fallback when Sanity has no `ogImage`. Verify it exists. If not, create a placeholder or note in Phase 4 to generate it properly.

---

## Constraints

- Next.js App Router metadata routes (`sitemap.ts`, `robots.ts`) only — no external packages.
- Sanity fetches must use `{ next: { revalidate: 3600 } }` (not `cache: 'no-store'`).
- All URLs use `BASE_URL = "https://budvaseaescape.com"` (already defined in `[locale]/layout.tsx`).
- Must read `node_modules/next/dist/docs/` before writing any Next.js-specific code (per AGENTS.md).
- No analytics until Phase 6 — keep Phase 1 focused.

---

## Out of Scope (This Workflow)

- Blog / content marketing (future milestone)
- Review schema — needs real reviews first
- Booking/reservation system
- Performance monitoring alerts
