import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import images from '@/content/images.generated.json';
import { services } from '@/content/services';
import { areas } from '@/content/areas';
import { addresses, chains, edges, lineage, nodes, serviceStory } from '@/content/lexicon';

const legacyUrls = readFileSync('legacy/urls.txt', 'utf8').trim().split('\n');
const imageSlugs = new Set(Object.keys(images));

describe('Care Atlas', () => {
  it('has unique ids and only references known nodes', () => {
    const ids = nodes.map((n) => n.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const [a, b] of edges) {
      expect(ids).toContain(a);
      expect(ids).toContain(b);
    }
  });

  it('connects every node to at least one complete chain', () => {
    for (const n of nodes) expect(lineage(n.id).nodes.size, n.id).toBeGreaterThan(1);
    expect(chains.length).toBeGreaterThan(50);
  });

  it('never routes a service through a mechanism it does not address', () => {
    for (const [, m, , s] of chains) expect(addresses[s]).toContain(m);
  });

  it('keeps window tint away from impact damage and PPF away from heat', () => {
    expect(serviceStory('s-tint').mechanisms.map((m) => m.id)).not.toContain('m-impact');
    expect(serviceStory('s-ppf').mechanisms.map((m) => m.id)).not.toContain('m-heat');
  });

  it('links each service node to a real page', () => {
    for (const n of nodes.filter((x) => x.layer === 'service')) {
      expect(services.map((s) => `/${s.slug}/`)).toContain(n.href);
    }
  });
});

describe('Services', () => {
  it('preserves every legacy service URL', () => {
    for (const s of services) expect(legacyUrls).toContain(`https://okconsitedetailing.com/${s.slug}/`);
  });
  it('preserves every legacy service-area URL', () => {
    for (const a of areas) expect(legacyUrls).toContain(`https://okconsitedetailing.com/service-areas/${a.slug}/`);
  });
  it('references only built photographs', () => {
    for (const s of services) for (const slug of [s.hero, ...s.gallery]) expect(imageSlugs, `${s.slug}: ${slug}`).toContain(slug);
    for (const a of areas) expect(imageSlugs).toContain(a.image);
  });
  it('keeps the published prices from the legacy site', () => {
    const text = (slug: string) => readFileSync(`legacy/pages/${slug}.txt`, 'utf8');
    expect(text('ceramic-coating-oklahoma-city-ok')).toContain('SM $900 | MED $1,100 | LRG $1,400');
    expect(text('mobile-detailing-oklahoma-city-ok')).toContain('$199 - $249');
    for (const s of services) for (const p of s.packages) if (p.price) {
      const [lo] = p.price.match(/\$[\d,]+/)!;
      expect(text(s.slug), `${s.slug} ${p.name}`).toContain(lo);
    }
  });
  it('gives every page a unique SEO title and a description of sensible length', () => {
    const titles = services.map((s) => s.seo.title);
    expect(new Set(titles).size).toBe(titles.length);
    for (const s of services) expect(s.seo.description.length).toBeLessThanOrEqual(170);
  });
});
