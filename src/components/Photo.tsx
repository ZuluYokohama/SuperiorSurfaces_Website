import images from '@/content/images.generated.json';
import { asset } from '@/lib/asset';

type ImageRecord = { alt: string; width: number; height: number; focal: [number, number]; widths: number[]; lqip: string };
const registry = images as unknown as Record<string, ImageRecord>;

export function imageRecord(slug: string) {
  const r = registry[slug];
  if (!r) throw new Error(`Unknown photograph "${slug}"`);
  return r;
}

type Props = {
  slug: string;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  alt?: string;
  /** Fill the parent box (parent must be positioned) instead of using intrinsic ratio. */
  fill?: boolean;
  /**
   * documentary (default): full colour, as photographed, for any proof of work.
   * editorial: monochrome display treatment for atmosphere only (CSS filter; the file is untouched).
   */
  treatment?: 'documentary' | 'editorial';
};

export function Photo({ slug, sizes = '100vw', className = '', imgClassName = '', priority, alt, fill, treatment = 'documentary' }: Props) {
  const r = imageRecord(slug);
  const set = (ext: string) => r.widths.map((w) => `${asset(`/img/${slug}-${w}.${ext}`)} ${w}w`).join(', ');
  const fallback = asset(`/img/${slug}-${r.widths.includes(960) ? 960 : r.widths[0]}.webp`);
  const position = `${Math.round(r.focal[0] * 100)}% ${Math.round(r.focal[1] * 100)}%`;
  return (
    <picture className={`${fill ? 'absolute inset-0' : 'block'} ${className}`}>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img
        src={fallback}
        alt={alt ?? r.alt}
        width={r.width}
        height={r.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        style={{ objectPosition: position, filter: treatment === 'editorial' ? 'grayscale(1) contrast(1.08) brightness(0.9)' : undefined, backgroundImage: `url(${r.lqip})`, backgroundSize: 'cover', backgroundPosition: position }}
        className={`${fill ? 'h-full w-full object-cover' : 'h-auto w-full'} ${imgClassName}`}
      />
    </picture>
  );
}
