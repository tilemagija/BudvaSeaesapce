# SEO Phase 2 — Tour Detail Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create dynamic tour detail pages at `/[locale]/tours/[slug]` so each tour has its own URL, per-tour metadata, and indexable content for Google.

**Architecture:** Single server component page at `src/app/[locale]/tours/[slug]/page.tsx`. Uses `generateStaticParams` to statically generate all locale × slug combinations at build time. Uses `generateMetadata` for per-tour SEO. Renders tour content from Sanity using `tourBySlugQuery` (already defined). Reuses existing `Nav` and `Footer` components. Sitemap updated to include all tour URLs.

**Tech Stack:** Next.js 15 App Router · next-intl v4 · Sanity GROQ · `@portabletext/react` (new) · Tailwind CSS v4 · TypeScript

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `src/sanity/queries.ts` | Add `tourSlugsQuery` (for sitemap + generateStaticParams) |
| Modify | `src/types/tour.ts` | Add `TourDetail` type (includes longDescription, LocaleBlockContent) |
| Create | `src/app/[locale]/tours/[slug]/page.tsx` | Tour detail page — generateStaticParams + generateMetadata + page UI |
| Modify | `src/app/sitemap.ts` | Add dynamic tour URLs from Sanity |

---

## Task 1: Install @portabletext/react

**Files:**
- No code files — package install only

`longDescription` in Sanity is `localeBlockContent` (Portable Text). This package is required to render it.

- [ ] **Step 1: Install package**

```bash
cd C:/projekti/BudaSeaesapce && npm install @portabletext/react
```

Expected: package added to `node_modules`, `package.json` updated with `"@portabletext/react"`.

- [ ] **Step 2: Verify TypeScript resolves the package**

```bash
npx tsc --noEmit
```

Expected: no errors about missing `@portabletext/react` module.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install @portabletext/react for Portable Text rendering"
```

---

## Task 2: Add TourDetail type and tourSlugsQuery

**Files:**
- Modify: `src/types/tour.ts`
- Modify: `src/sanity/queries.ts`

- [ ] **Step 1: Add TourDetail type and LocaleBlockContent to `src/types/tour.ts`**

Current file:
```typescript
export interface LocaleString {
  me: string
  en: string
  ru: string
}

export interface Tour {
  _id: string
  title: LocaleString
  slug: string
  shortDescription: LocaleString
  price: number
  duration?: string
  maxPeople?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  coverImage: any
  whatsappMessage?: string
  isFeatured?: boolean
}
```

Replace with:
```typescript
export interface LocaleString {
  me: string
  en: string
  ru: string
}

// Sanity Portable Text blocks per locale
export interface LocaleBlockContent {
  me?: unknown[]
  en?: unknown[]
  ru?: unknown[]
}

export interface Tour {
  _id: string
  title: LocaleString
  slug: string
  shortDescription: LocaleString
  price: number
  duration?: string
  maxPeople?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  coverImage: any
  whatsappMessage?: string
  isFeatured?: boolean
}

// Extended type for tour detail page — matches tourBySlugQuery
export interface TourDetail {
  _id: string
  title: LocaleString
  slug: string
  shortDescription: LocaleString
  longDescription?: LocaleBlockContent
  price: number
  duration?: string
  maxPeople?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  coverImage: any
  whatsappMessage?: string
}
```

- [ ] **Step 2: Add tourSlugsQuery to `src/sanity/queries.ts`**

Open `src/sanity/queries.ts`. At the end of the file (after the `offersQuery` block), add:

```typescript
// ---- SITEMAP / STATIC PARAMS ----
export const tourSlugsQuery = groq`
  *[_type == "tour" && isActive == true] {
    "slug": slug.current,
    _updatedAt
  }
`;
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/types/tour.ts src/sanity/queries.ts
git commit -m "feat(seo): add TourDetail type and tourSlugsQuery for tour detail pages"
```

---

## Task 3: Create tour detail page

**Files:**
- Create: `src/app/[locale]/tours/[slug]/page.tsx`

This is the main deliverable of Phase 2. It includes:
- `generateStaticParams` — generates one set of params per locale × tour slug
- `generateMetadata` — per-tour SEO metadata (title, description, OG image, canonical, hreflang)
- Default export — server component page (Nav + breadcrumb + tour content + Footer)

Key patterns (follow existing code):
- `params` is a `Promise` in Next.js 15: `const { locale, slug } = await params`
- Locale access: `tour.title[locale as Locale] ?? tour.title.en ?? ""`
- `urlFor(image).width(N).height(N).fit("crop").url()` for image URLs
- `client.fetch(query, vars, { next: { revalidate: 3600 } })` for Sanity fetches
- Use `Nav` and `Footer` components (already handle their own i18n internally)

- [ ] **Step 1: Create directory**

```bash
mkdir -p C:/projekti/BudaSeaesapce/src/app/\[locale\]/tours/\[slug\]
```

- [ ] **Step 2: Create `src/app/[locale]/tours/[slug]/page.tsx`**

```tsx
// src/app/[locale]/tours/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { client, urlFor } from "@/sanity/client";
import { tourBySlugQuery, tourSlugsQuery } from "@/sanity/queries";
import { routing } from "@/i18n/routing";
import type { TourDetail } from "@/types/tour";

const BASE_URL = "https://budvaseaescape.com";
const WA_NUMBER = "38267087728";
type Locale = "me" | "en" | "ru";
type Params = { locale: string; slug: string };

// Portable Text rendering without @tailwindcss/typography
// Typed via PortableTextComponents so TypeScript infers correct prop types per component
const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-svetla/70 text-base leading-relaxed mb-4">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-display text-xl font-bold text-svetla mb-3 mt-6">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-lg font-semibold text-svetla/90 mb-2 mt-4">{children}</h3>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-svetla">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        className="text-tirkizna underline underline-offset-2 hover:text-tirkizna/80"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

export async function generateStaticParams(): Promise<Params[]> {
  const tours = await client.fetch<{ slug: string }[]>(
    tourSlugsQuery,
    {},
    { next: { revalidate: 3600 } }
  );
  return routing.locales.flatMap((locale) =>
    tours.map((tour) => ({ locale, slug: tour.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const tour = await client.fetch<TourDetail | null>(
    tourBySlugQuery,
    { slug },
    { next: { revalidate: 3600 } }
  );
  if (!tour) return {};

  const l = locale as Locale;
  const title = tour.title?.[l] ?? tour.title?.en ?? "";
  const description = tour.shortDescription?.[l] ?? tour.shortDescription?.en ?? "";
  const canonicalUrl = `${BASE_URL}/${locale}/tours/${slug}`;
  const ogImageUrl = tour.coverImage
    ? urlFor(tour.coverImage).width(1200).height(630).fit("crop").url()
    : null;

  return {
    title: `${title} — Budva Sea Escape`,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${BASE_URL}/en/tours/${slug}`,
        "sr-ME": `${BASE_URL}/me/tours/${slug}`,
        ru: `${BASE_URL}/ru/tours/${slug}`,
        "x-default": `${BASE_URL}/en/tours/${slug}`,
      },
    },
    openGraph: {
      title: `${title} — Budva Sea Escape`,
      description,
      url: canonicalUrl,
      siteName: "Budva Sea Escape",
      ...(ogImageUrl && {
        images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
      }),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Budva Sea Escape`,
      description,
      ...(ogImageUrl && { images: [ogImageUrl] }),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function TourPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  const tour = await client.fetch<TourDetail | null>(
    tourBySlugQuery,
    { slug },
    { next: { revalidate: 3600 } }
  );

  if (!tour) notFound();

  const l = locale as Locale;
  const title = tour.title?.[l] ?? tour.title?.en ?? "";
  const shortDesc = tour.shortDescription?.[l] ?? tour.shortDescription?.en ?? "";
  const longDesc = tour.longDescription?.[l] ?? tour.longDescription?.en ?? null;

  const imageUrl = tour.coverImage
    ? urlFor(tour.coverImage).width(1200).height(700).fit("crop").url()
    : null;

  const waMsg =
    tour.whatsappMessage ??
    `Hi! I'm interested in booking: ${tour.title?.en ?? title}`;
  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`;

  return (
    <>
      <Nav />

      <main className="min-h-screen bg-tamna pt-20">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="max-w-4xl mx-auto px-6 md:px-8 pt-8 pb-4"
        >
          <ol className="flex items-center gap-2 text-xs text-svetla/40 tracking-widest uppercase">
            <li>
              <Link href="/" className="hover:text-tirkizna transition-colors">
                Budva Sea Escape
              </Link>
            </li>
            <li className="text-svetla/20">›</li>
            <li className="text-svetla/60">{title}</li>
          </ol>
        </nav>

        <article className="max-w-4xl mx-auto px-6 md:px-8 pb-24">
          {/* Cover image */}
          {imageUrl && (
            <div className="relative w-full h-64 sm:h-80 md:h-[420px] mb-10 overflow-hidden rounded-2xl">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
          )}

          {/* Title + price */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-koralna leading-tight">
              {title}
            </h1>
            {tour.price && (
              <span className="flex-shrink-0 px-4 py-2 bg-tirkizna text-tamna text-lg font-bold rounded-full">
                €{tour.price}
              </span>
            )}
          </div>

          {/* Meta pills */}
          {(tour.duration || tour.maxPeople) && (
            <div className="flex gap-3 mb-6 flex-wrap">
              {tour.duration && (
                <span className="px-4 py-2 bg-white/10 text-svetla/70 text-sm rounded-full">
                  ⏱ {tour.duration}
                </span>
              )}
              {tour.maxPeople && (
                <span className="px-4 py-2 bg-white/10 text-svetla/70 text-sm rounded-full">
                  👥 max {tour.maxPeople}
                </span>
              )}
            </div>
          )}

          {/* Divider */}
          <div className="h-px bg-tirkizna/20 mb-8" />

          {/* Short description */}
          <p className="text-svetla/80 text-lg leading-relaxed mb-8">
            {shortDesc}
          </p>

          {/* Long description (Portable Text) */}
          {longDesc && longDesc.length > 0 && (
            <div className="mb-10">
              <PortableText
                value={longDesc}
                components={portableTextComponents}
              />
            </div>
          )}

          {/* WhatsApp CTA */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full bg-koralna hover:bg-koralna/90 text-white font-bold tracking-widest uppercase py-5 rounded-xl text-sm transition-colors"
          >
            Book via WhatsApp →
          </a>
        </article>
      </main>

      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Verify page renders in dev server**

First, get an actual tour slug from Sanity by querying the dev server sitemap (or skip if no tours exist in Sanity yet):

```bash
curl -s http://localhost:3000/sitemap.xml | grep -o 'tours/[^<]*' | head -3
```

If a slug is found (e.g. `tours/sunset-cruise`), verify the tour page renders:
```bash
curl -s http://localhost:3000/en/tours/sunset-cruise | grep -o 'og:title[^>]*content="[^"]*"' | head -2
```

Expected: `og:title ... content="Sunset Cruise — Budva Sea Escape"` (with actual tour name).

If no tours exist in Sanity yet: TypeScript passing is sufficient for this step. The page will render correctly once tours are added.

- [ ] **Step 5: Commit**

```bash
git add "src/app/[locale]/tours/[slug]/page.tsx"
git commit -m "feat(seo): add tour detail pages with per-tour metadata and breadcrumb"
```

Note: on Windows/bash, escape brackets: `git add src/app/\[locale\]/tours/\[slug\]/page.tsx`

---

## Task 4: Update sitemap.ts to include tour URLs

**Files:**
- Modify: `src/app/sitemap.ts`

Sitemap becomes async to fetch tour slugs from Sanity. Uses `routing.locales` instead of hardcoded array (Phase 1 code quality reviewer suggestion). Tour entries use `_updatedAt` from Sanity for accurate `lastModified`.

- [ ] **Step 1: Replace `src/app/sitemap.ts` entirely**

```typescript
// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";
import { tourSlugsQuery } from "@/sanity/queries";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://budvaseaescape.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Home pages — one per locale
  const homeEntries: MetadataRoute.Sitemap = routing.locales.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1.0,
  }));

  // Tour pages — locale × slug, with real lastModified from Sanity
  let tourEntries: MetadataRoute.Sitemap = [];
  try {
    const tours = await client.fetch<{ slug: string; _updatedAt: string }[]>(
      tourSlugsQuery,
      {},
      { next: { revalidate: 3600 } }
    );
    tourEntries = tours.flatMap((tour) =>
      routing.locales.map((locale) => ({
        url: `${BASE_URL}/${locale}/tours/${tour.slug}`,
        lastModified: new Date(tour._updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }))
    );
  } catch {
    // Sanity unavailable — skip tour entries, home pages still included
  }

  return [...homeEntries, ...tourEntries];
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Verify sitemap output in dev server**

```bash
curl -s http://localhost:3000/sitemap.xml
```

Expected: XML with 3 home page `<url>` entries (always present) plus one `<url>` per locale per active tour in Sanity (0 if no tours yet).

If tours exist in Sanity, verify a tour URL appears:
```
<loc>https://budvaseaescape.com/en/tours/sunset-cruise</loc>
```

- [ ] **Step 4: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat(seo): update sitemap with dynamic tour URLs from Sanity"
```

---

## Task 5: Build verification

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: build completes with no TypeScript errors. Tour detail pages appear in output.

- [ ] **Step 2: Confirm tour routes in build output**

Look for lines like:
```
● /[locale]/tours/[slug]     ...kB
  ├ /me/tours/[your-tour-slug]
  ├ /en/tours/[your-tour-slug]
  └ /ru/tours/[your-tour-slug]
```

The `●` symbol means SSG (statically generated via generateStaticParams). If no tours exist in Sanity, the route still appears but with 0 instances.

Also confirm sitemap changed from `○ (Static)` to `ƒ (Dynamic)` or ISR — this is expected since it now fetches from Sanity.

- [ ] **Step 3: Commit build confirmation (no files changed)**

No commit needed — verification only. Push after confirming build passes.

```bash
git push origin main
```

---

## Phase 2 Complete — What This Unlocks

After deploying:

| URL | Content |
|-----|---------|
| `budvaseaescape.com/en/tours/sunset-cruise` | Full tour page, English metadata |
| `budvaseaescape.com/me/tours/sunset-cruise` | Full tour page, Montenegrin metadata |
| `budvaseaescape.com/ru/tours/sunset-cruise` | Full tour page, Russian metadata |
| `/sitemap.xml` | Now includes all tour URLs |

**Next: Phase 3** — Structured Data (JSON-LD): LocalBusiness on home, TouristTrip on each tour page, Person for captain. This is where Google gets rich results.
