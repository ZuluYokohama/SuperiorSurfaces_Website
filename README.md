# OKC Onsite Detailing: website v2

A ground-up rebuild of [okconsitedetailing.com](https://okconsitedetailing.com) for high-end clients across the Oklahoma City metro: owners of aircraft, wake boats, exotics, collector cars, motorcoaches and fleets.

- **Stack:** Next.js 16 (static export), React 19, Tailwind CSS 4, TypeScript. No server or CMS is required; deploy the `out/` folder anywhere (Vercel recommended).
- **Imaging:** the business’s own work photographs, art-directed and encoded as responsive AVIF/WebP. See [docs/imaging.md](docs/imaging.md).
- **Generated art:** deterministic, seeded vector artwork (gloss field, hydrophobic beading, swirl-vs-corrected panel, contour study) from `scripts/generate-art.mjs`.
- **Language system:** the **Care Atlas**, a concept graph mapping local Oklahoma conditions → surface mechanisms → global detailing disciplines → services → owner-facing outcomes. It drives the interactive graph, every service page’s “Why it matters here” section and the copy rules. See [docs/care-atlas.md](docs/care-atlas.md).
- **SEO continuity:** every legacy service and service-area URL is kept exactly; blog posts and retired pages 301 to their closest successor (`vercel.json`). Structured data: `AutoWash`/`LocalBusiness`, `Service` with price ranges, `FAQPage`.

## Run

```sh
pnpm install
pnpm dev            # http://127.0.0.1:3000
pnpm check          # typecheck + content tests + static build → out/
```

Rebuild assets only when sources change:

```sh
pnpm images         # assets/originals → public/img (+ src/content/images.generated.json)
pnpm art            # scripts/generate-art.mjs → public/art (+ assets/art-manifest.json)
```

## Where things live

| Path | What |
| --- | --- |
| `src/content/business.ts` | Phone, email, hours, studio address, socials, review widget, proof figures |
| `src/content/services.ts` | Eight services: copy, method, packages and prices, materials, FAQ, imagery |
| `src/content/lexicon.ts` | The Care Atlas graph and the `addresses` relation that keeps paths honest |
| `src/content/areas.ts` | Service areas (legacy URLs preserved) |
| `assets/photo-selection.json` | Which original photos are used, with alt text and focal points |
| `legacy/` | Captured text of every legacy page, the URL list and a checksummed register of all 164 legacy images |
| `docs/content-reconciliation.md` | **Owner sign-off list**: facts that conflicted on the old site |

## Quote form

Without configuration, “Send request” opens the visitor’s email app with a fully structured request addressed to the business. To receive submissions directly, create a form endpoint (e.g. Formspree) and set `NEXT_PUBLIC_FORM_ENDPOINT` at build time.

## Before launch

1. Work through [docs/content-reconciliation.md](docs/content-reconciliation.md) with the owner.
2. Confirm the Elfsight reviews widget still renders on the new domain (it’s the same widget ID as the current site).
3. Point DNS at the host, then submit `/sitemap.xml` in Google Search Console.
4. Update the Google Business Profile website link if it changes.
