// The Care Atlas: a concept graph that maps local Oklahoma conditions to the
// globally recognised detailing disciplines, then to services and to the
// outcome language a discerning owner actually cares about.
//
//   Condition (local)  →  Mechanism (physics / chemistry)  →  Discipline (global practice)
//        →  Service (what we do)  →  Expression (the result, in the owner's terms)
//
// Rules for copy everywhere on the site:
//   1. Name the local condition plainly, then the mechanism precisely.
//   2. Describe work as one of four disciplines: Decontaminate, Correct, Protect, Preserve.
//   3. Close on an expression from the outcome layer, never on a superlative.

export type Layer = 'condition' | 'mechanism' | 'discipline' | 'service' | 'expression';

export type ConceptNode = {
  id: string;
  layer: Layer;
  label: string;
  gloss: string;
  href?: string;
};

export const layers: { id: Layer; title: string; scope: string }[] = [
  { id: 'condition', title: 'Oklahoma condition', scope: 'Local' },
  { id: 'mechanism', title: 'What it does to a surface', scope: 'Mechanism' },
  { id: 'discipline', title: 'Discipline', scope: 'Global practice' },
  { id: 'service', title: 'Service', scope: 'Our work' },
  { id: 'expression', title: 'The result', scope: 'Expression' },
];

export const nodes: ConceptNode[] = [
  // Local conditions
  { id: 'c-red-dirt', layer: 'condition', label: 'Red dirt & prairie wind', gloss: 'Fine, iron-rich soil rides Oklahoma wind into seams, vents and paint texture.' },
  { id: 'c-sun', layer: 'condition', label: 'Triple-digit summers', gloss: 'Long, hot, high-UV seasons bake finishes, trim and interiors.' },
  { id: 'c-road', layer: 'condition', label: 'Storm grit & highway miles', gloss: 'Spring storms, chip-seal and turnpike debris strike leading edges.' },
  { id: 'c-lake', layer: 'condition', label: 'Lake water & mineral spotting', gloss: 'Hefner, Arcadia, Thunderbird, Eufaula and Grand Lake each leave their mark on hulls and glass.' },
  { id: 'c-organic', layer: 'condition', label: 'Insects, sap & droppings', gloss: 'Acidic organics that etch once the sun bakes them in.' },
  { id: 'c-brine', layer: 'condition', label: 'Winter brine & de-icer', gloss: 'Salt brine on winter roads clings to wheels, trailers and undercarriages.' },
  { id: 'c-ramp', layer: 'condition', label: 'Ramp, hangar & exhaust', gloss: 'Exhaust soot, leading-edge bug strike and hours on an open ramp.' },
  { id: 'c-life', layer: 'condition', label: 'Daily life aboard', gloss: 'Commutes, children, pets and long trips leave cabins carrying more than they show.' },

  // Mechanisms
  { id: 'm-marring', layer: 'mechanism', label: 'Wash-induced marring', gloss: 'Grit dragged across clear coat leaves swirls that scatter light and dull reflections.' },
  { id: 'm-bonded', layer: 'mechanism', label: 'Bonded contamination', gloss: 'Iron fallout, tar and mineral deposits that a wash alone cannot lift.' },
  { id: 'm-etching', layer: 'mechanism', label: 'Chemical etching', gloss: 'Acids and minerals that sink below the surface and set as permanent marks.' },
  { id: 'm-oxidation', layer: 'mechanism', label: 'Oxidation & UV fade', gloss: 'Chalking paint, clouded gelcoat, faded trim and drying leather.' },
  { id: 'm-impact', layer: 'mechanism', label: 'Impact damage', gloss: 'Chips that break through clear coat to colour and primer.' },
  { id: 'm-heat', layer: 'mechanism', label: 'Solar heat load', gloss: 'Infrared energy through glass that heats the cabin and ages its materials.' },
  { id: 'm-corrosion', layer: 'mechanism', label: 'Corrosion', gloss: 'Chlorides and moisture attacking metal, brake dust welding to wheels.' },
  { id: 'm-soil', layer: 'mechanism', label: 'Embedded soil & odour', gloss: 'Fibres and pores holding dirt, bacteria and the smell that comes with them.' },

  // Global disciplines
  { id: 'd-decon', layer: 'discipline', label: 'Decontaminate', gloss: 'Remove everything on and in the surface: foam pre-wash, contact wash, iron and clay treatment, extraction.' },
  { id: 'd-correct', layer: 'discipline', label: 'Correct', gloss: 'Machine-polish to level the clear coat and remove defects, measured step by step.' },
  { id: 'd-protect', layer: 'discipline', label: 'Protect', gloss: 'Add an engineered, sacrificial layer: ceramic coating, protection film or window film.' },
  { id: 'd-preserve', layer: 'discipline', label: 'Preserve', gloss: 'Keep the result on a schedule, with safe methods that do not undo the work.' },

  // Services
  { id: 's-mobile', layer: 'service', label: 'Mobile detailing', gloss: 'Interior and exterior detailing performed where the vehicle lives.', href: '/mobile-detailing-oklahoma-city-ok/' },
  { id: 's-correction', layer: 'service', label: 'Paint correction', gloss: 'One-step and multi-step machine polishing.', href: '/paint-correction-oklahoma-city-ok/' },
  { id: 's-ceramic', layer: 'service', label: 'Ceramic coating', gloss: 'Multi-year coating on paint, wheels, glass and trim.', href: '/ceramic-coating-oklahoma-city-ok/' },
  { id: 's-ppf', layer: 'service', label: 'Paint protection film', gloss: 'Self-healing film with a ten-year warranty.', href: '/paint-protection-film-oklahoma-city-ok/' },
  { id: 's-tint', layer: 'service', label: 'Window tinting', gloss: 'Dyed, carbon and nano-ceramic films.', href: '/window-tinting-oklahoma-city-ok/' },
  { id: 's-aircraft', layer: 'service', label: 'Aircraft detailing', gloss: 'Aviation-specific products, at the hangar.', href: '/aircraft-detailing-oklahoma-city-ok/' },
  { id: 's-marine', layer: 'service', label: 'Marine detailing', gloss: 'Gelcoat, metal-flake and upholstery care.', href: '/boat-detailing-oklahoma-city-ok/' },
  { id: 's-rv', layer: 'service', label: 'RV, coach & fleet', gloss: 'Coaches, fifth-wheels, transit and equipment.', href: '/rv-detailing-oklahoma-city-ok/' },

  // Expressions
  { id: 'e-clarity', layer: 'expression', label: 'Optical clarity', gloss: 'Reflections that stay sharp to the edge of every panel.' },
  { id: 'e-depth', layer: 'expression', label: 'Depth of gloss', gloss: 'Colour that reads deep and wet, not flat.' },
  { id: 'e-self-clean', layer: 'expression', label: 'Self-cleaning behaviour', gloss: 'Water beads and sheets away, taking dirt with it.' },
  { id: 'e-integrity', layer: 'expression', label: 'Factory finish intact', gloss: 'Original paint kept unbroken by chips and scratches.' },
  { id: 'e-comfort', layer: 'expression', label: 'Thermal comfort & privacy', gloss: 'A cooler, calmer cabin with less glare.' },
  { id: 'e-hygiene', layer: 'expression', label: 'A clean cabin', gloss: 'Surfaces and fabrics that are clean, not just tidy.' },
  { id: 'e-value', layer: 'expression', label: 'Preserved value', gloss: 'Condition that holds at resale, lease return or appraisal.' },
  { id: 'e-time', layer: 'expression', label: 'Time returned', gloss: 'Handled at your home, office, hangar or marina.' },
];

export const edges: [string, string][] = [
  ['c-red-dirt', 'm-marring'], ['c-red-dirt', 'm-soil'],
  ['c-sun', 'm-oxidation'], ['c-sun', 'm-heat'],
  ['c-road', 'm-impact'], ['c-road', 'm-bonded'],
  ['c-lake', 'm-etching'], ['c-lake', 'm-bonded'], ['c-lake', 'm-oxidation'],
  ['c-organic', 'm-etching'],
  ['c-brine', 'm-corrosion'], ['c-brine', 'm-bonded'],
  ['c-ramp', 'm-bonded'], ['c-ramp', 'm-oxidation'], ['c-ramp', 'm-etching'],
  ['c-life', 'm-soil'], ['c-life', 'm-marring'],

  ['m-marring', 'd-correct'], ['m-marring', 'd-protect'], ['m-marring', 'd-preserve'],
  ['m-bonded', 'd-decon'],
  ['m-etching', 'd-decon'], ['m-etching', 'd-correct'], ['m-etching', 'd-protect'],
  ['m-oxidation', 'd-correct'], ['m-oxidation', 'd-protect'],
  ['m-impact', 'd-protect'],
  ['m-heat', 'd-protect'],
  ['m-corrosion', 'd-decon'], ['m-corrosion', 'd-protect'], ['m-corrosion', 'd-preserve'],
  ['m-soil', 'd-decon'], ['m-soil', 'd-preserve'],

  ['d-decon', 's-mobile'], ['d-decon', 's-aircraft'], ['d-decon', 's-marine'], ['d-decon', 's-rv'],
  ['d-correct', 's-correction'], ['d-correct', 's-aircraft'], ['d-correct', 's-marine'], ['d-correct', 's-rv'],
  ['d-protect', 's-ceramic'], ['d-protect', 's-ppf'], ['d-protect', 's-tint'],
  ['d-preserve', 's-mobile'], ['d-preserve', 's-ceramic'],

  ['s-mobile', 'e-hygiene'], ['s-mobile', 'e-time'], ['s-mobile', 'e-value'],
  ['s-correction', 'e-clarity'], ['s-correction', 'e-depth'], ['s-correction', 'e-value'],
  ['s-ceramic', 'e-self-clean'], ['s-ceramic', 'e-depth'], ['s-ceramic', 'e-value'],
  ['s-ppf', 'e-integrity'], ['s-ppf', 'e-value'],
  ['s-tint', 'e-comfort'],
  ['s-aircraft', 'e-clarity'], ['s-aircraft', 'e-value'], ['s-aircraft', 'e-time'],
  ['s-marine', 'e-depth'], ['s-marine', 'e-value'], ['s-marine', 'e-time'],
  ['s-rv', 'e-hygiene'], ['s-rv', 'e-value'],
];

/** Which surface mechanisms each service genuinely addresses (keeps paths honest). */
export const addresses: Record<string, string[]> = {
  's-mobile': ['m-soil', 'm-bonded', 'm-marring', 'm-corrosion'],
  's-correction': ['m-marring', 'm-etching', 'm-oxidation'],
  's-ceramic': ['m-etching', 'm-oxidation', 'm-marring', 'm-corrosion', 'm-bonded'],
  's-ppf': ['m-impact', 'm-etching', 'm-marring'],
  's-tint': ['m-heat', 'm-oxidation'],
  's-aircraft': ['m-bonded', 'm-oxidation', 'm-etching'],
  's-marine': ['m-oxidation', 'm-etching', 'm-bonded', 'm-soil'],
  's-rv': ['m-oxidation', 'm-soil', 'm-bonded', 'm-corrosion'],
};

const byId = new Map(nodes.map((n) => [n.id, n]));
export const node = (id: string) => {
  const n = byId.get(id);
  if (!n) throw new Error(`Unknown concept ${id}`);
  return n;
};

const has = new Set(edges.map(([a, b]) => `${a}>${b}`));
const ofLayer = (l: Layer) => nodes.filter((n) => n.layer === l).map((n) => n.id);

/** Every complete, valid path: condition → mechanism → discipline → service → expression. */
export const chains: string[][] = (() => {
  const out: string[][] = [];
  for (const c of ofLayer('condition'))
    for (const m of ofLayer('mechanism')) {
      if (!has.has(`${c}>${m}`)) continue;
      for (const d of ofLayer('discipline')) {
        if (!has.has(`${m}>${d}`)) continue;
        for (const s of ofLayer('service')) {
          if (!has.has(`${d}>${s}`) || !addresses[s]?.includes(m)) continue;
          for (const e of ofLayer('expression')) if (has.has(`${s}>${e}`)) out.push([c, m, d, s, e]);
        }
      }
    }
  return out;
})();

/** All nodes and edges that share at least one valid chain with `id`. */
export function lineage(id: string): { nodes: Set<string>; edges: Set<string> } {
  const ns = new Set<string>();
  const es = new Set<string>();
  for (const ch of chains) {
    if (!ch.includes(id)) continue;
    ch.forEach((n, i) => {
      ns.add(n);
      if (i) es.add(`${ch[i - 1]}>${n}`);
    });
  }
  return { nodes: ns, edges: es };
}

/** Upstream local conditions and downstream expressions for a service page. */
export function serviceStory(serviceId: string) {
  const all = lineage(serviceId).nodes;
  const pick = (layer: Layer) => nodes.filter((n) => n.layer === layer && all.has(n.id));
  return { conditions: pick('condition'), mechanisms: pick('mechanism'), disciplines: pick('discipline'), expressions: pick('expression') };
}
