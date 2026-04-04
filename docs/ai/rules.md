# Rules — BudvaSeaEscape

Ova pravila su OBAVEZNA. Opus ih čita pre svakog zadatka.

## Nepromenjivo

1. **Nikad ne diraj miha-pozivnica projekat.** Dva odvojena foldera, dva odvojena Cursor prozora.
2. **Mobile-first uvek.** Svaka komponenta se najpre dizajnira za 375px, pa se skalira gore.
3. **WhatsApp je jedini booking kanal u v1.** Nema forme koja prima plaćanje.
4. **Tri jezika su obavezna.** Crnogorski, engleski, ruski — svaki string mora biti u i18n sistemu.
5. **Vizuelni identitet je locked.** Tirkizna #00C2C7, koralna #FF6B4A, tamna #0A1628.

## Workflow Pravila

6. **Plan prvo za zadatke koji diraju 3+ fajla.** Napiši koji fajlovi se menjaju, čekaj Tile odobrenje.
7. **npm run build pre svakog pusha.** Ako build pada, ne pushuješ.
8. **Jedan zadatak = jedan commit** sa jasnom porukom na srpskom ili engleskom.
9. **Ne instaliraj npm pakete bez pitanja.** Svaki novi paket = nova zavisnost = potencijalni problem.
10. **Animacije ne smeju da blokiraju LCP.** Lazy load, will-change, prefers-reduced-motion obavezni.

## Kvalitet

11. **Svaka stranica prolazi Lighthouse mobile test** — cilj 90+ performance.
12. **Slike su obavezno optimizovane** — WebP format, lazy loading, responsive srcset.
13. **CMS sadržaj nikad nije hardkodovan** — sve ture, cene, slike idu kroz CMS.
14. **WhatsApp linkovi imaju pre-popunjenu poruku** specifičnu za svaku turu.
15. **Greške se rešavaju odmah** — ne ostavljaj TODO komentare za "posle".
