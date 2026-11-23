import { business } from '@/content/business';

/** The client journey from first request to aftercare: certainty about what happens next. */
export function Journey({ tone = 'dark' }: { tone?: 'dark' | 'paper' }) {
  const muted = tone === 'paper' ? 'text-ink/70' : 'text-bone/70';
  return (
    <div>
      <ol className="grid gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] md:grid-cols-5">
        {business.journey.map((j, i) => (
          <li key={j.step} className={`${tone === 'paper' ? 'bg-paper' : 'bg-ink-2'} p-6`}>
            <span className="text-xs font-bold tracking-[0.2em] text-signal">0{i + 1}</span>
            <h3 className="mt-3">
              <span className="display block text-2xl">{j.step}</span>
              <span className="mt-1 block text-[0.68rem] font-bold uppercase tracking-[0.14em] text-mute">{j.plain}</span>
            </h3>
            <p className={`mt-2 text-sm leading-relaxed ${muted}`}>{j.detail}</p>
          </li>
        ))}
      </ol>
      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-mute">
        {business.guarantees.map((g) => (
          <li key={g} className="flex items-center gap-2"><span aria-hidden className="h-1 w-3 bg-signal" />{g}</li>
        ))}
      </ul>
    </div>
  );
}
