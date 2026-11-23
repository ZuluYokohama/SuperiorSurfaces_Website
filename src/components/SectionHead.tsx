/**
 * One way to open a section: a plain heading that carries the information, and an optional
 * short intro. Desktop sets them side by side (heading left, intro aligned to its foot);
 * phones stack them.
 */
export function SectionHead({ title, intro, id, className = '' }: { title: string; intro?: React.ReactNode; id?: string; className?: string }) {
  return (
    <div className={`grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-10 ${className}`}>
      <h2 id={id} className="t-h2 lg:col-span-7">{title}</h2>
      {intro && <div className="t-lede tone-2 lg:col-span-5">{intro}</div>}
    </div>
  );
}
