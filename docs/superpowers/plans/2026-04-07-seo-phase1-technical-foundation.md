# SEO Phase 1 — Technical Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `robots.ts`, `sitemap.ts`, fix hardcoded `lang="me"` in root layout, and remove a broken OG image fallback reference — so Google can correctly discover and crawl the site.

**Architecture:** Four isolated file changes. Two new Next.js App Router metadata route files (`robots.ts`, `sitemap.ts`) at `src/app/` level. Two edits to existing layout files. No new dependencies.

**Tech Stack:** Next.js 15 App Router metadata routes · next-intl v4 `getLocale()` · TypeScript

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `src/app/robots.ts` | Serves `/robots.txt` — tells crawlers what to index |
| Create | `src/app/sitemap.ts` | Serves `/sitemap.xml` — lists all public URLs |
| Modify | `src/app/layout.tsx` | Dynamic `lang` attribute, remove redundant metadata |
| Modify | `src/app/[locale]/layout.tsx` | Remove broken `/og-default.jpg` reference |

---

## Task 1: robots.ts

**Files:**
- Create: `src/app/robots.ts`

- [ ] **Step 1: Create the file**

```typescript
// src/app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/studio", "/api"],
    },
    sitemap: "https://budvaseaescape.com/sitemap.xml",
  };
}
```

- [ ] **Step 2: Verify TypeScript — build check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Verify output in dev server**

Start dev server if not running:
```bash
npm run dev
```

Then open `http://localhost:3000/robots.txt` in a browser.

Expected output:
```
User-Agent: *
Allow: /
Disallow: /admin
Disallow: /studio
Disallow: /api

Sitemap: https://budvaseaescape.com/sitemap.xml
```

- [ ] **Step 4: Commit**

```bash
git add src/app/robots.ts
git commit -m "feat(seo): add robots.ts metadata route"
```

---

## Task 2: sitemap.ts

**Files:**
- Create: `src/app/sitemap.ts`

Phase 1 sitemap contains only home pages (3 locales). Tour detail pages will be added in Phase 2 after those routes exist. Submitting URLs that return 404 harms SEO ranking.

- [ ] **Step 1: Create the file**

```typescript
// src/app/sitemap.ts
import type { MetadataRoute } from "next";

const BASE_URL = "https://budvaseaescape.com";
const locales = ["me", "en", "ru"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1.0,
  }));
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Verify output in dev server**

Open `http://localhost:3000/sitemap.xml` in browser.

Expected: valid XML with three `<url>` entries:
```xml
<urlset ...>
  <url>
    <loc>https://budvaseaescape.com/me</loc>
    <lastmod>...</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1</priority>
  </url>
  <url>
    <loc>https://budvaseaescape.com/en</loc>
    ...
  </url>
  <url>
    <loc>https://budvaseaescape.com/ru</loc>
    ...
  </url>
</urlset>
```

- [ ] **Step 4: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat(seo): add sitemap.ts with home page URLs"
```

---

## Task 3: Fix root layout — dynamic lang

**Files:**
- Modify: `src/app/layout.tsx`

**Why:** `lang="me"` is hardcoded. When a user visits `/en`, the `<html>` still declares Montenegrin. `getLocale()` from `next-intl/server` reads the active locale from the request (set by middleware) and makes it dynamic. The `metadata` export here is also redundant — `src/app/[locale]/layout.tsx` already generates full per-locale metadata.

Current file content:
```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Budva Sea Escape",
  description: "Premium sea experiences in Budva, Montenegro",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="me" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 1: Replace the entire file**

```tsx
// src/app/layout.tsx
import { getLocale } from "next-intl/server";
import type { ReactNode } from "react";
import "./globals.css";

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Verify dynamic lang in browser**

With dev server running, open `http://localhost:3000/en` and View Source (right-click → View Page Source).

Expected: `<html lang="en"` in the source.

Open `http://localhost:3000/ru` and View Source.

Expected: `<html lang="ru"` in the source.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx
git commit -m "fix(seo): dynamic html lang attribute via getLocale()"
```

---

## Task 4: Fix OG image fallback

**Files:**
- Modify: `src/app/[locale]/layout.tsx`

**Why:** Line 58 references `${BASE_URL}/og-default.jpg` as a fallback when Sanity has no OG image. This file does not exist in `public/`. Serving a broken image URL in `og:image` meta tags causes sharing previews (WhatsApp, Facebook, Telegram) to show a broken image. The fix: omit OG images entirely when Sanity has none. Phase 4 will add proper OG image generation.

- [ ] **Step 1: Edit `src/app/[locale]/layout.tsx`**

Find and replace the ogImageUrl block (lines 55–58):

**Before:**
```typescript
  const ogImageAsset = settings?.ogImage ?? settings?.heroBackgroundImage ?? null;
  const ogImageUrl = ogImageAsset
    ? urlFor(ogImageAsset).width(1200).height(630).fit("crop").url()
    : `${BASE_URL}/og-default.jpg`;
```

**After:**
```typescript
  const ogImageAsset = settings?.ogImage ?? settings?.heroBackgroundImage ?? null;
  const ogImageUrl: string | null = ogImageAsset
    ? urlFor(ogImageAsset).width(1200).height(630).fit("crop").url()
    : null;
```

- [ ] **Step 2: Update openGraph images to be conditional**

Find the `openGraph` block (around line 81–90):

**Before:**
```typescript
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Budva Sea Escape",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "Budva Sea Escape",
        },
      ],
      locale: locale === "ru" ? "ru_RU" : locale === "me" ? "sr_ME" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
```

**After:**
```typescript
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Budva Sea Escape",
      ...(ogImageUrl && {
        images: [{ url: ogImageUrl, width: 1200, height: 630, alt: "Budva Sea Escape" }],
      }),
      locale: locale === "ru" ? "ru_RU" : locale === "me" ? "sr_ME" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImageUrl && { images: [ogImageUrl] }),
    },
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Verify metadata in browser**

With dev server running, open `http://localhost:3000/en` and View Source.

Search for `og:image`.

Expected when Sanity has no ogImage configured: **no `og:image` meta tag** in the output (not present, not broken).

Expected when Sanity has an ogImage configured: `<meta property="og:image" content="https://cdn.sanity.io/...">` pointing to Sanity CDN.

- [ ] **Step 5: Commit**

```bash
git add src/app/\[locale\]/layout.tsx
git commit -m "fix(seo): remove broken og-default.jpg fallback, omit OG image when none configured"
```

---

## Task 5: Final build verification

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: build completes with no TypeScript errors and no warnings about missing files. You should see `/robots.txt` and `/sitemap.xml` listed in the build output routes.

- [ ] **Step 2: Confirm routes in build output**

In the build output, look for lines like:
```
○ /robots.txt
○ /sitemap.xml
```

These confirm Next.js registered the metadata routes.

- [ ] **Step 3: Commit build confirmation note (no files changed)**

No commit needed — this is a verification-only step.

---

## Phase 1 Complete — What You Can See Now

After deploying to Vercel:

| URL | What it shows |
|-----|--------------|
| `https://budvaseaescape.com/robots.txt` | Crawler rules — allow all, block admin |
| `https://budvaseaescape.com/sitemap.xml` | 3 home page URLs |
| View Source on `/en` | `<html lang="en">` |
| View Source on `/ru` | `<html lang="ru">` |

**Next: Phase 2** — Tour detail pages `/[locale]/tours/[slug]`. After that, sitemap.ts will be updated to include all tour URLs.
