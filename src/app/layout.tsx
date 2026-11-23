import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ActionBar } from '@/components/ActionBar';
import { JsonLd } from '@/components/Blocks';
import { business } from '@/content/business';
import { organizationLd } from '@/content/schema';
import { asset } from '@/lib/asset';
import localFont from 'next/font/local';

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: {
    default: 'OKC Onsite Detailing | Aircraft, Marine & Automotive Detailing, Oklahoma City',
    template: '%s | OKC Onsite Detailing',
  },
  description:
    'Paint correction, ceramic coating, paint protection film, window tint and mobile detailing for automobiles, aircraft, boats and coaches across Oklahoma City, performed at your home, hangar or marina.',
  openGraph: { type: 'website', siteName: business.name, images: [{ url: asset('/brand/og.jpg'), width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image' },
  icons: { icon: asset('/brand/favicon-32.png'), apple: asset('/brand/apple-touch-icon.png') },
  alternates: { canonical: '/' },
  ...(process.env.NEXT_PUBLIC_NOINDEX === 'true' && { robots: { index: false, follow: false } }),
};

export const viewport: Viewport = { themeColor: '#0b0c0e', colorScheme: 'dark' };

// Archivo, Latin subset, width 62–125% and weight 100–900. next/font self-hosts it,
// preloads it with the document and applies the deployment base path.
const archivo = localFont({
  src: './fonts/archivo-latin-wdth.woff2',
  variable: '--font-archivo',
  weight: '100 900',
  display: 'swap',
  declarations: [{ prop: 'font-stretch', value: '62% 125%' }],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={archivo.variable}>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <div aria-hidden className="h-[calc(3.5rem+env(safe-area-inset-bottom))] lg:hidden" />
        <ActionBar />
        <JsonLd data={organizationLd()} />
      </body>
    </html>
  );
}
