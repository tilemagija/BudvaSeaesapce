# BudvaSeaEscape — Project Intelligence

## Ko sam ja (Tile)
- Vlasnik projekta, bez iskustva u kodiranju
- CEO pristup: ja definišem šta, Opus/Claude implementira kako
- Komuniciram direktno, ne volim back-and-forth
- Imam drugi aktivan projekat (miha-pozivnica) u C:\projekti\miha-pozivnica — NIKAD ne mešaj ta dva projekta

## Projekat
Premium, mobile-first, višejezični showcase sajt za biznis iznajmljivanja iskustava na moru u Budvi, Crna Gora.

**Ime brenda:** budvaseaescape
**GitHub:** github.com/tilemagija/BudvaSeaesapce
**Lokacija:** C:\projekti\BudvaSeaesapce
**WhatsApp:** +38267087728
**Instagram:** https://www.instagram.com/budvaseaescape
**Domena:** TBD (nema jos)
**Logo:** Sidro + talasi + tekst. Tirkizna + koralna. Rekreiran kao cist SVG vektor.

**Ovo NIJE rental platforma.** Prodaju se iskustva i avanture — tura, ronjenje, pecanje, sunset vožnja, žurka, privatna iskustva.

## Vizuelni Identitet

```
Primarna:  #00C2C7  (tirkizna iz logoa)
Akcent:    #FF6B4A  (koralna iz logoa — "seaescape" deo)
Tamna:     #0A1628  (duboko plava, noć na moru)
Svetla:    #F0F8FF  (pena, svetlost)
```

**Osećaj:** Adriatik, kinematografski, moderan, imerzivan, pozitivan, nezaboravan  
**NE sme biti:** generički travel sajt, previše korporativno, statično

**Fontovi:** Opus bira — treba da budu premium, čitljivi na mobilnom, moderan karakter

## Stack — Opus predlaže, Tile odobrava
- Frontend-heavy projekat
- Minimalan backend
- Headless CMS za vlasnika (ne-tehnički korisnik)
- Mobile-first, strongly responsive
- Performantan uprkos animacijama

## Jezici
- Crnogorski (primarni)
- Engleski
- Ruski

## Core UX Flow
1. Intro/entry screen — logo + Enter
2. Cinematični homepage
3. Hero sekcija
4. Vizuelno storytelling
5. Galerija po kategorijama (Ture, Ronjenje, Pecanje, Sunset, Žurka, Custom)
6. Aktivne ture — slika + opis + cena → modal sa WhatsApp CTA
7. Kontakt sekcija kao "mobilni telefon UI" sa Instagram vibeom + WhatsApp

## WhatsApp Booking
Svaki CTA vodi na WhatsApp sa pre-popunjenom porukom. Nema payment sistema u v1.

## CMS Zahtevi
Vlasnik mora sam (bez developera) da može da:
- Dodaje/menja/briše ture
- Ažurira cene
- Dodaje/menja slike galerije
- Menja ponude/akcije
- Menja neki homepage tekst

## Animacije — Da, ali pametno
- Imerzivni reveal animacije
- Layered transitions između sekcija
- Parallax
- Premium slider interakcije
- 3D card movement
- Animovani modali
- **Pravilo:** vizuelno bogato ALI performance-conscious

## Out of Scope za v1
- Booking engine
- Payment sistem
- Korisnički nalozi
- Dashboard za kupce

## Pravila Koda
- NIKAD ne mešati sa miha-pozivnica projektom
- Sve izmene commitovati sa jasnim porukama
- npm run build mora proći pre svakog pusha
- Mobile-first uvek — najpre telefon, pa desktop
