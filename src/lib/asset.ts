/**
 * Prefix for static files when the site is served from a sub-path
 * (e.g. GitHub Pages: /SuperiorSurfaces_Website). Empty on a custom domain.
 * next/link handles routes automatically; raw <img>, CSS url() and metadata paths need this.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
export const asset = (path: string) => `${basePath}${path}`;
