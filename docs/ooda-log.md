# OODA log: premium branding & iterative improvement

Each cycle: **Observe** (measure) → **Orient** (compare with the research in `docs/research-*.md`) → **Decide** (highest impact first) → **Act** (change, then re-measure).
Measurements: Lighthouse 12 (mobile = simulated slow 4G + 4× CPU; desktop preset), axe rules via Lighthouse, and a rendered-page audit of the brand rules. Final numbers are taken behind a gzip server, matching GitHub Pages compression.

## Starting point (after the device-specialised redesign)
| | Mobile perf | Mobile a11y | Desktop perf | Red accents / page | Hype words |
|---|---|---|---|---|---|
| Home, ceramic, hangar | 74–79 | 96 | 95–98 | 15–52 | 2 |

Findings: the logo was the mobile LCP element; the brand red (#E43224) failed contrast with white text (4.4:1); faint labels on light sections failed contrast; red appeared on bullets, labels and numbers (against the quiet-signal research: Han et al. 2010; Berger & Ward 2010); tint grades were labelled Good/Better/Best.

## Cycle 1 — restraint and contrast
- **Orient:** the most valuable clients respond to restraint; luxury buyers expect effortlessness (follow-through research).
- **Act:** button red deepened to #D02A1D (5.2:1), still the logo's hue; red kept only for actions and selected states; bullets, labels and step numbers moved to neutrals; tint grades renamed Dyed / Carbon / Nano-ceramic; above-the-fold photographs preloaded.

## Cycle 2 — what really paints first
- **Observe:** the hero headline faded in from zero opacity, so the browser ignored it as the main content and reported the logo instead.
- **Act:** removed the fade (the reflection band is the page’s single designed motion); the headline became the LCP element. Font moved to `next/font/local`, which preloads it with the document and respects the GitHub Pages base path. Remaining contrast and heading-order issues fixed.

## Cycle 3 — the font
- **Observe:** the headline waited on a 90 KB variable font.
- **Act:** subset to the characters the site uses, keeping both the weight and width axes: 90 KB → 48 KB.

## Cycle 4 — generated art on phones
- **Observe:** complex SVG backgrounds cost ~0.8 s of main-thread rendering on the ceramic page (TBT 240–310 ms).
- **Act:** the art generator now also exports a WebP twin of each piece (6–59 KB) for backgrounds; the SVG stays as the reproducible master. Ceramic TBT fell to 90 ms; mobile page weight roughly halved.

## Result (gzip, as served by GitHub Pages)
| Page | Mobile perf / a11y / best / SEO | Mobile LCP | Desktop perf / a11y / best / SEO |
|---|---|---|---|
| Home | 90 / 100 / 100 / 100 | 3.4 s | 100 / 100 / 100 / 100 |
| Ceramic coating | 90 / 100 / 100 / 100 | 3.6 s | 100 / 100 / 100 / 100 |
| Window tinting | 92 / 100 / 100 / 100 | 3.4 s | 100 / 100 / 100 / 100 |
| At the Hangar | 92 / 100 / 100 / 100 | 3.4 s | 100 / 100 / 100 / 100 |
| Care Atlas | 95 / 100 / 100 / 100 | 2.9 s | 100 / 100 / 100 / 100 |
| Contact | 99 / 100 / 100 / 100 | 2.0 s | 100 / 100 / 100 / 100 |

Brand rules after the cycles: red accents 2–4 per page (logo and actions only), no hype words, no paragraph over ~85 characters per line on phones, every generated image labelled.

## Next cycle (not yet done)
- Mobile LCP is 2.9–3.6 s on simulated slow 4G (Google’s “good” is ≤ 2.5 s). Next levers: inline critical CSS, and a smaller first hero image for phones.
- Field data: once live on the real domain, watch Core Web Vitals in Search Console and quote starts per page, and A/B test house-name-first vs plain-first headings.
