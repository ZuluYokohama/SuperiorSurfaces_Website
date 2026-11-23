import type { NextConfig } from 'next';

const config: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // Set for sub-path hosting such as GitHub Pages (e.g. /SuperiorSurfaces_Website); empty for a custom domain.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  reactStrictMode: true,
};
export default config;
