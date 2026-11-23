# Imaging & art provenance

## Photography (authentic)

All photographs are the business’s own work from the legacy media library (see `legacy/image-register.json`, 164 files with source URL, size and SHA-256).

- 41 selected masters live in `assets/originals/`; `assets/photo-selection.json` records the slug, alt text and focal point for each.
- `scripts/build-images.mjs` applies **only** EXIF orientation, resizing (480/960/1600 px), mild post-resize sharpening and AVIF/WebP encoding, plus a 24-px blurred placeholder. No retouching, compositing or content changes. This is documentary work and should look honest.
- Excluded: a photo whose filename attributes it to another detailing business, third-party PPF template diagrams, a web-agency logo and manufacturer feature icons (reasons recorded per file in the register).

## Generated art (illustrative)

`scripts/generate-art.mjs` produces deterministic vector art from fixed seeds; `assets/art-manifest.json` records parameters and checksums. Every illustrative use on the site is labelled as an illustration.

| File | What it shows |
| --- | --- |
| `gloss-field.svg` | Reflected highlight lines across a curved panel (hero and call-to-action atmosphere) |
| `beading.svg` | Hydrophobic water beading on a coated surface |
| `panel-marred.svg` / `panel-corrected.svg` | One point light on swirled vs corrected clear coat (interactive comparison) |
| `contours.svg` | Topographic contour study (footer, Care Atlas) |

## Photoreal art prompts (optional, for a future pass)

The art-direction system below matches the site palette (graphite `#0b0c0e`, bone `#ece6da`, champagne `#c9b38a`, signal red `#e43224`). Use it with an image model to create **illustrative** atmospheres only: never present generated images as client work, and keep them out of “Recent work” galleries.

Shared preamble: *Editorial automotive still-life photography, extraordinary material detail, restrained low-key studio lighting, palette of deep graphite shadows, warm bone highlights and a single thin champagne rim light. No text, logos, badges, licence plates, people or identifiable vehicles.*

1. **Macro beading**: Extreme macro of water droplets beading on deep black coated paint, a soft-box reflection curving through the frame, shallow depth of field, 16:9 with negative space on the left for headline type.
2. **Correction light**: A single circular studio light reflected as a crisp point in flawless black clear coat, the faintest swirl halo fading out at one edge, 4:5.
3. **Film edge**: Raking-light close-up of a wrapped paint-protection-film edge folded around a sculpted bonnet panel, champagne rim light, 4:3.
4. **Hangar dawn**: Empty polished hangar floor at first light, open doors, long warm reflections, no aircraft markings visible, 21:9.
5. **Lake hull**: Low-angle detail of a metal-flake gelcoat hull curve beaded with lake water at golden hour, no branding, 4:5.
