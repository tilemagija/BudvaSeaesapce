# Batch 4 — Mobile, Hero CMS, WOW Animacije

**Deadline:** Petak 10. April
**Stack:** Next.js 15 + Framer Motion + Tailwind — NE GSAP jos

---

## Zadaci (redom prioriteta)

### 1. Hero slika iz Sanity CMS
- `HeroSection.tsx` treba da fetchuje `siteSettingsQuery` (vec postoji u `queries.ts`)
- Field: `heroBackgroundImage` — ako postoji u Sanity, koristi ga; fallback = Unsplash placeholder
- `urlFor(heroBackgroundImage).width(1920).url()`
- Nemanja uploaduje kroz `/admin → Site Settings → heroBackgroundImage`

### 2. Mobile hamburger meni
- `Nav.tsx` — dodati hamburger dugme (tri linije → X pri otvaranju)
- Slide-down ili full-screen overlay meni na mobilnom
- Linkovi: Tours · Gallery · About · Contact + Language switcher + Book Now CTA
- Zatvoriti meni na klik linka (scroll to anchor)
- Animacija: Framer Motion `AnimatePresence` + `motion.div`

### 3. Responsivni audit — sve velicine
Provjeriti na:
- 375px (iPhone SE) — najmanji target
- 390px (iPhone 14)
- 768px (iPad)
- 1024px (laptop mali)
- 1440px (sestra, 17")
- 1920px (standard)
- 2560px (Tile, 28" desktop)

Poznati problemi koje treba provjeriti:
- Hero tekst overflow na malim ekranima
- Tours carousel card width
- Gallery columns (2 → 3 → 4)
- Captain 2-col → 1-col na mobilnom (vec ima `flex-col md:flex-row`)
- Contact: phone + WA button layout na mobilnom (stack vertically)
- Footer spacing

### 4. WOW Animacije — Framer Motion whileInView

#### Globalni pattern (koristiti svuda):
```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-80px' }}
  transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
>
```

#### Per-sekcija plan:

**Hero (load animacija — ne whileInView):**
- Background image: `scale: 1.08 → 1.0` tokom 2s (`motion.div` wrapper)
- Eyebrow tekst: fade in delay 0.2s
- Headline: stagger po rijecima — splitovati na `<span>` per rijec, svaka ima `y: 30 → 0` + `opacity: 0 → 1` sa `delay: i * 0.08`
- Subheadline: fade in delay 0.7s
- CTA dugmaci: slide up delay 1.0s
- Scroll indicator: `animate={{ y: [0, 8, 0] }}` infinite pulse

**Tours sekcija:**
- Header (eyebrow + h2 + subtitle): `y: 40 → 0` whileInView, stagger 0.15s izmedju
- Carousel: `x: 60 → 0` + `opacity: 0 → 1` whileInView

**Gallery:**
- Header: standardni `y: 40 → 0` whileInView
- Grid items: stagger po indexu, svaki `opacity: 0 → 1` + `scale: 0.95 → 1`, delay `i * 0.05` (capped na 0.4s max)

**Captain sekcija:**
- Eyebrow/label: fade in
- Slika: `x: -60 → 0` + `opacity: 0 → 1` (slide from left)
- Tekst blok: `x: 60 → 0` + `opacity: 0 → 1` (slide from right)
- Koralna linija (div): `scaleX: 0 → 1`, `transformOrigin: left`

**Contact sekcija:**
- Header: standardni
- Phone mockup: `y: 60 → 0` + `opacity: 0 → 1`, delay 0.2s
- Shimmer tekst: `opacity: 0 → 1` delay 0.4s (shimmer CSS vec postoji)
- WA button: `scale: 0.7 → 1` + `opacity: 0 → 1` delay 0.6s, spring transition

#### Lenis smooth scroll:
- Instalirati: `npm install @studio-freight/lenis`
- Wrapper u `[locale]/layout.tsx` kao client component
- Napomena: testovati na mobilnom — ako pravi probleme, skinuti

---

## Savjeti za "Figma master" efekat

1. **Ease curve** — ne koristiti `ease: 'easeOut'` vec custom cubic: `[0.25, 0.1, 0.25, 1]` ili `[0.16, 1, 0.3, 1]` (expo out) — ovo je razlika izmedju loseg i premium fejla

2. **viewport: once: true** — animacija se odradi jednom, ne ponavlja pri scrollu nazad

3. **Stagger cap** — kad ima mnogo elemenata (gallery grid), max delay `i * 0.05` ali capped: `Math.min(i * 0.05, 0.4)` — inak cekanje postaje dosadno

4. **Hero headline word split** — NE animirati cijeli h1 odjednom. Splitovati na rijeci. Psihološki efekat je drasticno drugaciji.

5. **Scale na hover** — vec implementirano na TourCard. Dodati isti princip na WA button u Contactu.

6. **Koralna linija scaleX** — kratki detalji kao sto je `div h-[2px] scaleX: 0→1` izgledaju kao da je designer razmisljao o svakom pikselu.

7. **Lenis** — smooth scroll je mozda najbrzi "wow" koji korisnik osjeti, cak i bez znanja zasto.

8. **Ne pretjerivati** — max 2 animacije per sekcija. Ako sve leti, nista ne izgleda posebno.

---

## Fajlovi koje treba mijenjati

| Fajl | Promjena |
|------|----------|
| `src/components/HeroSection.tsx` | fetch siteSettings za heroImage + hero animacije |
| `src/components/Nav.tsx` | hamburger meni |
| `src/app/[locale]/layout.tsx` | Lenis wrapper (optional) |
| `src/components/tours/ToursSection.tsx` | whileInView animacije |
| `src/components/gallery/GallerySection.tsx` | whileInView |
| `src/components/gallery/GalleryGrid.tsx` | stagger animacije |
| `src/components/CaptainSection.tsx` | split entrance animacija |
| `src/components/ContactSection.tsx` | staggered entrance |

---

## Sto NE radimo u Batch 4
- Testimonials (izbaceno)
- FAQ (izbaceno)
- GSAP (Batch 7 evaluacija)
- SEO/meta → Batch 5 (zadnji batch)
