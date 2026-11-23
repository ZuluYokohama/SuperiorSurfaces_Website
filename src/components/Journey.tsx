import { business } from '@/content/business';

/** The client journey from first request to aftercare: certainty about what happens next. */
export function Journey({ tone = 'dark' }: { tone?: 'dark' | 'paper' }) {
  const muted = tone === 'paper' ? 'text-ink/70' : 'text-bone/70';
  return (
    <div>
      <ol className="grid gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] md:grid-cols-5">
        {business.journey.map((j, i) => (
          <li key={j.step} className={`${tone === 'paper' ? 'bg-paper' : 'bg-ink-2'} p-6`}>
            <span className="text-sm font-medium tabular-nums opacity-70">0{i + 1}</span>
            <h3 className="mt-3">
              <span className="display block text-2xl">{j.step}</span>
              <span className="mt-1 block text-[0.9375rem] opacity-75">{j.plain}</span>
            </h3>
            <p className={`mt-2 text-sm leading-relaxed ${muted}`}>{j.detail}</p>
          </li>
        ))}
      </ol>
      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.8125rem] font-bold opacity-80">
        {business.guarantees.map((g) => (
          <li key={g} className="flex items-center gap-2"><span aria-hidden className="h-px w-3 bg-current opacity-50" />{g}</li>
        ))}
      </ul>
    </div>
  );
}
