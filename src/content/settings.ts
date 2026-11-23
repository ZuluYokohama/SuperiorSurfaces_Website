// Settings: how the five client worlds appear on the site.
// Visitors choose a setting, never a persona label. The `archetype` block is internal research
// (docs/research-imagery-language-personas.md) and is not rendered.

export type Setting = {
  slug: string;
  house: string; // e.g. "At the Hangar"
  plain: string; // plain descriptor for headings and SEO
  asset: string; // quote-form preset (?asset=)
  lede: string;
  matters: { title: string; detail: string }[];
  services: string[]; // service ids, in priority order
  hero: string; // editorial (monochrome) atmosphere image
  gallery: string[]; // documentary (full-colour) work
  art: string; // generated signature art (public/art)
  seo: { title: string; description: string };
  archetype: {
    objects: string[];
    reads: string; // who reads the site
    recommends: string; // who suggests the provider
    invests: string; // who decides and pays
    signal: string; // status-signal profile (Han et al. 2010 / Berger & Ward 2010)
    register: string; // tone to use
  };
};

export const settings: Setting[] = [
  {
    slug: 'hangar',
    house: 'At the Hangar',
    plain: 'Aircraft detailing at your hangar',
    asset: 'aircraft',
    lede: 'Your aircraft keeps a schedule, and so do we. We work around flight plans and hangar access, with aviation-specific chemistry for every surface from leading edge to lavatory.',
    matters: [
      { title: 'Scheduled around the flight plan', detail: 'Work is booked to your access window and finished before wheels-up.' },
      { title: 'Aviation-specific products', detail: 'Exhaust soot, bug strike and ramp grime are lifted with chemistry suited to aircraft finishes.' },
      { title: 'One point of contact', detail: 'The same team answers the owner, the chief pilot or the flight department.' },
    ],
    services: ['s-aircraft', 's-ceramic', 's-correction'],
    hero: 'jet-sunset',
    gallery: ['jet-wing-technician', 'jet-night-ramp', 'jet-citation-hangar', 'jet-engine-tech', 'jet-hangar'],
    art: 'flight-line.svg',
    seo: { title: 'Aircraft Detailing at Your Hangar, Oklahoma City', description: 'Aircraft exterior and cabin detailing scheduled around your flight plan, at your hangar in the Oklahoma City area. Aviation-specific products.' },
    archetype: {
      objects: ['Business jets', 'Turboprops', 'Piston aircraft'],
      reads: 'Chief pilot, flight-department or FBO manager, executive assistant',
      recommends: 'Other owners at the field, FBO staff, maintenance shops',
      invests: 'Owner or flight department budget holder',
      signal: 'Low status-need, high risk-aversion; values precision and documentation',
      register: 'Exact, calm, procedural. Times, products and access, never adjectives.',
    },
  },
  {
    slug: 'estate',
    house: 'At the Estate',
    plain: 'Mobile detailing at your residence',
    asset: 'auto',
    lede: 'Every vehicle in the household, cared for on your own drive by one trusted team, quietly and on a rhythm that suits the house.',
    matters: [
      { title: 'One trusted team', detail: 'The same people each visit, who know the vehicles and the property.' },
      { title: 'Discreet and self-sufficient', detail: 'We bring our own water and power, and leave the drive as we found it.' },
      { title: 'A standing rhythm', detail: 'Regular visits keep every finish as it should be, rather than rescuing it.' },
    ],
    services: ['s-mobile', 's-ceramic', 's-tint'],
    hero: 'bentayga-estate',
    gallery: ['bentley-burl', 'wheel-hand-detail', 'bronco-estate', 'bentley-quarter', 'lexus-estate'],
    art: 'gloss-field.svg',
    seo: { title: 'Mobile Detailing at Your Residence, Nichols Hills & Oklahoma City', description: 'Discreet, on-site detailing for every vehicle in the household across Nichols Hills, Edmond and Oklahoma City. One trusted team.' },
    archetype: {
      objects: ['Bentley, Range Rover, Escalade', 'Family SUVs', 'Weekend cars'],
      reads: 'Principal or spouse; often a house manager or assistant',
      recommends: 'Neighbours, friends, the house manager’s network',
      invests: 'Principal; household manager approves routine visits',
      signal: 'Patrician: quiet wealth, low need for display, values discretion',
      register: 'Understated and warm. Discretion and continuity, no superlatives.',
    },
  },
  {
    slug: 'collection',
    house: 'In the Collection',
    plain: 'Exotic & collector car paint correction and protection',
    asset: 'exotic',
    lede: 'For cars that are kept rather than merely driven: measured correction, self-healing film and coatings, specified to the car and documented for the record.',
    matters: [
      { title: 'Specification, not slogans', detail: 'Film, coating and correction steps are named precisely, so you know exactly what is on your paint.' },
      { title: 'Original paint, preserved', detail: 'Correction removes as little clear coat as possible; film keeps the factory finish unbroken.' },
      { title: 'Proof you can inspect', detail: 'Recent work is shown as photographed, without retouching.' },
    ],
    services: ['s-ppf', 's-correction', 's-ceramic'],
    hero: 'lamborghini-satin',
    gallery: ['mclaren-studio', 'continental-classic', 'corvette-studio', 'g-wagon-studio', 'm5-ppf'],
    art: 'second-skin.svg',
    seo: { title: 'Exotic & Collector Car Paint Correction and PPF, Oklahoma City', description: 'Paint correction, LLumar Platinum Bond paint protection film and ceramic coatings for exotic and collector cars in Oklahoma City.' },
    archetype: {
      objects: ['Lamborghini, McLaren, G-Class', 'Classic Lincoln Continental, Corvette', 'Performance sedans'],
      reads: 'The owner, who researches deeply',
      recommends: 'Car clubs, enthusiast forums, other collectors, dealers',
      invests: 'Owner',
      signal: 'Connoisseur insider (Berger & Ward); some parvenu display. Decodes material names.',
      register: 'Technical and exact. Materials, steps and evidence.',
    },
  },
  {
    slug: 'lake',
    house: 'At the Lake',
    plain: 'Boat detailing for the lake season',
    asset: 'boat',
    lede: 'Ready for the first warm weekend and every one after: gelcoat brought back to colour, upholstery restored and the trailer cleaned, before the guests arrive.',
    matters: [
      { title: 'Timed to the season', detail: 'Book before opening weekend, between trips, or before winter storage.' },
      { title: 'Ready to host', detail: 'Upholstery, storage and glass cleaned for a boat full of people.' },
      { title: 'Colour that lasts the summer', detail: 'Hand wax and protection hold up against sun and lake water.' },
    ],
    services: ['s-marine', 's-ceramic'],
    hero: 'boat-bow-reflection',
    gallery: ['lsv-purple', 'malibu-flake', 'malibu-trailer', 'boat-interior'],
    art: 'waterline.svg',
    seo: { title: 'Boat Detailing for the Lake Season, Oklahoma City', description: 'Wake boat and pontoon detailing in Oklahoma City: gelcoat wax, trailer cleaning and upholstery restoration timed to the lake season.' },
    archetype: {
      objects: ['Malibu and MasterCraft wake boats', 'Pontoons and tritoons'],
      reads: 'Owner, often a younger affluent household',
      recommends: 'Friends on the water, marina and dealer staff, Instagram',
      invests: 'Owner',
      signal: 'Social and experiential; responds to social proof and timing',
      register: 'Bright and seasonal. Readiness and hosting.',
    },
  },
  {
    slug: 'fleet',
    house: 'In the Fleet',
    plain: 'Fleet, coach & equipment detailing',
    asset: 'fleet',
    lede: 'Transit buses, motorcoaches and combine harvesters, presented consistently and on schedule, because your fleet is your brand on the road.',
    matters: [
      { title: 'Consistency at scale', detail: 'Every unit is finished to the same standard, visit after visit.' },
      { title: 'Around operations', detail: 'Scheduled so that work fits around routes, seasons and downtime.' },
      { title: 'Large-format capable', detail: 'Coaches, buses and agricultural equipment are routine work.' },
    ],
    services: ['s-rv', 's-mobile'],
    hero: 'combine-detail',
    gallery: ['electric-bus', 'coach-polish', 'combine-cab', 'toter-coach', 'fifth-wheel'],
    art: 'large-format.svg',
    seo: { title: 'Fleet, Coach & Equipment Detailing, Oklahoma City', description: 'Detailing for transit buses, motorcoaches, fleets and agricultural equipment in Oklahoma City, scheduled around operations.' },
    archetype: {
      objects: ['Battery-electric transit buses', 'Motorcoaches and toters', 'Combines and equipment'],
      reads: 'Fleet or operations manager, procurement',
      recommends: 'Peer operators, dealers, equipment shops',
      invests: 'Business owner or procurement',
      signal: 'Rational, ROI- and uptime-driven',
      register: 'Operational and plain. Schedule, consistency and scale.',
    },
  },
];

export const settingBySlug = (slug: string) => settings.find((s) => s.slug === slug);
