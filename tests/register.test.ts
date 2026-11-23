import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import images from '@/content/images.generated.json';
import { services } from '@/content/services';
import { settings } from '@/content/settings';
import { business } from '@/content/business';
import { nodes } from '@/content/lexicon';
import { delegateItems, liveDelegateItems } from '@/content/delegates';
import { bannedWords, isPronounceable } from '@/content/register';

const houseNames = [
  ...services.map((s) => s.house),
  ...services.flatMap((s) => s.packages.map((p) => p.house)),
  ...settings.map((s) => s.house),
  ...business.journey.map((j) => j.step),
  ...nodes.filter((n) => n.layer === 'discipline').map((n) => n.label),
];

describe('The register', () => {
  it('gives every service and package a house name and a plain term', () => {
    for (const s of services) {
      expect(s.house, s.slug).toBeTruthy();
      expect(s.name, s.slug).toBeTruthy();
      for (const p of s.packages) expect(p.house && p.name, `${s.slug} ${p.name}`).toBeTruthy();
    }
    for (const n of nodes.filter((x) => x.layer === 'discipline' || x.layer === 'service')) expect(n.plain, n.id).toBeTruthy();
    for (const j of business.journey) expect(j.plain, j.step).toBeTruthy();
  });

  it('keeps house names short and easy to say (Song & Schwarz 2009)', () => {
    for (const h of houseNames) expect(isPronounceable(h), h).toBe(true);
  });

  it('never uses hype or jargon in house language (Brown, Anicich & Galinsky 2020)', () => {
    const copy = [
      ...houseNames,
      ...services.flatMap((s) => [s.lede, s.title]),
      ...settings.flatMap((s) => [s.lede, s.plain, ...s.matters.flatMap((m) => [m.title, m.detail])]),
    ].join(' \n ').toLowerCase();
    for (const w of bannedWords) expect(copy.includes(w), w).toBe(false);
  });

  it('keeps plain service terms in every search title', () => {
    for (const s of services) {
      const key = s.name.split(/[ ,&]/)[0].toLowerCase();
      expect(s.seo.title.toLowerCase(), s.slug).toContain(key);
    }
  });
});

describe('Settings', () => {
  const slugs = new Set(Object.keys(images));
  it('reference built photographs, generated art and real services', () => {
    for (const st of settings) {
      expect(slugs).toContain(st.hero);
      for (const g of st.gallery) expect(slugs, `${st.slug}: ${g}`).toContain(g);
      expect(() => readFileSync(`public/art/${st.art}`)).not.toThrow();
      for (const id of st.services) expect(services.map((s) => s.id)).toContain(id);
    }
  });
  it('never use a persona label in visible copy', () => {
    const visible = settings.flatMap((s) => [s.house, s.plain, s.lede, ...s.matters.flatMap((m) => [m.title, m.detail])]).join(' ').toLowerCase();
    for (const label of ['patrician', 'parvenu', 'poseur', 'archetype', 'persona', 'wealthy', 'rich']) expect(visible.includes(label), label).toBe(false);
  });
});

describe('Delegate brief', () => {
  it('renders only owner-confirmed commitments', () => {
    expect(liveDelegateItems().every((i) => i.status === 'live')).toBe(true);
    expect(delegateItems.some((i) => i.status === 'ownerPending')).toBe(true);
    const page = readFileSync('src/app/for-managers/page.tsx', 'utf8');
    expect(page).toContain('liveDelegateItems()');
    expect(page).not.toContain('delegateItems.map');
  });
});

describe('Localization', () => {
  it('uses American English for an Oklahoma audience', () => {
    const files = ['src/content/services.ts', 'src/content/settings.ts', 'src/content/lexicon.ts', 'src/content/business.ts', 'src/content/areas.ts', 'src/content/delegates.ts', 'assets/photo-selection.json'];
    for (const f of files) {
      const text = readFileSync(f, 'utf8');
      const hit = text.match(/\b(colours?|tyres?|fibres?|fibreglass|neighbour\w*|favour\w*|centre|defence|licence|enquir\w*|behaviour\w*|odour\w*|organis\w*|customis\w*|walk-round|aluminium|whilst)\b/i);
      expect(hit?.[0], f).toBeUndefined();
    }
  });
});
