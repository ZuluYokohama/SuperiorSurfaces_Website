type Tag = 'h1' | 'h2' | 'h3' | 'p';

/**
 * Renders a register name with its plain descriptor directly beneath, inside the same element,
 * so screen readers and search engines always get the plain term (docs/care-atlas.md).
 */
export function HouseName({
  house,
  plain,
  as: As = 'h2',
  className = '',
  houseClassName = 'text-[length:var(--step-4)]',
}: {
  house: string;
  plain: string;
  as?: Tag;
  className?: string;
  houseClassName?: string;
}) {
  return (
    <As className={className}>
      <span className={`display block ${houseClassName}`}>{house}</span>
      <span className="mt-4 block font-sans text-[length:var(--step-1)] font-normal leading-snug text-mute">{plain}</span>
    </As>
  );
}
