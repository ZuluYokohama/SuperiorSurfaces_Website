import { business } from './business';
import { areas } from './areas';
import { services, type Service } from './services';

const id = `${business.url}/#business`;

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['AutoWash', 'LocalBusiness'],
    '@id': id,
    name: business.name,
    legalName: business.legalName,
    url: business.url,
    telephone: '+1-405-434-1517',
    email: business.email,
    image: `${business.url}/brand/og.jpg`,
    logo: `${business.url}/brand/logo.png`,
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.studio.street,
      addressLocality: business.studio.locality,
      addressRegion: business.studio.region,
      postalCode: business.studio.postalCode,
      addressCountry: 'US',
    },
    areaServed: [{ '@type': 'City', name: 'Oklahoma City' }, ...areas.map((a) => ({ '@type': 'City', name: `${a.name}, OK` }))],
    openingHoursSpecification: business.hours
      .filter((h) => h.spec)
      .map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.spec!.days, opens: h.spec!.opens, closes: h.spec!.closes })),
    sameAs: [business.social.instagram, business.social.facebook],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Detailing and protection services',
      itemListElement: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name, url: `${business.url}/${s.slug}/` } })),
    },
  };
}

export function serviceLd(s: Service) {
  const prices = s.packages
    .map((p) => p.price?.match(/\$[\d,]+/g)?.map((v) => Number(v.replace(/[$,]/g, ''))) ?? [])
    .flat();
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.title,
    serviceType: s.name,
    description: s.seo.description,
    url: `${business.url}/${s.slug}/`,
    provider: { '@id': id },
    areaServed: 'Oklahoma City metropolitan area',
    ...(prices.length && {
      offers: { '@type': 'AggregateOffer', priceCurrency: 'USD', lowPrice: Math.min(...prices), highPrice: Math.max(...prices) },
    }),
  };
}

export function faqLd(s: Service) {
  if (!s.faq) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: s.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}
