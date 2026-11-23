// Service content. Prices, package names and inclusions are carried verbatim in substance
// from the legacy site; the surrounding language is rewritten to the Care Atlas register
// (condition → mechanism → discipline → expression). Legacy URLs are kept for search continuity.

export type Package = {
  /** House name in the register. */
  house: string;
  /** Plain descriptor, always rendered beside the house name. */
  name: string;
  price?: string;
  summary: string;
  includes: string[];
  note?: string;
  featured?: boolean;
};

export type Service = {
  id: string; // Care Atlas node id
  slug: string; // legacy path segment, unchanged
  /** House name in the register (see src/content/register.ts). */
  house: string;
  /** Plain descriptor: always shown, and used for SEO. */
  name: string;
  family: 'Paint & protection' | 'Detailing' | 'Aviation, marine & fleet';
  kicker: string;
  title: string;
  lede: string;
  seo: { title: string; description: string };
  hero: string;
  gallery: string[];
  forWhom: string[];
  method: { step: string; detail: string }[];
  packages: Package[];
  packagesIntro?: string;
  materials?: { title: string; body: string; points?: string[] };
  faq?: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    id: 's-correction',
    slug: 'paint-correction-oklahoma-city-ok',
    house: 'Refinement',
    name: 'Paint Correction',
    family: 'Paint & protection',
    kicker: 'Refine',
    title: 'Paint correction in Oklahoma City',
    lede: 'Swirls and haze aren’t in the color. They sit in the top few microns of clear coat, where wash marring and etching scatter light. Correction levels that layer by machine, one measured step at a time, until reflections read sharp to the edge again.',
    seo: {
      title: 'Paint Correction Oklahoma City, OK | One-Step & Multi-Step Polishing',
      description: 'Machine paint correction in Oklahoma City: remove swirl marks, oxidation and scratches with one-step or multi-step polishing. Fully mobile, licensed and insured.',
    },
    hero: 'reflection-black-suv',
    gallery: ['lexus-estate', 'bentayga-estate', 'corvette-studio', 'continental-classic'],
    forWhom: ['Dark paint showing swirls in sunlight', 'Pre-sale, lease return or newly acquired vehicles', 'Preparation before ceramic coating or film', 'Collector and classic finishes'],
    method: [
      { step: 'Inspect', detail: 'Paint is assessed under controlled light to map defects and decide how far correction should go.' },
      { step: 'Decontaminate', detail: 'Hand wash and clay treatment remove bonded contamination so the polisher never drags it across the panel.' },
      { step: 'Correct', detail: 'Machine polishing in one step, or in cut, polish and finish stages, removing defects with as little clear coat as possible.' },
      { step: 'Refine', detail: 'Final passes bring back clarity and gloss, ready for protection.' },
    ],
    packages: [
      {
        house: 'Refinement I',
        name: 'One-step polish',
        summary: 'A dramatic return of gloss lost to swirls, oxidation and light scratching. It brings paint back to life; it doesn’t aim for perfection.',
        includes: ['Gentle hand wash', 'Clay bar treatment', 'One-step machine polish', 'Removes swirls, light scratches and moderate defects', 'Improved gloss and shine'],
      },
      {
        house: 'Refinement III',
        name: 'Multi-step correction',
        featured: true,
        summary: 'Cut, polish and finish stages, from most to least aggressive, for the closest result to a perfect finish.',
        includes: ['Gentle hand wash', 'Clay bar treatment', 'Multi-step machine polish', 'Removes 80–95% of imperfections and swirl marks', 'Addresses major scratches and oxidation', 'Restores gloss toward original condition'],
      },
    ],
    packagesIntro: 'Pricing depends on paint condition and vehicle size. Every correction is quoted after inspection.',
  },
  {
    id: 's-ceramic',
    slug: 'ceramic-coating-oklahoma-city-ok',
    house: 'Still Water',
    name: 'Ceramic Coating',
    family: 'Paint & protection',
    kicker: 'Seal',
    title: 'Ceramic coating in Oklahoma City',
    lede: 'A true ceramic coating bonds chemically to the clear coat and hardens into a slick, sacrificial layer. Water beads and sheets away, bird droppings and sap lose their grip, and a quick wash brings back a deep gloss that outlasts wax by years.',
    seo: {
      title: 'Ceramic Coating Oklahoma City, OK | Certified Installer, $900–$1,400',
      description: 'Ceramic coating in Oklahoma City from $900: decontamination, paint correction and multi-year coatings on paint, wheels and glass. Certified Undrdog installer.',
    },
    hero: 'bentley-front',
    gallery: ['bentley-wheel', 'bentley-quarter', 'jeep-studio', 'foam-pre-wash', 'hummer-ev-wash'],
    forWhom: ['New vehicles, protected from day one', 'Owners tired of waxing', 'Finishes exposed to sun, sap and lake spray', 'Wheels that fight brake dust'],
    method: [
      { step: 'Strip wash', detail: 'Removes dirt, droppings, acid rain residue and any previous wax.' },
      { step: 'Decontaminate', detail: 'Iron fallout remover and clay bar lift brake dust and embedded contaminants; wheels, wells and door jambs are cleaned.' },
      { step: 'Correct', detail: 'One- or two-step paint correction, because a coating locks in whatever lies beneath it.' },
      { step: 'Prep & install', detail: 'Panels are wiped down to bare clear coat, then the coating is applied and levelled panel by panel.' },
    ],
    packages: [
      {
        house: 'Still Water',
        name: 'Ceramic coating',
        price: '$900 – $1,400',
        featured: true,
        summary: 'Small $900 · Medium $1,100 · Large $1,400. All painted surfaces, prepared and corrected first.',
        includes: ['Foam cannon hand wash', 'Clay bar paint decontamination', 'One- or two-step paint correction', 'Full exterior detail', 'Multi-year ceramic coating on all painted surfaces'],
        note: 'Final price depends on the correction required, vehicle size and coating duration selected.',
      },
    ],
    materials: {
      title: 'Why it outperforms wax',
      body: 'Waxes and spray sealants sit on the surface and wear off within weeks. A coating forms a bond with the paint, so it resists chemicals, UV and water spotting for years.',
      points: ['Professional-grade coatings', 'Lasts years, unlike wax', 'UV and fade protection', 'Gloss with depth and reflection', 'Far easier washing'],
    },
    faq: [
      { q: 'What does a ceramic coating actually do?', a: 'It chemically bonds to your paint and cures into a hard, hydrophobic layer. That layer is highly chemical-resistant, helps defend against bird droppings, bug splatter, sap and water spots, adds some scratch resistance and blocks UV. It also makes the car far easier to keep clean.' },
      { q: 'How much does ceramic coating cost in Oklahoma City?', a: 'Professionally installed coatings run $900 – $1,400, depending on vehicle size and how much polishing the paint needs.' },
      { q: 'Why is paint correction part of the price?', a: 'A coating amplifies and seals whatever is beneath it. Correcting first means the gloss you lock in is the best your paint can give.' },
    ],
  },
  {
    id: 's-ppf',
    slug: 'paint-protection-film-oklahoma-city-ok',
    house: 'Second Skin',
    name: 'Paint Protection Film',
    family: 'Paint & protection',
    kicker: 'Seal',
    title: 'Paint protection film in Oklahoma City',
    lede: 'Oklahoma roads throw grit, chip-seal and storm debris at the leading edges of every car. Clear, self-healing film absorbs the impact so the factory paint underneath never breaks. We install LLumar Platinum Bond, backed by a ten-year warranty.',
    seo: {
      title: 'Paint Protection Film (PPF) Oklahoma City, OK | LLumar Platinum Bond',
      description: 'Clear bra and full-body paint protection film in Oklahoma City: self-healing LLumar Platinum Bond, 10-year warranty. Full front, track pack and full car.',
    },
    hero: 'mclaren-studio',
    gallery: ['m5-ppf', 'g-wagon-studio', 'lamborghini-satin', 'continental-classic'],
    forWhom: ['Performance and exotic cars', 'Highway commuters and turnpike miles', 'Matte and satin finishes', 'Owners who intend to keep the original paint perfect'],
    method: [
      { step: 'Decontaminate', detail: 'Full wash and clay so nothing is trapped beneath the film.' },
      { step: 'Correct', detail: 'Paint is polished where needed so the film seals in a flawless surface.' },
      { step: 'Install', detail: 'Pattern-cut film is laid with wrapped edges wherever the panel allows.' },
      { step: 'Cure & coat', detail: 'Film is left to cure; ceramic coating over film is available for easier upkeep.' },
    ],
    packagesIntro: 'Five coverage levels, quoted to the vehicle.',
    packages: [
      { house: 'Leading Edge', name: 'Front bumper', summary: 'The highest-impact zone.', includes: ['Full front bumper', 'Headlights', 'Fog lights', 'Rock-chip defense', 'Road salt and dirt barrier'] },
      { house: 'Partial Front', name: 'Partial front', summary: 'Bumper plus the leading edge of hood and fenders.', includes: ['Full front bumper', 'Partial hood', 'Partial front fenders', 'Headlights', 'Mirrors', 'Door cups'] },
      { house: 'Full Front', name: 'Full front', featured: true, summary: 'The most requested coverage: the entire front without visible film lines.', includes: ['Entire hood, edges wrapped', 'Full fenders, edges wrapped', 'Bumper', 'Headlights', 'Front of side mirrors', 'Door cups'] },
      { house: 'Circuit', name: 'Track pack', summary: 'Full front plus the areas a performance car loses to debris.', includes: ['Entire hood, edges wrapped', 'Full fenders, edges wrapped', 'Bumper and headlights', 'Front of side mirrors and door cups', 'Both A-pillars', 'Rocker panels'] },
      { house: 'Whole Body', name: 'Full vehicle', summary: 'Every painted panel, customized to the car.', includes: ['Entire car', 'Protection from rock chips, road salt and dirt', 'Headlights, mirrors and door cups'] },
    ],
    materials: {
      title: 'Why LLumar Platinum Bond',
      body: 'It was chosen for clarity, durability and a self-healing top layer that lets light swirls disappear with heat.',
      points: ['Self-healing technology', 'Superior UV resistance', 'High gloss and clarity', 'Easy-clean surface', '10-year warranty coverage'],
    },
  },
  {
    id: 's-tint',
    slug: 'window-tinting-oklahoma-city-ok',
    house: 'Cool Glass',
    name: 'Window Tinting',
    family: 'Paint & protection',
    kicker: 'Seal',
    title: 'Window tinting in Oklahoma City',
    lede: 'Oklahoma summers send infrared heat straight through glass. Nano-ceramic film rejects up to 96% of it while blocking 99% of UV, with no signal interference, so the cabin stays cool, private and calm, and the leather lasts.',
    seo: {
      title: 'Window Tinting Oklahoma City, OK | Ceramic, Carbon & Dyed Film',
      description: 'Automotive window tint in Oklahoma City: nano-ceramic, carbon and dyed films, up to 96% IR heat rejection, 99% UV protection and a lifetime film warranty.',
    },
    hero: 'escalade-tint',
    gallery: ['mclaren-white', 'g-wagon-tint', 'lamborghini-satin', 'lincoln-studio'],
    forWhom: ['Daily drivers in summer heat', 'Executive and family SUVs wanting privacy', 'Windshields, for glare and dash protection', 'Leather and trim that fades'],
    method: [
      { step: 'Consult', detail: 'Choose film and shade for the look, heat rejection and budget you want.' },
      { step: 'Prepare', detail: 'Glass is cleaned to a contamination-free surface.' },
      { step: 'Install', detail: 'Film is precision-cut, shrunk to compound curves and squeegeed bubble-free.' },
      { step: 'Cure', detail: 'Film cures over the following days; we’ll explain how to care for it.' },
    ],
    packagesIntro: 'Choose the coverage, then the film.',
    packages: [
      { house: 'Front Pair', name: 'Front two windows', summary: 'Matches the front glass to factory-tinted rear glass for a uniform look and more privacy.', includes: ['Driver and passenger windows'] },
      { house: 'Full Cabin', name: 'Whole vehicle', featured: true, summary: 'A complete restyle with privacy all round.', includes: ['All side and rear glass', 'Windshield recommended for complete glare reduction'] },
      { house: 'Windscreen', name: 'Windshield', summary: 'Heat and glare reduction from the largest pane, plus UV protection for the dash.', includes: ['Clear or light ceramic film'] },
    ],
    materials: {
      title: 'Three film grades: dyed, carbon, nano-ceramic',
      body: 'Dyed: Geoshield Pro Classic (5–50%), color-stable and won’t turn purple. Carbon: Geoshield C2 Carbon (2–50%), with strong heat rejection and a true carbon tone. Nano-ceramic: Pro Nano Ceramic 5–50%, Apex Ceramic 5–70% and Carbon Plus Ceramic 5–75%, offering the highest heat rejection and clarity at any shade.',
      points: ['Up to 96% infrared heat rejection', '99% UVA protection', 'Zero signal interference', 'Lifetime warranty: no fading, bubbling, peeling or cracking'],
    },
  },
  {
    id: 's-mobile',
    slug: 'mobile-detailing-oklahoma-city-ok',
    house: 'House Call',
    name: 'Mobile Detailing',
    family: 'Detailing',
    kicker: 'Purify · Keep',
    title: 'Mobile detailing in Oklahoma City',
    lede: 'A fully equipped team comes to your home, office or estate. The vehicle is left clean in the full sense, inside and out, with safe-wash methods that preserve the finish instead of wearing it down.',
    seo: {
      title: 'Mobile Detailing Oklahoma City, OK | Interior & Exterior from $199',
      description: 'Fully mobile car detailing in Oklahoma City. Exterior and interior packages from $199, performed at your home or office. Licensed, insured, 1,500+ vehicles detailed.',
    },
    hero: 'wheel-hand-detail',
    gallery: ['bronco-estate', 'hummer-ev-wash', 'bentley-burl', 'foam-pre-wash'],
    forWhom: ['Busy owners who cannot lose a day to the shop', 'Family vehicles that work hard', 'Upkeep between coating maintenance visits', 'Collections kept at home'],
    method: [
      { step: 'Arrive equipped', detail: 'We bring the water, power and professional products; you keep your day.' },
      { step: 'Decontaminate', detail: 'Foam pre-wash, contact wash and clay lift dirt without grinding it into the paint.' },
      { step: 'Detail', detail: 'Interiors are vacuumed, purged with compressed air and wiped down; glass is cleaned streak-free.' },
      { step: 'Preserve', detail: 'Synthetic sealant, tire and trim dressing leave the finish protected between visits.' },
    ],
    packages: [
      { house: 'Exterior Call', name: 'Exterior', price: '$199 – $249', summary: 'A safe, thorough wash that returns the showroom look.', includes: ['Foam cannon hand wash', 'Clay bar paint decontamination', 'Synthetic wax / sealant', 'Tire shine and glass cleaned'], note: 'Price varies with vehicle size and condition.' },
      { house: 'Cabin Call', name: 'Interior', price: '$199 – $249', summary: 'Stains, dirt and debris removed from every surface.', includes: ['Vacuum and dusting', 'Air purge of cracks and crevices', 'All plastics wiped down', 'Glass cleaning', 'Shampoo and stain removal (quoted)'], note: 'Price varies with vehicle size and condition.' },
    ],
  },
  {
    id: 's-aircraft',
    slug: 'aircraft-detailing-oklahoma-city-ok',
    house: 'Flight Line',
    name: 'Aircraft Detailing',
    family: 'Aviation, marine & fleet',
    kicker: 'At the Hangar',
    title: 'Aircraft detailing in Oklahoma City',
    lede: 'An aircraft finish is not a car finish, and a generalist can do lasting harm. We work at your hangar with aviation-specific products and methods. They lift exhaust soot and leading-edge strike, and slow the oxidation that comes from long hours on the ramp. The cabin gets the same care as the airframe.',
    seo: {
      title: 'Aircraft Detailing Oklahoma City, OK | Exterior & Cabin Detailing',
      description: 'Aviation-specific aircraft detailing in Oklahoma City: exterior wash, sealant, oxidation control and cabin detailing at your hangar. Packages from $399.',
    },
    hero: 'jet-night-ramp',
    gallery: ['jet-wing-technician', 'jet-hangar', 'jet-citation-hangar', 'jet-engine-tech', 'jet-hangar-wide'],
    forWhom: ['Private and business jets', 'Turboprops and piston aircraft', 'Charter and fractional operators', 'Pre-sale and pre-inspection presentation'],
    method: [
      { step: 'Coordinate', detail: 'We schedule around your flight plan and hangar access.' },
      { step: 'Decontaminate', detail: 'Exhaust residue, bug strike and ramp grime are lifted with aviation-safe chemistry.' },
      { step: 'Protect', detail: 'A sealant suited to aviation finishes helps combat oxidation.' },
      { step: 'Cabin', detail: 'Leather, woodwork, lavatory and cockpit surfaces are cleaned with the care their materials need.' },
    ],
    packages: [
      { house: 'Airframe', name: 'Exterior', price: '$399 – $549', summary: 'Wash, decontamination and protection.', includes: ['Foam cannon hand wash', 'Clay bar decontamination', 'Synthetic wax / sealant', 'Mirrors and glass cleaned'], note: 'Price varies with aircraft size and condition.' },
      { house: 'Cabin', name: 'Cabin', price: '$499 – $699', summary: 'Cabin, lavatory and cockpit.', includes: ['Wipe-down of cabin, lavatory and cockpit', 'Spot removal on headliner and sidewalls', 'Woodwork wiped down', 'Streak-free mirrors and glass', 'Leather seats cleaned', 'Trash removal'], note: 'Price varies with aircraft size and condition.' },
    ],
  },
  {
    id: 's-marine',
    slug: 'boat-detailing-oklahoma-city-ok',
    house: 'Waterline',
    name: 'Boat Detailing',
    family: 'Aviation, marine & fleet',
    kicker: 'At the Lake',
    title: 'Boat detailing in Oklahoma City',
    lede: 'Lake water, mineral spotting and summer sun cloud gelcoat and dull metal-flake. We restore the color, protect metal from corrosion and bring upholstery back, so a wake boat or pontoon looks the way it did on delivery day.',
    seo: {
      title: 'Boat Detailing Oklahoma City, OK | Wake Boats, Pontoons & Yachts',
      description: 'Professional boat detailing in Oklahoma City: exterior wax and trailer detailing from $399, interior shampoo and vinyl conditioning from $499.',
    },
    hero: 'lsv-purple',
    gallery: ['malibu-flake', 'malibu-trailer', 'boat-interior', 'boat-bow-reflection'],
    forWhom: ['Wake and surf boats', 'Pontoons and tritoons', 'Season openings and winter storage', 'Pre-sale presentation'],
    method: [
      { step: 'Decontaminate', detail: 'Full wash and degrease of hull, deck and trailer.' },
      { step: 'Restore', detail: 'Hand wax brings back color and depth to gelcoat and flake.' },
      { step: 'Protect', detail: 'Metal is protected from corrosion; vinyl and plastics are dressed.' },
      { step: 'Interior', detail: 'Carpets shampooed, stains lifted, upholstery deep-conditioned.' },
    ],
    packages: [
      { house: 'Hull & Trailer', name: 'Exterior', price: '$399 – $549', summary: 'Hull, glass and trailer.', includes: ['Complete exterior wash and dry', 'High-quality hand wax', 'Windows cleaned inside and out', 'Trailer wheels and tires cleaned and degreased', 'Tire and wheel dressing'], note: 'Price varies with boat size and condition.' },
      { house: 'Deck & Upholstery', name: 'Interior', price: '$499 – $699', summary: 'Deck, upholstery and storage.', includes: ['Interior vacuum', 'Carpet shampoo', 'Deep stain cleaning', 'Leather / vinyl deep conditioning', 'Interior plastics cleaned and dressed', 'Cup holders, tables and storage cleaned'], note: 'Price varies with boat size and condition.' },
    ],
  },
  {
    id: 's-rv',
    slug: 'rv-detailing-oklahoma-city-ok',
    house: 'Large Format',
    name: 'RV, Coach & Fleet',
    family: 'Aviation, marine & fleet',
    kicker: 'In the Fleet',
    title: 'RV, coach & fleet detailing in Oklahoma City',
    lede: 'We go big. Motorcoaches, fifth-wheels, transit buses and even combine harvesters get the same discipline as a sports car: compounding faded fiberglass, restoring graphics and deep-cleaning living quarters.',
    seo: {
      title: 'RV Detailing Oklahoma City, OK | Motorcoach, Fifth-Wheel & Fleet',
      description: 'RV and motorcoach detailing in Oklahoma City: fiberglass compounding, exterior detailing from $399 and full interior deep cleaning from $499. Fleet and equipment welcome.',
    },
    hero: 'combine-detail',
    gallery: ['coach-polish', 'fifth-wheel', 'electric-bus', 'toter-coach', 'combine-cab'],
    forWhom: ['Class A and toter-hauled motorcoaches', 'Fifth-wheels and travel trailers', 'Transit, shuttle and corporate fleets', 'Agricultural and specialty equipment'],
    method: [
      { step: 'Decontaminate', detail: 'Complete wash, microfiber hand dry, wheels and tires degreased.' },
      { step: 'Correct', detail: 'Compounding restores faded, chalky fiberglass.' },
      { step: 'Protect', detail: 'Plastics and trim dressed; seals and jambs cleaned.' },
      { step: 'Living quarters', detail: 'Kitchen, bath and lounge deep-cleaned; carpets and seats shampooed.' },
    ],
    packages: [
      { house: 'Body & Fiberglass', name: 'Exterior', price: '$399 – $549', summary: 'Body, fiberglass and running gear.', includes: ['Complete exterior wash', 'Microfiber hand dry', 'Compound to restore faded fiberglass', 'Exterior plastics dressed', 'Wheels and tires cleaned and degreased', 'Door jambs and seals cleaned'], note: 'Price varies with size and condition.' },
      { house: 'Living Quarters', name: 'Interior', price: '$499 – $699', summary: 'Every room of the coach.', includes: ['Complete vacuum and dusting', 'Tables and countertops cleaned', 'High-intensity stain pre-treatment', 'Carpets and seats shampooed', 'Living quarters, bathroom and kitchen deep-cleaned', 'All interior windows'], note: 'Price varies with size and condition.' },
    ],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const serviceById = (id: string) => services.find((s) => s.id === id);
export const families = ['Paint & protection', 'Detailing', 'Aviation, marine & fleet'] as const;
