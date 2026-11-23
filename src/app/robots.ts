import type { MetadataRoute } from 'next';
import { business } from '@/content/business';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_NOINDEX === 'true') return { rules: { userAgent: '*', disallow: '/' } };
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${business.url}/sitemap.xml` };
}
