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

## Cycle 5 — mobile LCP, tested one lever at a time
| Experiment | Result | Kept? |
|---|---|---|
| Inline all CSS into each page (`experimental.inlineCss`) | Home LCP 3.5 s → 3.5 s; heavier HTML | No: evidence said CSS was not the bottleneck |
| Lazy-load decorative art (CTA gloss, footer contours, comparison panels), low priority for hero art | Ceramic 3.6 → 3.1–3.2 s; Hangar 3.4 → 2.6–3.4 s | Yes |
| Limit the font's variable axes to the ranges used (weight 400–700, width 100–118%) | Font 48 KB → 28.6 KB; Care Atlas 2.9 → 2.7 s | Yes |

**Orient:** the home headline renders 134 ms after the response in the real trace, and Speed Index (when the page *looks* complete) is 0.9 s. The lab's 3.4 s LCP comes from its simulation charging the Next.js runtime's script evaluation (4× CPU slowdown) to the headline. Further gains would mean shipping less framework JavaScript, a larger change than this cycle warrants.

## Cycle 6 — text and layout
- **Observe:** 54 British spellings on an American (Oklahoma) site — “colour”, “tyre”, “fibreglass”, “walk-round” and more — read as typos; 4 headings/ledes ended in a single word on phones; sections used 10 different spacings; two sentences over 30 words.
- **Act:** American spelling throughout (content, alt text, docs) with a regression test; `text-wrap: pretty` for body text; a two-value section rhythm (`--space-section`, `--space-tight`, fluid); the two long sentences split; footer label/link and breadcrumb alignment fixed.
- **Result:** 0 British spellings, 0 single-word last lines in headings and ledes, sections on two shared spacings, no overflow on any of 20 pages; Lighthouse unchanged or better (mobile 92–96 performance, 100 accessibility, best practices and SEO; desktop 100 across the board).

## Cycle 7 — text layout (Badge & Manual) and one more LCP test
**Observe** (rendered pages, phone and desktop):
| Measure | Before | After |
|---|---|---|
| Distinct font sizes per page | 10–15 | 6–8 |
| Font weights | 400, 500, 520, 600, 700 | 400, 500, 520–540 (display), 600 |
| Text nodes under 15 px | 32–133 per page | 0 (home, services, settings) |
| Faded (semi-transparent) text nodes | 17–42 per page | 0 |
| Labels stacked above headings | up to 7 per page | 0 |

**Orient:** the subject has two voices — the *badge* on the car and the *owner’s manual* in the glovebox. Names get the badge (Archivo wide); everything else is the manual: normal width, six sizes, three weights, two solid tones, ≤ 65-character lines.

**Act:** type tokens (`t-h2`, `t-name`, `t-h3`, `t-lede`, `t-body`, `t-small`, `tone-2`) with tones defined per surface (`--text-1`, `--text-2`, recalculated on Primer); a single `SectionHead` (heading + short intro, side by side on desktop); headings that carry the information instead of a label plus a slogan (“Packages and prices”, “How the work is done”, “Questions owners ask”); the service “why it matters” box-in-a-box became a three-column comparison; numbered steps only for real sequences (method, disciplines, journey); hero reduced from three text tiers to two; no full stops on headings; a regression test guards tones, minimum size and weights.

**LCP experiment:** `font-display: optional` (hypothesis: the headline’s LCP is the font swap). Result: no change (home 3.4 s). Reverted to `swap` so the brand font always shows. Confirms cycle 5: what remains is Next.js framework script evaluation in the lab model; Speed Index stays 0.9 s.

**Result:** mobile 92–99 performance and 100 accessibility / best practices / SEO on all seven pages measured; desktop 100 across all four categories.

## Next cycle (not yet done)
- Lab mobile LCP is 2.7–3.4 s (Speed Index 0.9 s). The remaining lever is less framework JavaScript, e.g. rendering more of each page without client components.
- Field data: once live on the real domain, watch Core Web Vitals in Search Console and quote starts per page, and A/B test house-name-first vs plain-first headings.
