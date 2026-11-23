// The register: the house language of Finish Stewardship.
//
// Research-backed rules (docs/research-imagery-language-personas.md):
//  - Evocative, slightly ambiguous names lift preference for sensory experiences (Miller & Kahn 2005),
//    but only when the reader can process them, so the plain term is ALWAYS rendered beside them.
//  - Hard-to-pronounce names read as risky (Song & Schwarz 2009): one or two common English words.
//  - Jargon signals low status, not expertise (Brown, Anicich & Galinsky 2020): banned below.
//  - Precise material names (film and coating lines) are kept as quiet insider signals (Berger & Ward 2010).

export const practice = { house: 'Finish Stewardship', plain: 'Detailing, correction and protection' };

/** Words that read as filler, hype or jargon. Not allowed in house names or headlines. */
export const bannedWords = [
  'best', '#1', 'number one', 'unparalleled', 'second to none', 'top-notch', 'world-class', 'synergy',
  'cutting-edge', 'revolutionary', 'nano-tech', 'ultimate', 'premium-grade', 'next-level', 'solutions',
];

/** Rough English syllable count (vowel groups), used to keep house names easy to say. */
export function syllables(word: string) {
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!w) return 0;
  const groups = w.replace(/e$/, '').match(/[aeiouy]+/g);
  return Math.max(1, groups ? groups.length : 1);
}

export function isPronounceable(house: string) {
  const words = house.replace(/&/g, ' ').split(/\s+/).filter(Boolean).filter((w) => !/^[IVX]+$/.test(w));
  return words.length >= 1 && words.length <= 3 && words.every((w) => /^[A-Za-z]+$/.test(w) && syllables(w) <= 4);
}
