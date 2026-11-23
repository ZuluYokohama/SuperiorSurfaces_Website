import { Photo } from './Photo';
import { Eyebrow } from './Blocks';

const frames = [
  { slug: 'jet-wing-technician', caption: 'Across the upper wing, by hand' },
  { slug: 'wheel-hand-detail', caption: 'Wheel faces, one spoke at a time' },
  { slug: 'combine-detail', caption: 'A combine, finished like a coach' },
  { slug: 'jet-engine-tech', caption: 'Engine nacelle, final wipe' },
];

/** Visible human craft raises perceived value (Fuchs, Schreier & van Osselaer 2015). */
export function ByHand() {
  return (
    <section className="py-24 md:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4 lg:pt-6">
          <Eyebrow>By hand</Eyebrow>
          <h2 className="display mt-5 text-4xl md:text-6xl">Nothing here is done by a <em>tunnel</em>.</h2>
          <p className="lede mt-6">
            Every surface is worked by a person who can see it, feel it and stop when it’s right. These are our technicians, photographed at work, without retouching.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:col-span-8">
          {frames.map((fr, i) => (
            <figure key={fr.slug} className={`relative overflow-hidden rounded-xl ${i === 0 ? 'row-span-2 aspect-[3/4] sm:aspect-auto' : 'aspect-[4/3]'}`}>
              <Photo slug={fr.slug} fill sizes="(min-width:1024px) 30vw, 50vw" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-4 text-xs text-bone/85">{fr.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
