import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaBand, Eyebrow } from '@/components/Blocks';
import { ConceptGraph } from '@/components/ConceptGraph';
import { layers, nodes } from '@/content/lexicon';
import { services } from '@/content/services';
import { settings } from '@/content/settings';
import { business } from '@/content/business';
import { practice } from '@/content/register';
import { asset } from '@/lib/asset';

export const metadata: Metadata = {
  title: 'The Care Atlas: Oklahoma Conditions to Detailing Disciplines',
  description: 'How Oklahoma sun, red dirt, storms, lake water and winter brine affect paint, gelcoat, glass and cabins, and which detailing disciplines answer each one.',
  alternates: { canonical: '/care-atlas/' },
};

export default function Atlas() {
  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40">
        <div aria-hidden className="absolute inset-0 -z-10 bg-cover opacity-80" style={{ backgroundImage: `url(${asset('/art/contours.webp')})` }} />
        <div className="wrap max-w-4xl">
          <Eyebrow>The Care Atlas</Eyebrow>
          <h1 className="display mt-5 text-[clamp(2.8rem,6vw,5.4rem)]">Local conditions. Global discipline.</h1>
          <p className="lede mt-6">
            Detailing has a universal grammar: decontaminate, correct, protect, preserve. What changes from place to place is what a surface is up against. This atlas maps Oklahoma’s particular conditions, through what they physically do to paint, gelcoat, glass and leather, to the discipline that answers them and the result you keep.
          </p>
        </div>
      </section>
      <section className="pb-24">
        <div className="wrap"><ConceptGraph initial="c-red-dirt" /></div>
      </section>
      <section className="paper section">
        <div className="wrap">
          <Eyebrow>The full lexicon</Eyebrow>
          <div className="mt-10 grid gap-12 md:grid-cols-2 xl:grid-cols-3">
            {layers.map((l) => (
              <div key={l.id}>
                <h2 className="display text-3xl"><span className="mr-3 text-sm font-sans font-medium text-ink/60">{l.scope}</span><br />{l.title}</h2>
                <dl className="mt-6 space-y-5">
                  {nodes.filter((n) => n.layer === l.id).map((n) => (
                    <div key={n.id} className="border-t border-[var(--line)] pt-4">
                      <dt className="font-semibold">{n.href ? <Link className="link-u inline-block py-2" href={n.href}>{n.label}</Link> : n.label}</dt>
                      <dd className="mt-1 text-sm leading-relaxed text-ink/70">{n.gloss}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <Eyebrow>The register</Eyebrow>
          <h2 className="display mt-5 max-w-3xl text-[length:var(--step-4)]">Our words, and what they mean.</h2>
          <p className="lede mt-5">Each house name stands for a precise piece of work. The plain term is always alongside it.</p>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[34rem] text-left text-sm">
              <thead className="text-[0.8125rem] text-mute">
                <tr className="border-b border-[var(--line-strong)]"><th className="py-3 pr-6 font-bold">House name</th><th className="py-3 pr-6 font-bold">Plain term</th><th className="py-3 font-bold">Kind</th></tr>
              </thead>
              <tbody className="divide-y divide-[var(--line)]">
                <tr><td className="display py-3 pr-6 text-xl">{practice.house}</td><td className="py-3 pr-6">{practice.plain}</td><td className="py-3 text-mute">Practice</td></tr>
                {nodes.filter((n) => n.layer === 'discipline').map((d) => (
                  <tr key={d.id}><td className="display py-3 pr-6 text-xl">{d.label}</td><td className="py-3 pr-6">{d.plain}</td><td className="py-3 text-mute">Discipline</td></tr>
                ))}
                {services.map((s) => (
                  <tr key={s.slug}><td className="display py-3 pr-6 text-xl"><Link className="link-u inline-block py-2" href={`/${s.slug}/`}>{s.house}</Link></td><td className="py-3 pr-6">{s.name}</td><td className="py-3 text-mute">Service</td></tr>
                ))}
                {settings.map((s) => (
                  <tr key={s.slug}><td className="display py-3 pr-6 text-xl"><Link className="link-u inline-block py-2" href={`/settings/${s.slug}/`}>{s.house}</Link></td><td className="py-3 pr-6">{s.plain}</td><td className="py-3 text-mute">Setting</td></tr>
                ))}
                {business.journey.map((j) => (
                  <tr key={j.step}><td className="display py-3 pr-6 text-xl">{j.step}</td><td className="py-3 pr-6">{j.plain}</td><td className="py-3 text-mute">Journey</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <CtaBand title="Start from your Oklahoma reality." />
    </>
  );
}
