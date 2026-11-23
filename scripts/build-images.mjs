// Responsive derivatives of authentic work photography.
// Processing is limited to EXIF orientation, resizing, mild post-resize sharpening and encoding.
// No retouching, compositing or content changes are made to client work photos.
import sharp from 'sharp';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const WIDTHS = [480, 960, 1600];
const selection = JSON.parse(await readFile('assets/photo-selection.json', 'utf8'));
await mkdir('public/img', { recursive: true });
const out = {};
for (const item of selection) {
  const src = `assets/originals/${item.file}`;
  const buf = await readFile(src);
  const base = sharp(buf).rotate();
  const meta = await sharp(await base.clone().toBuffer()).metadata();
  const widths = WIDTHS.filter((w) => w <= meta.width);
  if (!widths.includes(meta.width) && meta.width < WIDTHS.at(-1)) widths.push(meta.width);
  for (const w of widths) {
    const pipeline = base.clone().resize({ width: w, withoutEnlargement: true }).sharpen({ sigma: 0.5, m1: 0.6, m2: 1.2 });
    await pipeline.clone().avif({ quality: w > 1000 ? 52 : 56, effort: 5 }).toFile(`public/img/${item.slug}-${w}.avif`);
    await pipeline.clone().webp({ quality: 80, effort: 5 }).toFile(`public/img/${item.slug}-${w}.webp`);
  }
  const lqip = await base.clone().resize(24).blur(1.2).webp({ quality: 40 }).toBuffer();
  out[item.slug] = {
    alt: item.alt,
    width: meta.width,
    height: meta.height,
    focal: item.focal,
    widths,
    lqip: `data:image/webp;base64,${lqip.toString('base64')}`,
    source: item.file,
    sha256: createHash('sha256').update(buf).digest('hex'),
  };
}
await writeFile('src/content/images.generated.json', JSON.stringify(out, null, 1));

// Brand marks: the supplied logo is used as delivered (scaled only).
await sharp('assets/originals/OKC-Onsite-Detailing-Logo-black.png').png({ compressionLevel: 9 }).toFile('public/brand/logo.png');
for (const [size, name] of [[32, 'favicon-32.png'], [180, 'apple-touch-icon.png'], [512, 'icon-512.png']]) {
  await sharp('assets/originals/cropped-favicon.png').resize(size, size).png().toFile(`public/brand/${name}`);
}
await sharp('assets/originals/undrdog-logo.webp').resize({ width: 240 }).webp({ quality: 90 }).toFile('public/brand/undrdog.webp');

// Social card: hero photograph with a graphite gradient and the supplied logo; no retouching of the photo.
const ogBase = await sharp(await readFile(`assets/originals/${selection[0].file}`)).rotate().resize(1200, 630, { fit: 'cover', position: 'attention' }).toBuffer();
const shade = Buffer.from(`<svg width="1200" height="630"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#0b0c0e" stop-opacity=".92"/><stop offset=".62" stop-color="#0b0c0e" stop-opacity=".25"/><stop offset="1" stop-color="#0b0c0e" stop-opacity="0"/></linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/></svg>`);
const logo = await sharp('assets/originals/OKC-Onsite-Detailing-Logo-black.png').resize({ width: 360 }).toBuffer();
await sharp(ogBase).composite([{ input: shade }, { input: logo, left: 72, top: 72 }]).jpeg({ quality: 84, mozjpeg: true }).toFile('public/brand/og.jpg');
console.log(`built ${Object.keys(out).length} photographs`);
