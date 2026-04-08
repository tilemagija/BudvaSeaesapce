# SEO Phase 3 — Structured Data (JSON-LD) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add JSON-LD structured data to home page and tour detail pages so Google can display Rich Results (star ratings, price, tour details) in search results.

**Architecture:** Two parts — (1) `src/lib/schema.ts` exports pure functions that build schema.org JSON objects, (2) each page/layout renders `<script type="application/ld+json">` tags directly in JSX (not via metadata API, which only supports `<meta>` tags). Home layout gets `LocalBusiness` + `TouristAttraction` + `Person` (captain). Tour detail page gets `TouristTrip` + `BreadcrumbList`.

**Tech Stack:** Next.js 15 App Router · Schema.org JSON-LD · TypeScript · Sanity CMS data · No new dependencies

---

## Business Data (hardcoded — changes once a year at most)

```
Name: Budva Sea Escape
URL: https://budvaseaescape.com
Phone: +38267087728
Address: Slovenska Obala, Budva, 85310, Montenegro
Coordinates: lat 42.2806, lng 18.8378
Founded: 2022
Price range: €€
Rating: 5.0 / 108 reviews
Instagram: https://www.instagram.com/budvaseaescape
```

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `src/lib/schema.ts` | Pure functions that return schema.org JSON objects — no React, no Next.js |
| Modify | `src/app/[locale]/layout.tsx` | Render LocalBusiness + Person `<script>` tags in LocaleLayout JSX |
| Modify | `src/app/[locale]/tours/[slug]/page.tsx` | Render TouristTrip + BreadcrumbList `<script>` tags in TourPage JSX |

---

## Task 1: Create schema.ts helper

**Files:**
- Create: `src/lib/schema.ts`

Pure builder functions. No imports from React or Next.js. Returns plain objects that will be JSON.stringify'd into script tags.

- [ ] **Step 1: Create `src/lib/schema.ts`**

```typescript
// src/lib/schema.ts

const BASE_URL = "https://budvaseaescape.com";

// ---- LocalBusiness + TouristAttraction ----

export function buildLocalBusiness() {
  return {
    "@context": "https://schema.org",
    "@type": ["TouristAttraction", "LocalBusiness"],
    "@id": `${BASE_URL}/#business`,
    name: "Budva Sea Escape",
    description:
      "Premium boat tours, snorkeling, fishing and sunset cruises on the Adriatic Sea in Budva, Montenegro.",
    url: BASE_URL,
    telephone: "+38267087728",
    foundingDate: "2022",
    priceRange: "€€",
    currenciesAccepted: "EUR",
    sameAs: [
      "https://www.instagram.com/budvaseaescape",
      "https://wa.me/38267087728",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Slovenska Obala",
      addressLocality: "Budva",
      postalCode: "85310",
      addressCountry: "ME",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 42.2806,
      longitude: 18.8378,
    },
    hasMap: "https://maps.google.com/?q=42.2806,18.8378",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday", "Sunday",
      ],
      opens: "06:00",
      closes: "23:00",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "108",
      bestRating: "5",
      worstRating: "1",
    },
    touristType: ["Couples", "Families", "Adventure seekers"],
  };
}

// ---- Person (Captain) ----

export function buildCaptainPerson(captainName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE_URL}/#captain`,
    name: captainName,
    jobTitle: "Boat Captain & Tour Guide",
    worksFor: { "@id": `${BASE_URL}/#business` },
    url: BASE_URL,
    sameAs: ["https://www.instagram.com/budvaseaescape"],
  };
}

// ---- TouristTrip (per tour page) ----

export interface TourSchemaInput {
  name: string;
  description: string;
  slug: string;
  price: number;
  duration?: string;
  maxPeople?: number;
  imageUrl: string | null;
}

export function buildTouristTrip(tour: TourSchemaInput, locale: string) {
  const tourUrl = `${BASE_URL}/${locale}/tours/${tour.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${tourUrl}#trip`,
    name: tour.name,
    description: tour.description,
    url: tourUrl,
    provider: { "@id": `${BASE_URL}/#business` },
    touristType: ["Couples", "Families", "Adventure seekers"],
    ...(tour.imageUrl && { image: tour.imageUrl }),
    ...(tour.duration && { duration: tour.duration }),
    ...(tour.maxPeople && { maximumAttendeeCapacity: tour.maxPeople }),
    offers: {
      "@type": "Offer",
      price: tour.price.toString(),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `https://wa.me/38267087728`,
      seller: { "@id": `${BASE_URL}/#business` },
    },
  };
}

// ---- BreadcrumbList ----

export function buildBreadcrumb(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/schema.ts
git commit -m "feat(seo): add schema.ts helper with JSON-LD builder functions"
```

---

## Task 2: Add JSON-LD to home layout

**Files:**
- Modify: `src/app/[locale]/layout.tsx`

JSON-LD must be in the rendered HTML `<head>`. In Next.js App Router, the correct way is to render `<script type="application/ld+json">` directly in the component's JSX (not via `metadata.other` which only generates `<meta>` tags).

We add the script tags inside the `LocaleLayout` component's return, after `<LenisProvider>`. Next.js will hoist `<script>` tags found in `<head>` position automatically — but to be explicit, we wrap them in a React Fragment alongside the existing JSX.

Current `LocaleLayout` return (lines ~118-124):
```tsx
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LenisProvider>
        {children}
      </LenisProvider>
    </NextIntlClientProvider>
  );
```

- [ ] **Step 1: Add imports to `src/app/[locale]/layout.tsx`**

Find the imports block at the top of `src/app/[locale]/layout.tsx`. Add after the last existing import:

```typescript
import { buildLocalBusiness, buildCaptainPerson } from "@/lib/schema";
import { captainQuery } from "@/sanity/queries";
```

- [ ] **Step 2: Fetch captain inside `LocaleLayout` function**

In `LocaleLayout` (the default export async function), after the `const messages = await getMessages()` line, add:

```typescript
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let captain: any = null;
  try {
    captain = await client.fetch(captainQuery, {}, { next: { revalidate: 3600 } });
  } catch {
    // Sanity unavailable — skip captain schema
  }
```

- [ ] **Step 3: Add JSON-LD script tags to the return JSX**

Replace the current `return` statement in `LocaleLayout`:

**Before:**
```tsx
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LenisProvider>
        {children}
      </LenisProvider>
    </NextIntlClientProvider>
  );
```

**After:**
```tsx
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildLocalBusiness()) }}
      />
      {captain?.name && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildCaptainPerson(captain.name)) }}
        />
      )}
      <NextIntlClientProvider locale={locale} messages={messages}>
        <LenisProvider>
          {children}
        </LenisProvider>
      </NextIntlClientProvider>
    </>
  );
```

- [ ] **Step 4: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Verify JSON-LD in dev server**

Start dev server if not running: `npm run dev`

```bash
curl -s http://localhost:3000/en | grep -c 'application/ld+json'
```

Expected: `2` (LocalBusiness + Person, if captain configured in Sanity) or `1` (LocalBusiness only, if no captain).

Verify LocalBusiness content:
```bash
curl -s http://localhost:3000/en | grep -o '"@type":\["TouristAttraction","LocalBusiness"\]'
```

Expected: `"@type":["TouristAttraction","LocalBusiness"]`

- [ ] **Step 6: Commit**

```bash
git add src/app/\[locale\]/layout.tsx
git commit -m "feat(seo): add LocalBusiness and Person JSON-LD to home layout"
```

---

## Task 3: Add JSON-LD to tour detail pages

**Files:**
- Modify: `src/app/[locale]/tours/[slug]/page.tsx`

Add `TouristTrip` + `BreadcrumbList` script tags to the `TourPage` JSX. Variables `title`, `description`, `slug`, `locale`, `imageUrl`, and `tour` are already computed in the existing component.

- [ ] **Step 1: Add import to `src/app/[locale]/tours/[slug]/page.tsx`**

Find the imports block at the top. Add after the last existing import:

```typescript
import { buildTouristTrip, buildBreadcrumb } from "@/lib/schema";
```

- [ ] **Step 2: Add JSON-LD script tags to the TourPage return JSX**

In `TourPage`, find the `return (` statement. The current return starts with `<>` and `<Nav />`. Add the two script tags right after the opening `<>` fragment tag, before `<Nav />`:

**Before:**
```tsx
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-tamna pt-20">
```

**After:**
```tsx
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildTouristTrip(
              {
                name: title,
                description: shortDesc,
                slug,
                price: tour.price,
                duration: tour.duration,
                maxPeople: tour.maxPeople,
                imageUrl,
              },
              locale
            )
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumb([
              { name: "Budva Sea Escape", url: `${BASE_URL}/${locale}` },
              { name: title, url: `${BASE_URL}/${locale}/tours/${slug}` },
            ])
          ),
        }}
      />
      <Nav />
      <main className="min-h-screen bg-tamna pt-20">
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Verify JSON-LD on a tour page**

Get an actual slug from the sitemap:
```bash
curl -s http://localhost:3000/sitemap.xml | grep -o 'en/tours/[^<]*' | head -1
```

Use the slug (replace `sunset-cruise` with actual slug if different):
```bash
curl -s http://localhost:3000/en/tours/sunset-cruise | grep -c 'application/ld+json'
```

Expected: `4` (2 from LocalBusiness/Person in layout + 2 from TouristTrip/BreadcrumbList in page).

Verify TouristTrip type:
```bash
curl -s http://localhost:3000/en/tours/sunset-cruise | grep -o '"@type":"TouristTrip"'
```

Expected: `"@type":"TouristTrip"`

- [ ] **Step 5: Commit**

```bash
git add src/app/\[locale\]/tours/\[slug\]/page.tsx
git commit -m "feat(seo): add TouristTrip and BreadcrumbList JSON-LD to tour detail pages"
```

---

## Task 4: Build, push, and validate

- [ ] **Step 1: Production build**

```bash
npm run build
```

Expected: 0 TypeScript errors. All pages generate without errors.

- [ ] **Step 2: Push to Vercel**

```bash
git push origin main
```

Wait ~2 minutes for Vercel to deploy.

- [ ] **Step 3: Test home page with Google Rich Results Test**

Open https://search.google.com/test/rich-results

Enter: `https://budvaseaescape.com/en`

Expected: detects `TouristAttraction` and/or `LocalBusiness`. No Critical errors (warnings are fine).

- [ ] **Step 4: Test a tour page**

Enter: `https://budvaseaescape.com/en/tours/sunset-cruise` (or a real slug)

Expected: detects `TouristTrip`. `BreadcrumbList` may also appear. No Critical errors.

---

## Phase 3 Complete — What This Unlocks

| Schema | Where | Google outcome |
|--------|-------|---------------|
| `LocalBusiness` + `TouristAttraction` | Every page | Business knowledge panel eligible |
| `AggregateRating` (5.0/108) | Every page | ⭐⭐⭐⭐⭐ stars in search results |
| `TouristTrip` | Tour pages | Price + duration in rich results |
| `BreadcrumbList` | Tour pages | Breadcrumb path shown in search URL |
| `Person` (captain) | Every page | Links Nemanja to the business entity |

**Note:** Rich Results appear 1-4 weeks after Google Search Console setup (Phase 7). The star ratings require Google to trust the `AggregateRating` — since those reviews are from Google Business Profile, it should accept them.

**Next: Phase 4** — Meta & OG Polish: dynamic `opengraph-image.tsx`, canonical audit.
