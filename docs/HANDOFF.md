# Budva Sea Escape — Handoff dokument

> Kopiraj ovaj fajl u novi chat da nastaviš gdje si stao.

---

## Projekat

**Šta je:** Live web aplikacija za boat tour biznis u Budvi, CG. Poklon za Nemaniju (kapetan).
**URL:** https://budvaseaescape.com
**GitHub:** https://github.com/tilemagija/BudvaSeaesapce
**Vercel:** auto-deploy na git push origin main
**Sanity Studio:** https://budvaseaescape.com/admin (ili sanity.io/manage)

---

## Stack

- **Next.js 15.5** App Router (params su Promise — uvijek await)
- **Sanity CMS** (headless, GROQ queries)
- **Tailwind CSS v4** custom vars: `--tirkizna: #00c2c7`, `--koralna: #ff6b4a`, `--tamna: #0a1628`, `--svetla: #f0f8ff`
- **next-intl v4** — 3 lokacije: `["me", "en", "ru"]`, `localePrefix: "always"`
- **Vercel** deployment + Analytics
- **Framer Motion** + **Lenis** smooth scroll
- **@portabletext/react** za Sanity Portable Text

---

## Struktura projekta (ključni fajlovi)

```
src/
  app/
    layout.tsx                          ← Root layout: lang attr, Analytics, GSC verification
    robots.ts                           ← /robots.txt
    sitemap.ts                          ← /sitemap.xml (async, Sanity tours)
    [locale]/
      layout.tsx                        ← generateMetadata (OG, hreflang), LocalBusiness + Person JSON-LD
      page.tsx                          ← Home page
      opengraph-image.tsx               ← Branded fallback OG image (1200x630)
      tours/
        [slug]/
          page.tsx                      ← Tour detail: generateMetadata, TouristTrip + BreadcrumbList JSON-LD
          opengraph-image.tsx           ← Tour fallback OG image sa nazivom ture
  lib/
    schema.ts                           ← JSON-LD builder funkcije (buildLocalBusiness, buildCaptainPerson, buildTouristTrip, buildBreadcrumb)
  sanity/
    client.ts                           ← Sanity client + urlFor()
    queries.ts                          ← Sve GROQ queries
  types/
    tour.ts                             ← TourDetail interface, LocaleString, LocaleBlockContent
  i18n/
    routing.ts                          ← next-intl routing config
  components/
    Nav.tsx, Footer.tsx, LenisProvider.tsx, ...
```

---

## Sanity schema (content types)

| Type | Ključna polja |
|------|--------------|
| `tour` | title (LocaleString), slug, shortDescription, longDescription (PortableText), price, duration, maxPeople, coverImage, whatsappMessage, isActive, isFeatured |
| `tourCategory` | title, slug, icon |
| `captain` | name, photo, bio, tagline, isVisible |
| `siteSettings` | siteName, heroHeadline, heroBackgroundImage, ogImage, seoTitle, seoDescription, whatsappNumber, instagramUrl |
| `testimonial` | name, country, text, rating, photo |
| `faq` | question (LocaleString), answer (LocaleString) |
| `galleryItem` | mediaType, image, video, caption |
| `offer` | title, description, badge, validUntil, linkedTour |

---

## SEO — što je urađeno

| Faza | Status | Šta |
|------|--------|-----|
| **Faza 1** | ✅ Done | robots.txt, sitemap.xml (dynamic), lang attr, canonical, hreflang |
| **Faza 2** | ✅ Done | Tour detail stranice, generateStaticParams, generateMetadata |
| **Faza 3** | ✅ Done | JSON-LD: LocalBusiness, TouristAttraction, Person, TouristTrip, BreadcrumbList |
| **Faza 4** | ✅ Done | image u LocalBusiness schema, opengraph-image fallbacks |
| **Faza 5** | ⏳ Todo | Core Web Vitals — Lighthouse > 90 |
| **Faza 6** | ✅ Done | Vercel Analytics (`<Analytics />` u root layout) |
| **Faza 7** | ✅ Done | Google Search Console verified + sitemap submitted |

---

## Google Search Console

- **Verifikacija:** meta tag u `src/app/layout.tsx` (`metadata.verification.google`)
- **Sitemap:** https://budvaseaescape.com/sitemap.xml — poslat ✅
- **Dashboard:** https://search.google.com/search-console

---

## Vercel Analytics

- Instalirano: `@vercel/analytics`
- `<Analytics />` u `src/app/layout.tsx`
- Dashboard: vercel.com → projekat → Analytics tab

---

## Biznis podaci (hardcoded u schema.ts)

```
Ime: Budva Sea Escape
URL: https://budvaseaescape.com
Tel: +38267087728
Adresa: Slovenska Obala, Budva, 85310, ME
Koordinate: 42.2806, 18.8378
Osnovano: 2022
Rating: 5.0 / 108 recenzija
Instagram: https://www.instagram.com/budvaseaescape
```

---

## Što je ostalo (Faza 5)

### Core Web Vitals — Lighthouse audit

Pokrenuti: `npm run build && npx lighthouse https://budvaseaescape.com/en --output html`

Ciljevi:
- Performance > 90
- Accessibility > 95
- Best Practices > 90
- SEO = 100

Tipični problemi koje treba riješiti:
- Image optimization (next/image sizes, priority prop)
- Font loading (display: swap)
- Unused JavaScript (code splitting)
- LCP element optimization

---

## Git log (zadnji commiti)

```
827532a  feat(seo): add Google Search Console verification + Vercel Analytics
f7695b4  feat(seo): add branded fallback OG image for tour detail pages
bd1ce08  feat(seo): add branded fallback OG image for locale home pages
3915804  feat(seo): add image field to LocalBusiness JSON-LD schema
bb59028  feat(seo): add TouristTrip and BreadcrumbList JSON-LD to tour detail pages
4b0f002  feat(seo): add LocalBusiness and Person JSON-LD to home layout
...
```

---

## Kako nastaviti u novom chatu

Kopiraj ovo u novi chat:

```
Nastavljamo rad na Budva Sea Escape projektu.
Projekat je na C:\projekti\BudaSeaesapce
Handoff dokument je u docs/HANDOFF.md — pročitaj ga.

Sljedeće: Faza 5 — Core Web Vitals (Lighthouse > 90).
```

---

## Napomene

- `AGENTS.md` u rootu kaže: čitaj `node_modules/next/dist/docs/` prije pisanja koda — Next.js 15 ima breaking changes
- Svi `params` u App Routeru su `Promise` — uvijek `await params`
- `any` tip se koristi za Sanity responses (pattern u projektu, eslint-disable komentari)
- Subagent-driven development workflow: implementer → spec reviewer → code quality reviewer po tasku
- Plan fajlovi su u `docs/superpowers/plans/`
