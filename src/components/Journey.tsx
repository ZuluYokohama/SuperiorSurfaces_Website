import { business } from '@/content/business';

/** The client journey: a real sequence, so it is numbered. */
export function Journey() {
  return (
    <div>
      <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
        {business.journey.map((j, i) => (
          <li key={j.step} className="border-t border-[var(--line-strong)] pt-5">
            <p className="t-small tone-2 tabular-nums">Step {i + 1}</p>
            <h3 className="mt-2">
              <span className="t-name block">{j.step}</span>
              <span className="t-small tone-2 mt-1 block">{j.plain}</span>
            </h3>
            <p className="t-body mt-3">{j.detail}</p>
          </li>
        ))}
      </ol>
      <p className="t-small tone-2 mt-10">{business.guarantees.join('. ')}.</p>
    </div>
  );
}
