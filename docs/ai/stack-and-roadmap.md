# BudvaSeaEscape — Stack Decision & Batch Roadmap

**Datum:** 2026-04-03
**Autor:** Opus (za odobrenje od Tile-a)
**Status:** PREDLOG — ceka odobrenje

---

## 1. STACK DECISION

### ChatGPT predlaze: Next.js + Sanity + Framer Motion + GSAP

**Moja ocena: 90% se slazem. Jedna izmena.**

---

### Frontend: Next.js 15 (App Router) + TypeScript

**SLAZEM SE.** Nema boljeg izbora za ovaj projekat.

- SSG za landing stranice = brzina od prvog bajta
- ISR (Incremental Static Regeneration) = kad Nemanja promeni turu u CMS-u, sajt se osvezi za ~60s bez rebuilda
- Next/Image = automatska optimizacija slika (WebP, responsive, lazy load) — direktno resava L002
- App Router ima native layout system = intro screen, hero, sekcije kao nested layouts
- Vercel deploy = zero-config, preview za svaki branch
- AI-friendly: Claude/Sonnet pisu odlican Next.js kod

**Zasto NE Astro/Remix/Nuxt:**
- Astro: odlican za staticke sajtove, ali slabiji za interaktivne animacije i CMS preview
- Remix: previse backend-focused za showcase sajt
- Nuxt (Vue): manji AI ecosystem, manje komponenti, manji talent pool

---

### Styling: Tailwind CSS v4

**OBAVEZNO.** Direktno resava L001 (inline styles haos iz miha-pozivnica).

- Design tokens od prvog dana u tailwind.config:
  ```
  tirkizna:  #00C2C7
  koralna:   #FF6B4A
  tamna:     #0A1628
  svetla:    #F0F8FF
  ```
- Mobile-first responsive utilities (rules.md #2: 375px prvo)
- Konzistentan spacing i typography scale
- Nema nikad inline style objekata

---

### Animacije: Framer Motion (primarno)

**DELIMICNO SE NE SLAZEM SA CHATGPT.** Ne treba GSAP od starta.

**Framer Motion pokriva 90% potreba:**
- Scroll-triggered reveal animacije
- Layout transitions (modal open/close)
- Gesture support (drag, swipe za gallery)
- AnimatePresence za page/section transitions
- `whileInView` za parallax efekte
- `useScroll` + `useTransform` za scroll-linked motion

**GSAP dodati SAMO ako:**
- Framer Motion ne moze da postigne specifican timeline efekat
- Treba complex staggered sequence koji FM ne radi glatko
- To se evaluira u Batch 7 (Animation Layer), NE ranije

**Zasto ovaj pristup:**
- Manji bundle = brzi sajt na mobilnom
- Jedna manje zavisnost = manje moze da pukne (rules.md #9)
- FM je deklarativan (React-native pristup) = AI ga bolje pise
- GSAP je imperativan = tezi za odrzavanje, vise bug surface

**Lenis za smooth scroll:** DA, ali se testira u Batch 2. Ako kvari mobile performance — brise se bez milosti.

---

### CMS: Sanity v3

**SLAZEM SE.** Najbolji izbor za ovaj use-case.

**Zasto Sanity a ne alternative:**

| Kriterijum | Sanity | Strapi | Contentful | Notion |
|---|---|---|---|---|
| UI za ne-developera | Odlican (customizable) | Srednji | Dobar | Odlican ali limitiran |
| Image pipeline | Vrhunski (auto-crop, WebP, hotspot) | Osnovni | Dobar | Los |
| Free tier | 100K req/mo, 10GB | Self-host = treba server | 25K records | Free ali nije CMS |
| i18n podrska | Native document-level | Plugin | Native | Nema |
| Next.js integracija | First-class | Dobra | Dobra | Hacky |
| AI pise schemas | Odlicno | OK | OK | N/A |
| Deploy | Moze kao /admin ruta u Next.js | Odvojen server | Cloud only | N/A |

**Kljucni win:** Sanity Studio se deploya kao ruta unutar Next.js app-a (`/admin`). Nemanja ide na sajt.com/admin, loguje se, menja ture. Nema odvojenog servisa.

**Rizik koji resavamo:** Studio UI mora biti MAKSIMALNO pojednostavljen. Nemanja vidi samo:
- Lista tura (dodaj/izmeni/obrisi)
- Galerija (upload/sortiraj/kategorisi)
- Ponude/akcije
- Osnovni tekstovi

Nista vise. Nema advanced features, nema custom plugins koji zbunjuju.

---

### i18n: next-intl

**Najbolji i18n za App Router.**

- URL routing: `/me/ture`, `/en/tours`, `/ru/tours`
- Per-field prevodi u CMS-u (NE automatski prevod)
- SEO hreflang tagovi automatski
- Type-safe message keys
- Middleware za locale detection

---

### Hosting: Vercel

**Zero-config za Next.js.** Ukljucuje:
- Edge CDN globalno
- Image optimization
- Preview deployments (svaki PR ima svoj URL)
- Vercel Analytics (basic)
- Automatski HTTPS

---

### Kompletna lista paketa (planirano)

```
# Core
next
react
react-dom
typescript

# Styling
tailwindcss
@tailwindcss/typography (za CMS rich text)

# Animation
framer-motion
lenis (testira se, moze da ode)

# CMS
sanity (v3)
@sanity/image-url
@sanity/vision (dev only - GROQ playground)
next-sanity

# i18n
next-intl

# Utils
clsx (conditional classnames)
```

**Napomena (rules.md #9):** Svaki novi paket van ove liste zahteva eksplicitno Tile odobrenje.

---

## 2. BATCH ROADMAP — 7 DAY SPRINT

**DEADLINE: Petak 10. april 2026.** Tile se viđa sa Nemanjom — sajt mora biti spreman kao poklon.
**Kontekst:** Ovo je poklon za Nemanju. Ne možemo ga pitati za sadržaj (iznenađenje). Sve ture, slike, testimonials = Nemanja unosi SAM posle kroz CMS. Za sada: demo sadržaj + placeholder slike.

### Principi sprinta
- Jedan batch = jedan dan = jedna AI sesija = zavrsena celina
- Demo sadrzaj je OK — Nemanja popunjava pravi sadrzaj posle
- Ruski prevod: AI-generisan za v1 (menja se posle)
- Vibe: **adventure / experience / love of life / freedom**
- Placeholderi olaksavaju — fokus na strukturu i osecaj, ne na sadrzaj
- **Tezina:** S/M/L/XL (velicina AI sesije)
  - S = jednostavna komponenta, 1 fajl
  - M = 2-3 fajla, jasna logika
  - L = kompleksna integracija, 5+ fajlova
  - XL = arhitektura, veliki sistem

---

### BATCH 0 — Foundation + CMS (Petak, 3. april)
**Tezina: L** | Skeleton + Sanity setup + svi schemas + logo SVG (~15-18 fajlova)

**Cilj:** Projekat postoji, builda se, CMS radi, Nemanja moze da unese turu.

**Gradi se:**
- `npx create-next-app` sa App Router + TypeScript
- Tailwind config sa locked bojama (#00C2C7, #FF6B4A, #0A1628, #F0F8FF)
- next-intl setup sa 3 locale-a (me/en/ru)
- Folder struktura: `app/[locale]/`, `components/`, `lib/`, `sanity/`
- Layout wrapper sa font loading
- Logo rekreiran u cist SVG vektor (sidro + talasi + tekst)
- Sanity project init (embedded studio na `/admin`)
- Svi schemas: Tour, GalleryItem, SiteSettings, Captain, Testimonial, FAQ, Offer, TourCategory, GalleryCategory
- GROQ queries za svaki content type
- Sanity client config
- Studio UI pojednostavljen za Nemanju (custom desk structure)
- 2-3 demo ture unete u CMS
- Git push na postojeci github repo
- Vercel deploy (prazan sajt ali LIVE na .vercel.app)

**NE gradi se:**
- Frontend sekcije (nista vizuelno osim praznog layouta)
- Animacije
- Pravi sadrzaj

**Gotovo kad:**
- `npm run build` prolazi
- `/admin` prikazuje Sanity Studio
- Demo tura se moze kreirati/editovati u CMS-u
- GROQ query vraca ture u Next.js konzoli
- Vercel deploy radi
- `/me`, `/en`, `/ru` rute postoje
- Logo renderuje korektno

---

### BATCH 1 — Intro + Hero + Layout (Subota, 4. april)
**Tezina: L** | Intro screen + Hero + Nav + Footer + CMS connected (~8-10 fajlova)

**Cilj:** Posetilac vidi prvi WOW ekran i hero. Mobile-first.

**Gradi se:**
- Intro/Enter screen: logo + tamna pozadina + "Sea Escape starts here" + Enter dugme
- Language picker na intro screenu
- Hero sekcija: full-screen, headline iz CMS-a (SiteSettings), 2 CTA dugmeta
- Nav: logo + language switcher + WhatsApp CTA dugme
- Footer: logo + Instagram + WhatsApp + copyright
- Mobile sticky "Book Now" bar (vidljiv na celom sajtu)
- Page transition izmedju intro i main (AnimatePresence, basic fade)
- Responsive: 375px → 1440px
- Demo hero tekst u CMS-u (me/en/ru — ruski AI-generisan)

**NE gradi se:**
- Tours sekcija (Batch 2)
- Gallery (Batch 3)
- Premium animacije (Batch 5)
- Video hero (placeholder slika je OK)

**Gotovo kad:**
- Intro screen izgleda premium na mobilnom
- Enter vodi na hero
- Hero prikazuje headline iz CMS-a
- Nav i footer rade
- Sticky Book Now bar vidljiv na mobilnom
- WhatsApp link otvara chat sa +38267087728
- Sve na 3 jezika (ruski = AI prevod)

---

### BATCH 2 — Tours System (Nedelja, 5. april)
**Tezina: L** | Tour cards + Modal + WhatsApp flow + CMS data (~7-8 fajlova)

**Cilj:** Ture se prikazuju iz CMS-a, modal radi, WhatsApp booking funkcionise.

**Gradi se:**
- Tours sekcija: kartice sa cover slikom, nazivom, cenom, kratkim opisom, kategorijom
- Tour modal (large popup): hero slika, pun opis, sta je ukljuceno, trajanje, cena, WhatsApp CTA
- WhatsApp deep link sa pre-popunjenom porukom po turi i jeziku
- Category filter tabs (ako ima vise kategorija)
- ISR: revalidate: 60 (promena u CMS-u vidljiva za ~1min)
- Responsive: mobile stack → desktop grid (2-3 kolone)
- Empty state: "Coming soon" kad nema tura
- 2-3 demo ture sa placeholder slikama u CMS-u

**NE gradi se:**
- Gallery (Batch 3)
- Kontakt sekcija (Batch 3)
- Premium animacije na karticama (Batch 5)

**Gotovo kad:**
- Demo ture se prikazuju iz CMS-a
- Klik otvara modal sa svim detaljima
- WhatsApp link otvara chat sa porukom "Hi! I'm interested in [Tour Name]..."
- Nemanja moze da doda/sakrije turu iz CMS-a i sajt se azurira
- Empty state radi kad nema tura
- Mobile layout je cist i klikabilan

---

### BATCH 3 — Gallery + Contact + Extra Sections (Ponedeljak, 6. april)
**Tezina: XL** | Gallery + Lightbox + Contact + FAQ + Testimonials + Why us (~12-15 fajlova)

**Cilj:** Sve sekcije postoje. Kompletna stranica je scrollable.

**Gradi se:**
- Gallery sekcija: category tabs + image grid iz CMS-a
- Lightbox viewer (fullscreen, swipe na mobilnom)
- Kontakt sekcija: phone mockup vibe + WhatsApp CTA + Instagram link
- FAQ sekcija: accordion, sadrzaj iz CMS-a
- Testimonials sekcija: kartice, sadrzaj iz CMS-a
- **"Meet the Captain"** sekcija: Nemanjina slika + bio iz CMS-a (Captain singleton)
- "Why Choose Us" sekcija: 4-5 ikonica sa tekstom (Local captain, Private experience, Flexible, Music & vibes, Small boat)
- Quick info strip
- Nav linkovi: smooth scroll do svake sekcije
- Demo sadrzaj za sve sekcije u CMS-u (FAQ, testimonials — AI generisan)
- Empty states za sve sekcije (prikazuju "content coming soon" ako CMS prazan)

**NE gradi se:**
- Premium animacije (Batch 5)
- Offers/akcije (v2)
- Mapa
- Blog

**Gotovo kad:**
- Kompletna stranica radi od intro do footer
- Svaka sekcija renderuje CMS sadrzaj
- FAQ accordion radi
- Gallery lightbox radi na mobilnom
- Nav scroll radi
- Svi WhatsApp i Instagram linkovi rade
- Nema slomljenih layouta

---

### BATCH 4 — i18n + Russian Translation (Utorak, 7. april)
**Tezina: M** | Translation fajlovi + CMS prevodi + switcher (~5-7 fajlova)

**Cilj:** Sva 3 jezika rade kompletno. Sajt je upotrebljiv za ruske turiste.

**Gradi se:**
- Svi UI stringovi kroz next-intl (dugmad, labele, nav, footer, CTA, empty states)
- AI-generisani ruski prevodi za sve UI stringove
- AI-generisani ruski prevodi za demo CMS sadrzaj
- CMS demo sadrzaj komplet na sva 3 jezika (me/en/ru)
- Language switcher finalni dizajn (flags ili text dropdown)
- URL routing: `/me/`, `/en/`, `/ru/`
- hreflang meta tagovi
- Fallback: ru → en → me (ako prevod ne postoji)
- Provera: svaka sekcija na svakom jeziku

**NE gradi se:**
- Rucno provereni prevodi (posle)
- Locale auto-detection
- Novi jezici

**Gotovo kad:**
- Menjanje jezika radi na celom sajtu
- Svi stringovi su prevedeni (nema "untranslated")
- URL se menja korektno
- CMS demo sadrzaj postoji na sva 3 jezika
- Switcher UX je jasan i brz

---

### BATCH 5 — Animation Layer + Polish (Sreda, 8. april)
**Tezina: XL** | Motion na svim komponentama + visual polish (~15+ fajlova)

**Cilj:** Sajt prelazi iz "radi" u "ovo je pokidano". Poklon-ready vizuelni osecaj.

**3-test za svaku animaciju:**
1. Poboljsava emociju? (adventure / freedom / wow)
2. Pomaze sadrzaju? (fokus na pravu stvar)
3. Dobra na telefonu? (60fps, nema jank)

**Gradi se:**
- Intro screen: immersive reveal (logo fade-in, text slide, enter pulse)
- Hero: subtle ken-burns na pozadini ili parallax
- Scroll reveal: svaka sekcija fade-in + slide-up pri skrolanju (staggered)
- Tour cards: hover lift + shadow (desktop), tap feedback (mobile)
- Tour modal: smooth scale-in + backdrop blur
- Gallery: fluid tab transitions, image hover zoom
- Section transitions: layered cinematic feel
- CTA dugmad: subtle glow na hover
- Text reveal: staggered word animation za headline-ove
- `prefers-reduced-motion` respect
- Vizuelni polish: gradient overlays, blur panels, spacing adjustments
- Lenis smooth scroll — dodati AKO radi na mobilnom, inace NE

**NE gradi se:**
- WebGL / Three.js
- GSAP (osim ako FM ne moze nesto konkretno)
- Autoplay audio/video
- Animacije > 800ms

**Gotovo kad:**
- Svaki efekat prolazi 3-test
- Sajt "dise" — nije statican ali nije cirkus
- Mobile performance ostaje iznad 80 Lighthouse
- prefers-reduced-motion radi
- Tile kaze "ovo je to"

---

### BATCH 6 — SEO + QA + Final Deploy (Cetvrtak, 9. april)
**Tezina: L** | Performance, SEO, testiranje, finalni deploy (~8-10 fajlova + testing)

**Cilj:** Production-ready. Spreman za petak.

**Gradi se:**
- Lighthouse audit + fix: cilj 85+ mobile performance (sa animacijama)
- Image optimization audit (Sanity CDN, WebP, lazy)
- Metadata per language (title, description)
- Open Graph tagovi (za WhatsApp/Instagram share preview)
- Favicon set (logo-based)
- robots.txt + sitemap.xml
- 404 stranica (branded, sa CTA)
- Error boundaries za CMS content
- Loading states / skeletoni
- Cross-device test: iPhone, Android, tablet, desktop
- Cross-browser: Chrome, Safari, Firefox
- WhatsApp link test na realnom telefonu
- CMS workflow test: dodaj turu → pojavi se na sajtu
- Final Vercel deploy

**NE gradi se:**
- Analytics (v2)
- A/B testing
- Custom domena (nema je jos)
- Nista novo — samo polish i provera

**Gotovo kad:**
- Lighthouse mobile > 85 performance, > 90 SEO
- OG preview radi (WhatsApp share izgleda dobro)
- Nema console errors
- Radi na iPhone i Android
- WhatsApp linkovi rade na realnom telefonu
- CMS workflow radi end-to-end
- Build < 300KB first load JS
- **SPREMAN ZA POKLON** 🎁

---

### PETAK 10. APRIL — Presentation Day
**Buffer dan.** Samo bug fixes ako treba. Nista novo.
Tile daje Nemanji link + pristup CMS-u.

---

### SPRINT SUMMARY

| Dan | Batch | Tezina | Sta se gradi |
|-----|-------|--------|-------------|
| Pet 3. apr | 0: Foundation + CMS | **L** | Skeleton + Sanity + schemas + logo |
| Sub 4. apr | 1: Intro + Hero | **L** | Enter screen + hero + nav + footer |
| Ned 5. apr | 2: Tours System | **L** | Tour cards + modal + WhatsApp |
| Pon 6. apr | 3: Gallery + Extra | **XL** | Gallery + contact + FAQ + testimonials |
| Uto 7. apr | 4: i18n Complete | **M** | 3 jezika + AI ruski prevod |
| Sre 8. apr | 5: Animation + Polish | **XL** | Premium motion + vizuelni polish |
| Cet 9. apr | 6: SEO + QA + Deploy | **L** | Performance + testiranje + final deploy |
| **Pet 10.** | **POKLON** 🎁 | — | Bug fixes only. Nemanja dobija sajt. |

**Token budget:**
- 2x **M** sesije = ~100-160K tokena
- 3x **L** sesije = ~300-450K tokena
- 2x **XL** sesije = ~300-400K+ tokena
- **Ukupno: ~700K-1M output tokena za ceo sprint**

---

## 3. CMS CONTENT MODEL (Sanity Schemas)

### 3.1 Tour (document)

```
tour {
  title:              localeString (me/en/ru)     // OBAVEZNO
  slug:               slug (auto iz en title)     // OBAVEZNO
  shortDescription:   localeText (me/en/ru)       // OBAVEZNO, max 160 chars
  longDescription:    localeBlockContent (me/en/ru) // rich text
  price:              number                       // u EUR
  priceNote:          localeString                 // npr "po osobi" / "per person"
  duration:           string                       // npr "3h", "Full day"
  maxPeople:          number
  category:           reference → TourCategory
  coverImage:         image (sa hotspot/crop)      // OBAVEZNO
  galleryImages:      array of image
  includedItems:      localeArray of string        // "Fuel, snorkeling gear..."
  notIncluded:        localeArray of string        // "Food, drinks..."
  whatToBring:        localeArray of string
  whatsappMessage:    localeString                 // pre-filled msg per language
  isActive:           boolean (default true)
  isFeatured:         boolean (default false)
  order:              number                       // sort order
}
```

### 3.2 TourCategory (document)

```
tourCategory {
  title:    localeString (me/en/ru)
  slug:     slug
  icon:     string (emoji ili icon name)
  order:    number
}
```

Predefinisane: Ture, Ronjenje, Pecanje, Sunset, Zurka, Custom/Privatno

### 3.3 GalleryItem (document)

```
galleryItem {
  image:      image (sa hotspot/crop)     // OBAVEZNO
  category:   reference → GalleryCategory
  caption:    localeString
  order:      number
  isActive:   boolean (default true)
}
```

### 3.4 GalleryCategory (document)

```
galleryCategory {
  title:    localeString (me/en/ru)
  slug:     slug
  order:    number
}
```

### 3.5 Offer (document)

```
offer {
  title:        localeString (me/en/ru)
  description:  localeText
  badge:        localeString              // npr "20% OFF", "-20%"
  validUntil:   date
  linkedTour:   reference → Tour (optional)
  isActive:     boolean
}
```

### 3.6 Testimonial (document)

```
testimonial {
  name:       string                      // OBAVEZNO
  country:    string
  text:       localeText (me/en/ru)       // OBAVEZNO
  rating:     number (1-5)
  photo:      image (optional)
  isActive:   boolean (default true)
  order:      number
}
```

### 3.7 FAQ (document)

```
faq {
  question:   localeString (me/en/ru)     // OBAVEZNO
  answer:     localeText (me/en/ru)       // OBAVEZNO
  order:      number
  isActive:   boolean (default true)
}
```

### 3.8 Captain (singleton document)

```
captain {
  name:           string                       // "Nemanja"
  photo:          image (sa hotspot/crop)       // placeholder low-res za sada
  bio:            localeBlockContent (me/en/ru) // rich text o Nemanji
  tagline:        localeString                  // npr "Your captain, your guide"
  isVisible:      boolean (default true)
}
```

### 3.9 SiteSettings (singleton document)

```
siteSettings {
  // Branding
  logo:               image
  siteName:           string
  tagline:            localeString

  // Contact
  whatsappNumber:     string              // sa country code
  instagramUrl:       string
  instagramHandle:    string
  email:              string (optional)

  // Hero
  heroHeadline:       localeString
  heroSubheadline:    localeString
  heroCtaText:        localeString
  heroBackgroundImage: image
  heroBackgroundVideo: file (optional, mp4)

  // Intro Screen
  introText:          localeString
  introCtaText:       localeString        // "Enter" / "Ulaz"

  // SEO defaults
  seoTitle:           localeString
  seoDescription:     localeString
  ogImage:            image

  // Footer
  footerText:         localeString
  copyrightText:      string
}
```

### Lokalizacija — How it works

`localeString` je custom type:
```typescript
{
  me: string   // Crnogorski
  en: string   // English
  ru: string   // Русский
}
```

U Sanity Studio-u ovo se prikazuje kao tabovi: ME | EN | RU
Nemanja unosi tekst po jeziku. Ako ne unese RU, fallback je EN. Ako nema ni EN, fallback je ME.

---

## 4. ODGOVORENA PITANJA

1. ✅ **Logo** — Postoji, raster-in-SVG 208KB. Rekreiramo kao vektor.
2. ✅ **Domena** — Nema jos. Vercel .vercel.app za sada.
3. ✅ **WhatsApp** — +38267087728
4. ✅ **Instagram** — https://www.instagram.com/budvaseaescape (@budvaseaescape)
5. ✅ **Sadrzaj (ture, slike, testimonials)** — Nemanja dodaje SAM kroz CMS. Demo sadrzaj za poklon.
6. ✅ **Ruski prevod** — AI-generisan za v1, menja se posle.
7. ✅ **Vibe** — Adventure, experience, love of life, freedom.
8. ✅ **Reference sajtovi** — Nema. Opus dizajnira po vibu.
9. ✅ **GitHub** — Postojeci repo github.com/tilemagija/BudvaSeaesapce
10. ✅ **Vercel** — Ima nalog (koristi za miha-pozivnica)
11. ✅ **Nemanja slika** — Ima (niska rezolucija, CMS zamenjivo). Sekcija "O kapetanu" dodana.
12. ⏳ **Sanity account** — Tile kreira ili Opus pomaze u Batch 0

---

## 5. LESSONS INTEGRATION

Kako ovaj plan konkretno resava svaku lekciju:

| Lekcija | Problem | Resenje u ovom planu |
|---------|---------|---------------------|
| L001 | Inline styles haos | Tailwind + design tokens od Batch 0. Nula inline styles. |
| L002 | Placeholder slike u produkciji | CMS slike JEDINI izvor. Batch 9 checklist: "0 placeholder images". |
| L003 | Forma koja nista ne salje | WhatsApp deep links UVEK rade. Nema forme koja simulira funkcionalnost. |
| L004 | Prevelike komponente | Pravilo: komponenta > 200 linija = split. Enforced od Batch 2. |
| L005 | Research za poznate stacke | Next.js, Sanity, Tailwind, FM — sve poznato. Nema research agenata. |
