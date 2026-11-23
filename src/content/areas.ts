// Service areas carried from the legacy site. Local notes are general geography only.
export type Area = { slug: string; name: string; note: string; image: string };

export const areas: Area[] = [
  { slug: 'nichols-hills-ok', name: 'Nichols Hills', note: 'Estate driveways and private garages in one of the metro’s most established neighbourhoods: we detail, correct and coat on site, discreetly.', image: 'bentayga-estate' },
  { slug: 'edmond-ok', name: 'Edmond', note: 'North of the city, from family SUVs to weekend cars, with lake-season marine work for boats bound for Arcadia Lake.', image: 'bronco-estate' },
  { slug: 'arcadia-ok', name: 'Arcadia', note: 'Northeast along historic Route 66, with acreage, workshops and the trucks, trailers and boats that come with them.', image: 'malibu-trailer' },
  { slug: 'yukon-ok', name: 'Yukon', note: 'West along I-40 and Route 66, where commuters, coaches and equipment fleets meet highway grit every day.', image: 'fifth-wheel' },
];

export const areaBySlug = (slug: string) => areas.find((a) => a.slug === slug);
