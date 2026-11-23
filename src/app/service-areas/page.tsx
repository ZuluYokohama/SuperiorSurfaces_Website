import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaBand, Eyebrow } from '@/components/Blocks';
import { Photo } from '@/components/Photo';
import { areas } from '@/content/areas';

export const metadata: Metadata = {
  title: 'Service Areas: Oklahoma City, Edmond, Nichols Hills, Arcadia & Yukon',
  description: 'Mobile detailing, paint correction, ceramic coating and tint across Oklahoma City, Edmond, Nichols Hills, Arcadia and Yukon. We come to you.',
  alternates: { canonical: '/service-areas/' },
};

export default function Areas() {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-40">
        <div className="wrap max-w-4xl">
          <Eyebrow>Service areas</Eyebrow>
          <h1 className="display mt-5 text-[clamp(2.8rem,6vw,5.4rem)]">Wherever it <em>lives</em>.</h1>
          <p className="lede mt-6">We’re fully mobile across Oklahoma City and its neighbouring communities, at the residence, the office, the hangar or the lake.</p>
        </div>
      </section>
      <section className="pb-24">
        <div className="wrap grid gap-5 md:grid-cols-2">
          {areas.map((a) => (
            <Link key={a.slug} href={`/service-areas/${a.slug}/`} className="group relative block aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--line)]">
              <Photo slug={a.image} fill sizes="(min-width:768px) 50vw, 100vw" imgClassName="transition duration-[1.2s] group-hover:scale-[1.04]" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <h2 className="display text-4xl">{a.name}, OK</h2>
                <p className="mt-2 max-w-md text-sm text-bone/75">{a.note}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
