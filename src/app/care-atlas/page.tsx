import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaBand, Eyebrow } from '@/components/Blocks';
import { ConceptGraph } from '@/components/ConceptGraph';
import { layers, nodes } from '@/content/lexicon';

export const metadata: Metadata = {
  title: 'The Care Atlas: Oklahoma Conditions to Detailing Disciplines',
  description: 'How Oklahoma sun, red dirt, storms, lake water and winter brine affect paint, gelcoat, glass and cabins, and which detailing disciplines answer each one.',
  alternates: { canonical: '/care-atlas/' },
};

export default function Atlas() {
  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[url(/art/contours.svg)] bg-cover opacity-80" />
        <div className="wrap max-w-4xl">
          <Eyebrow>The Care Atlas</Eyebrow>
          <h1 className="display mt-5 text-[clamp(2.8rem,6vw,5.4rem)]">Local conditions. <em>Global</em> discipline.</h1>
          <p className="lede mt-6">
            Detailing has a universal grammar: decontaminate, correct, protect, preserve. What changes from place to place is what a surface is up against. This atlas maps Oklahoma’s particular conditions, through what they physically do to paint, gelcoat, glass and leather, to the discipline that answers them and the result you keep.
          </p>
        </div>
      </section>
      <section className="pb-24">
        <div className="wrap"><ConceptGraph initial="c-red-dirt" /></div>
      </section>
      <section className="paper py-20 md:py-28">
        <div className="wrap">
          <Eyebrow>The full lexicon</Eyebrow>
          <div className="mt-10 grid gap-12 md:grid-cols-2 xl:grid-cols-3">
            {layers.map((l) => (
              <div key={l.id}>
                <h2 className="display text-3xl"><span className="mr-3 text-sm font-sans font-bold uppercase tracking-[0.2em] text-signal">{l.scope}</span><br />{l.title}</h2>
                <dl className="mt-6 space-y-5">
                  {nodes.filter((n) => n.layer === l.id).map((n) => (
                    <div key={n.id} className="border-t border-[var(--line)] pt-4">
                      <dt className="font-semibold">{n.href ? <Link className="link-u" href={n.href}>{n.label}</Link> : n.label}</dt>
                      <dd className="mt-1 text-sm leading-relaxed text-ink/70">{n.gloss}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Start from your Oklahoma reality." />
    </>
  );
}
