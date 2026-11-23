// Verified facts carried from the public okconsitedetailing.com site (captured 2026-11-23).
// Items marked `confirm` conflict between pages or need owner sign-off — see docs/content-reconciliation.md.

export const business = {
  name: 'OKC Onsite Detailing',
  legalName: 'OKC Onsite Detailing LLC',
  url: 'https://okconsitedetailing.com',
  phone: '(405) 434-1517',
  phoneHref: 'tel:+14054341517',
  smsHref: 'sms:+14054341517',
  email: 'okconsitedetailing@gmail.com',
  // Listed on the legacy service-area pages only. confirm: studio address and whether clients may visit.
  studio: {
    street: '3801 NE 104th St, Ste 450',
    locality: 'Oklahoma City',
    region: 'OK',
    postalCode: '73131',
  },
  hours: [
    { days: 'Monday – Friday', time: '8 AM – 6 PM', spec: { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' } },
    { days: 'Saturday', time: '8 AM – 3 PM', spec: { days: ['Saturday'], opens: '08:00', closes: '15:00' } },
    { days: 'Sunday', time: 'Closed', spec: null },
  ],
  social: {
    instagram: 'https://www.instagram.com/okconsitedetailing/',
    facebook: 'https://www.facebook.com/429319124588346',
  },
  googleReviewsUrl: 'https://www.google.com/maps/search/?api=1&query=OKC+Onsite+Detailing+Oklahoma+City',
  // Existing Elfsight reviews widget from the legacy site, so live verified reviews carry over unchanged.
  reviewsWidgetId: 'd5b0948a-4158-47ea-8278-6b907b1828ed',
  // Figures stated by the business on the legacy site.
  proof: [
    { value: '12+', label: 'Years of practice' },
    { value: '1,500+', label: 'Vehicles detailed' },
    { value: '5★', label: 'Client rating' },
    { value: 'Licensed', label: '& insured' },
  ],
  // The client journey. Every commitment here is already stated publicly by the business
  // (legacy site: prompt responses, clear communication, satisfaction guaranteed, free quotes).
  // Tighter promises (e.g. a same-hour reply) are recommended in docs/research-synthesis.md and need owner sign-off first.
  journey: [
    { step: 'Introduction', plain: 'Request', detail: 'Call, text or send the two-step request. Tell us what you’re caring for and where it lives.' },
    { step: 'Response', plain: 'A direct reply', detail: 'A real person from the team responds within one business day, by your preferred channel.' },
    { step: 'Survey & Proposal', plain: 'Inspection & written quote', detail: 'We assess condition, recommend only what the surface needs and confirm the price in writing before work begins.' },
    { step: 'The Service', plain: 'The work', detail: 'Performed at your home, office, hangar or marina, on the date and window we agreed.' },
    { step: 'Handover & Keeping', plain: 'Handover & aftercare', detail: 'A walk-round of the finished work and clear care guidance, so the result keeps its finish between visits.' },
  ],
  guarantees: ['Free, no-obligation quotes', 'Satisfaction guaranteed', 'Licensed & insured', 'Fully mobile'],
  certifications: [{ name: 'Undrdog Coatings', role: 'Certified installer', logo: '/brand/undrdog.webp' }],
} as const;

export type Business = typeof business;
