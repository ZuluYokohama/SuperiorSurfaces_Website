import type { MetadataRoute } from 'next';
import { business } from '@/content/business';
import { services } from '@/content/services';
import { areas } from '@/content/areas';
import { settings } from '@/content/settings';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', '/contact-us/', '/care-atlas/', '/service-areas/', '/privacy-policy/', ...services.map((s) => `/${s.slug}/`), ...areas.map((a) => `/service-areas/${a.slug}/`), ...settings.map((s) => `/settings/${s.slug}/`), '/for-managers/'];
  return paths.map((p) => ({ url: `${business.url}${p}`, changeFrequency: 'monthly', priority: p === '/' ? 1 : p.includes('oklahoma-city-ok') ? 0.9 : 0.6 }));
}
