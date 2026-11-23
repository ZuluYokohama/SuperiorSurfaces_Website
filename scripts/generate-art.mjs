// Deterministic generative artwork for the site.
// Every piece is produced from a fixed seed so the output is reproducible and reviewable in git.
// Parameters are recorded in assets/art-manifest.json. Nothing here depicts a real vehicle or client.
import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const BONE = '#ece6da';
const SIGNAL = '#e43224';
const CHAMPAGNE = '#c9b38a';
const INK = '#0b0c0e';

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Smooth 2D value noise.
function noise2(seed) {
  const r = rng(seed);
  const perm = Array.from({ length: 512 }, () => r());
  const h = (x, y) => perm[(((x * 73856093) ^ (y * 19349663)) >>> 0) % 512];
  const s = (t) => t * t * (3 - 2 * t);
  return (x, y) => {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = s(x - xi), yf = s(y - yi);
    const a = h(xi, yi), b = h(xi + 1, yi), c = h(xi, yi + 1), d = h(xi + 1, yi + 1);
    return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
  };
}
const fbm = (n) => (x, y) => n(x, y) * 0.6 + n(x * 2.1, y * 2.1) * 0.28 + n(x * 4.3, y * 4.3) * 0.12;
const f = (v) => Math.round(v * 10) / 10;

// 1. Gloss field: reflected highlight lines flowing across a curved panel.
function glossField({ seed = 1517, w = 1600, h = 900, lines = 64 } = {}) {
  const n = fbm(noise2(seed));
  const paths = [];
  for (let i = 0; i < lines; i++) {
    const t = i / (lines - 1);
    const y0 = h * (0.08 + t * 0.9);
    const pts = [];
    for (let k = 0; k <= 96; k++) {
      const x = (k / 96) * w;
      const bend = Math.sin((x / w) * Math.PI * 1.15 + 0.4) * h * 0.18 * (1 - t * 0.5);
      const y = y0 - bend + (n(x / 380, i * 0.11) - 0.5) * 120;
      pts.push(`${f(x)},${f(y)}`);
    }
    const accent = i === 41 ? SIGNAL : i % 13 === 7 ? CHAMPAGNE : BONE;
    const op = accent === BONE ? (0.05 + 0.22 * Math.pow(Math.sin(t * Math.PI), 3)).toFixed(3) : '0.55';
    const sw = accent === BONE ? (0.6 + Math.sin(t * Math.PI) * 0.9).toFixed(2) : '1.1';
    paths.push(`<polyline points="${pts.join(' ')}" stroke="${accent}" stroke-opacity="${op}" stroke-width="${sw}"/>`);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" fill="none" stroke-linecap="round">${paths.join('')}</svg>`;
}

// 2. Hydrophobic beading: dart-thrown droplets with specular highlights, as on a coated panel.
function beading({ seed = 405, w = 1200, h = 800, attempts = 2600 } = {}) {
  const r = rng(seed);
  const n = noise2(seed + 3);
  const beads = [];
  for (let i = 0; i < attempts; i++) {
    const x = r() * w, y = r() * h;
    const density = n(x / 260, y / 260);
    const rad = 2.5 + Math.pow(r(), 2.4) * 24 * (0.4 + density);
    if (beads.every((b) => Math.hypot(b.x - x, b.y - y) > b.r + rad + 3)) beads.push({ x, y, r: rad });
  }
  const body = beads
    .map(({ x, y, r: rr }) => {
      const sq = 0.86 + ((x * 7 + y * 3) % 10) / 100;
      return `<g transform="translate(${f(x)} ${f(y)})"><ellipse rx="${f(rr)}" ry="${f(rr * sq)}" fill="url(#b)"/><ellipse cx="${f(-rr * 0.32)}" cy="${f(-rr * 0.38)}" rx="${f(rr * 0.34)}" ry="${f(rr * 0.2)}" fill="${BONE}" fill-opacity=".75" transform="rotate(-28)"/><ellipse cy="${f(rr * 0.55)}" rx="${f(rr * 0.55)}" ry="${f(rr * 0.18)}" fill="${BONE}" fill-opacity=".09"/></g>`;
    })
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice"><defs><radialGradient id="b" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#3a3d42" stop-opacity=".25"/><stop offset=".7" stop-color="${INK}" stop-opacity=".55"/><stop offset="1" stop-color="${BONE}" stop-opacity=".35"/></radialGradient></defs>${body}</svg>`;
}

// 3. Paint surface under a point light: before (swirl marring + scratches) and after (corrected).
function panel({ seed = 73131, size = 900, marred }) {
  const r = rng(seed);
  const cx = size * 0.58, cy = size * 0.4;
  let marks = '';
  if (marred) {
    const arcs = [];
    for (let i = 0; i < 520; i++) {
      const rad = 20 + Math.pow(r(), 0.8) * size * 0.62;
      const a0 = r() * Math.PI * 2;
      const span = 0.05 + r() * 0.32;
      const x0 = cx + Math.cos(a0) * rad, y0 = cy + Math.sin(a0) * rad;
      const x1 = cx + Math.cos(a0 + span) * rad, y1 = cy + Math.sin(a0 + span) * rad;
      const op = (0.05 + 0.5 * Math.exp(-rad / (size * 0.22))).toFixed(3);
      arcs.push(`<path d="M${f(x0)} ${f(y0)}A${f(rad)} ${f(rad)} 0 0 1 ${f(x1)} ${f(y1)}" stroke="${BONE}" stroke-opacity="${op}" stroke-width="${(0.4 + r() * 0.7).toFixed(2)}"/>`);
    }
    for (let i = 0; i < 18; i++) {
      const x = r() * size, y = r() * size, a = r() * Math.PI, l = 40 + r() * 220;
      arcs.push(`<path d="M${f(x)} ${f(y)}l${f(Math.cos(a) * l)} ${f(Math.sin(a) * l)}" stroke="${BONE}" stroke-opacity=".14" stroke-width=".6"/>`);
    }
    marks = `<g fill="none" stroke-linecap="round">${arcs.join('')}</g>`;
  }
  const haze = marred ? 0.16 : 0.03;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"><defs><radialGradient id="l" cx="${cx / size}" cy="${cy / size}" r="${marred ? 0.34 : 0.07}"><stop offset="0" stop-color="#fff" stop-opacity="${marred ? 0.55 : 1}"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><linearGradient id="p" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1b1d21"/><stop offset="1" stop-color="#060708"/></linearGradient></defs><rect width="${size}" height="${size}" fill="url(#p)"/><rect width="${size}" height="${size}" fill="${BONE}" fill-opacity="${haze}"/>${marks}<rect width="${size}" height="${size}" fill="url(#l)"/>${marred ? '' : `<circle cx="${cx}" cy="${cy}" r="9" fill="#fff"/>`}</svg>`;
}

// 4. Contour study: nested, noise-modulated rings, read as topography of red-dirt country.
function contours({ seed = 405434, w = 1600, h = 1000, rings = 34 } = {}) {
  const n = fbm(noise2(seed));
  const centres = [[0.28, 0.6], [0.74, 0.36]];
  let out = '';
  centres.forEach(([u, v], ci) => {
    for (let i = 1; i <= rings; i++) {
      const base = i * 26;
      const pts = [];
      for (let k = 0; k <= 180; k++) {
        const a = (k / 180) * Math.PI * 2;
        const rr = base * (1 + (n(Math.cos(a) * 1.3 + ci * 9, Math.sin(a) * 1.3 + i * 0.045) - 0.5) * 0.9);
        pts.push(`${f(u * w + Math.cos(a) * rr * 1.35)},${f(v * h + Math.sin(a) * rr)}`);
      }
      const accent = i === 9 && ci === 0 ? SIGNAL : BONE;
      out += `<polygon points="${pts.join(' ')}" stroke="${accent}" stroke-opacity="${accent === SIGNAL ? 0.6 : (0.05 + 0.1 * (1 - i / rings)).toFixed(3)}"/>`;
    }
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" fill="none" stroke-width=".8">${out}</svg>`;
}

// 5. Cool Glass: warm infrared lines arriving from the left, stopped at a pane; only faint cool light passes.
function coolGlass({ seed = 96, w = 1600, h = 900 } = {}) {
  const r = rng(seed);
  const pane = w * 0.56;
  let out = '';
  for (let i = 0; i < 70; i++) {
    const y = h * (0.04 + (i / 69) * 0.92);
    const amp = 6 + r() * 14, freq = 0.012 + r() * 0.01, ph = r() * 6.28;
    const pts = [];
    for (let x = 0; x <= pane; x += 12) pts.push(`${f(x)},${f(y + Math.sin(x * freq + ph) * amp * (1 - x / pane / 1.4))}`);
    out += `<polyline points="${pts.join(' ')}" stroke="${i % 9 === 4 ? SIGNAL : CHAMPAGNE}" stroke-opacity="${(0.12 + r() * 0.35).toFixed(2)}" stroke-width="1"/>`;
    if (i % 6 === 0) out += `<line x1="${f(pane + 14)}" y1="${f(y)}" x2="${f(w)}" y2="${f(y)}" stroke="${BONE}" stroke-opacity=".08"/>`;
  }
  out += `<rect x="${f(pane)}" y="0" width="10" height="${h}" fill="${BONE}" fill-opacity=".12"/><line x1="${f(pane)}" y1="0" x2="${f(pane)}" y2="${h}" stroke="${BONE}" stroke-opacity=".5"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" fill="none" stroke-linecap="round">${out}</svg>`;
}

// 6. Second Skin: impact ripples dissipating across a membrane, fading as they heal.
function secondSkin({ seed = 10, w = 1600, h = 900 } = {}) {
  const r = rng(seed);
  let out = '';
  const impacts = Array.from({ length: 9 }, () => ({ x: r() * w, y: r() * h, s: 0.5 + r() }));
  impacts.forEach((im, k) => {
    for (let i = 1; i <= 14; i++) {
      const rad = i * 18 * im.s;
      out += `<circle cx="${f(im.x)}" cy="${f(im.y)}" r="${f(rad)}" stroke="${k === 2 && i === 3 ? SIGNAL : BONE}" stroke-opacity="${(0.85 * Math.exp(-i / 5)).toFixed(3)}"/>`;
    }
  });
  for (let i = 0; i < 40; i++) {
    const y = (i / 39) * h;
    out += `<path d="M0 ${f(y)} Q ${f(w / 2)} ${f(y + 30)} ${w} ${f(y)}" stroke="${BONE}" stroke-opacity=".06"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" fill="none" stroke-width="1.1">${out}</svg>`;
}

// 7. Waterline: two crossing families of rippled lines whose interference reads as light through moving water.
function waterline({ seed = 2024, w = 1600, h = 900, lines = 46 } = {}) {
  const n = fbm(noise2(seed));
  let out = '';
  for (const [dir, tint] of [[1, BONE], [-1, CHAMPAGNE]]) {
    for (let i = 0; i < lines; i++) {
      const t = i / (lines - 1);
      const pts = [];
      for (let x = -100; x <= w + 100; x += 10) {
        const base = t * (h + 400) - 200 + dir * (x - w / 2) * 0.18;
        const y = base + Math.sin(x * 0.011 + i * 0.7 * dir) * 22 + (n(x / 220, i * 0.21 + (dir > 0 ? 0 : 50)) - 0.5) * 70;
        pts.push(`${f(x)},${f(y)}`);
      }
      const depth = 1 - t;
      out += `<polyline points="${pts.join(' ')}" stroke="${tint}" stroke-opacity="${(0.05 + 0.3 * depth * depth).toFixed(3)}" stroke-width="${(0.6 + depth).toFixed(2)}"/>`;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" fill="none" stroke-linecap="round">${out}</svg>`;
}

// 8. Flight Line: laminar streamlines bending around an abstract airfoil section (a diagram, not an aircraft).
function flightLine({ w = 1600, h = 900 } = {}) {
  const cx = w * 0.5, cy = h * 0.52, c = w * 0.46, t = 0.14;
  const foilY = (u) => 5 * t * c * (0.2969 * Math.sqrt(u) - 0.126 * u - 0.3516 * u * u + 0.2843 * u ** 3 - 0.1015 * u ** 4);
  const top = [], bot = [];
  for (let k = 0; k <= 60; k++) {
    const u = (k / 60) ** 2;
    top.push(`${f(cx - c / 2 + u * c)},${f(cy - foilY(u) - u * 18)}`);
    bot.push(`${f(cx - c / 2 + u * c)},${f(cy + foilY(u) * 0.55 - u * 18)}`);
  }
  let out = `<polygon points="${[...top, ...bot.reverse()].join(' ')}" fill="${BONE}" fill-opacity=".1" stroke="${BONE}" stroke-opacity=".8"/>`;
  for (let i = -14; i <= 14; i++) {
    if (i === 0) continue;
    const y0 = cy + i * 30;
    const pts = [];
    for (let x = 0; x <= w; x += 10) {
      const d = (x - cx) / (c * 0.62);
      const bump = Math.exp(-d * d) * (150 / (Math.abs(i) * 0.7 + 1)) * Math.sign(i);
      pts.push(`${f(x)},${f(y0 + bump - Math.exp(-d * d) * 14)}`);
    }
    out += `<polyline points="${pts.join(' ')}" stroke="${i === -3 ? SIGNAL : BONE}" stroke-opacity="${i === -3 ? 0.6 : (0.5 - Math.abs(i) * 0.03).toFixed(3)}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" fill="none" stroke-width=".9">${out}</svg>`;
}

// 9. Large Format: a modular scale study; nested grids at three scales, one cell picked out.
function largeFormat({ seed = 3801, w = 1600, h = 900 } = {}) {
  const r = rng(seed);
  let out = '';
  for (const [step, op] of [[200, 0.16], [50, 0.07], [12.5, 0.03]]) {
    for (let x = 0; x <= w; x += step) out += `<line x1="${f(x)}" y1="0" x2="${f(x)}" y2="${h}" stroke="${BONE}" stroke-opacity="${op}"/>`;
    for (let y = 0; y <= h; y += step) out += `<line x1="0" y1="${f(y)}" x2="${w}" y2="${f(y)}" stroke="${BONE}" stroke-opacity="${op}"/>`;
  }
  for (let i = 0; i < 14; i++) {
    const x = Math.floor(r() * 8) * 200, y = Math.floor(r() * 4.5) * 200;
    out += `<rect x="${x}" y="${y}" width="200" height="200" fill="${BONE}" fill-opacity="${(0.02 + r() * 0.05).toFixed(3)}"/>`;
  }
  out += `<rect x="1000" y="400" width="200" height="200" stroke="${SIGNAL}" stroke-opacity=".7" fill="none"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" stroke-width=".8">${out}</svg>`;
}

const pieces = [
  { file: 'gloss-field.svg', make: () => glossField(), params: { seed: 1517, lines: 64 }, purpose: 'Hero and section atmosphere: reflected highlight lines across a curved panel' },
  { file: 'beading.svg', make: () => beading(), params: { seed: 405, attempts: 2600 }, purpose: 'Ceramic coating: hydrophobic water behaviour' },
  { file: 'panel-marred.svg', make: () => panel({ marred: true }), params: { seed: 73131, arcs: 520, scratches: 18 }, purpose: 'Paint correction comparison: swirl marring under a point light' },
  { file: 'panel-corrected.svg', make: () => panel({ marred: false }), params: { seed: 73131 }, purpose: 'Paint correction comparison: the same light on corrected paint' },
  { file: 'cool-glass.svg', make: () => coolGlass(), params: { seed: 96 }, purpose: 'Cool Glass (window tint): infrared lines stopped at a pane' },
  { file: 'second-skin.svg', make: () => secondSkin(), params: { seed: 10 }, purpose: 'Second Skin (PPF): impact ripples dissipating across a membrane' },
  { file: 'waterline.svg', make: () => waterline(), params: { seed: 2024, lines: 46 }, purpose: 'Waterline (marine): interference of light through moving water' },
  { file: 'flight-line.svg', make: () => flightLine(), params: { profile: 'NACA 4-digit thickness, 12%' }, purpose: 'Flight Line (aircraft): laminar streamlines around an airfoil section' },
  { file: 'large-format.svg', make: () => largeFormat(), params: { seed: 3801 }, purpose: 'Large Format (fleet): modular scale study' },
  { file: 'contours.svg', make: () => contours(), params: { seed: 405434, rings: 34 }, purpose: 'Service areas and footer: topographic contour study' },
];

await mkdir('public/art', { recursive: true });
const manifest = [];
for (const p of pieces) {
  const svg = p.make();
  await writeFile(`public/art/${p.file}`, svg);
  manifest.push({ file: `public/art/${p.file}`, generator: 'scripts/generate-art.mjs', params: p.params, purpose: p.purpose, bytes: Buffer.byteLength(svg), sha256: createHash('sha256').update(svg).digest('hex') });
}
await writeFile('assets/art-manifest.json', JSON.stringify({ note: 'Deterministic generative vector art. Illustrative only; it does not depict client work.', pieces: manifest }, null, 1));
console.log(manifest.map((m) => `${m.file} ${(m.bytes / 1024).toFixed(1)}KB`).join('\n'));
