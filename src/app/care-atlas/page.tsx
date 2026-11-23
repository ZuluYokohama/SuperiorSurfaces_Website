import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaBand } from '@/components/Blocks';
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
          <h1 className="display text-[length:var(--step-5)]">The Care Atlas<span className="t-lede tone-2 mt-5 block font-sans font-normal [font-stretch:100%] leading-normal tracking-normal">Local conditions, global discipline: how Oklahoma affects a finish, and what answers it.</span></h1>
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
          <h2 className="t-h2">The full lexicon</h2>
          <div className="mt-10 grid gap-12 md:grid-cols-2 xl:grid-cols-3">
            {layers.map((l) => (
              <div key={l.id}>
                <h3><span className="t-name block">{l.title}</span><span className="t-small tone-2 mt-1 block">{l.scope}</span></h3>
                <dl className="mt-6 space-y-5">
                  {nodes.filter((n) => n.layer === l.id).map((n) => (
                    <div key={n.id} className="border-t border-[var(--line)] pt-4">
                      <dt className="font-semibold">{n.href ? <Link className="link-u inline-block py-2" href={n.href}>{n.label}</Link> : n.label}</dt>
                      <dd className="mt-1 t-small leading-relaxed tone-2">{n.gloss}</dd>
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
          <h2 className="t-h2 max-w-3xl">Our words and what they mean</h2>
          <p className="lede mt-5">Each house name stands for a precise piece of work. The plain term is always alongside it.</p>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[34rem] text-left t-small">
              <thead className="t-small text-mute">
                <tr className="border-b border-[var(--line-strong)]"><th className="py-3 pr-6 font-semibold">House name</th><th className="py-3 pr-6 font-semibold">Plain term</th><th className="py-3 font-semibold">Kind</th></tr>
              </thead>
              <tbody className="divide-y divide-[var(--line)]">
                <tr><td className="t-name py-3 pr-6">{practice.house}</td><td className="py-3 pr-6">{practice.plain}</td><td className="py-3 text-mute">Practice</td></tr>
                {nodes.filter((n) => n.layer === 'discipline').map((d) => (
                  <tr key={d.id}><td className="t-name py-3 pr-6">{d.label}</td><td className="py-3 pr-6">{d.plain}</td><td className="py-3 text-mute">Discipline</td></tr>
                ))}
                {services.map((s) => (
                  <tr key={s.slug}><td className="t-name py-3 pr-6"><Link className="link-u inline-block py-2" href={`/${s.slug}/`}>{s.house}</Link></td><td className="py-3 pr-6">{s.name}</td><td className="py-3 text-mute">Service</td></tr>
                ))}
                {settings.map((s) => (
                  <tr key={s.slug}><td className="t-name py-3 pr-6"><Link className="link-u inline-block py-2" href={`/settings/${s.slug}/`}>{s.house}</Link></td><td className="py-3 pr-6">{s.plain}</td><td className="py-3 text-mute">Setting</td></tr>
                ))}
                {business.journey.map((j) => (
                  <tr key={j.step}><td className="t-name py-3 pr-6">{j.step}</td><td className="py-3 pr-6">{j.plain}</td><td className="py-3 text-mute">Journey</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <CtaBand title="Start from your Oklahoma reality" />
    </>
  );
}
