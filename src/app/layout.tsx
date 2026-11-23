import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/Blocks';
import { business } from '@/content/business';
import { organizationLd } from '@/content/schema';

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: {
    default: 'OKC Onsite Detailing | Aircraft, Marine & Automotive Detailing, Oklahoma City',
    template: '%s | OKC Onsite Detailing',
  },
  description:
    'Paint correction, ceramic coating, paint protection film, window tint and mobile detailing for automobiles, aircraft, boats and coaches across Oklahoma City, performed at your home, hangar or marina.',
  openGraph: { type: 'website', siteName: business.name, images: [{ url: '/brand/og.jpg', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/brand/favicon-32.png', apple: '/brand/apple-touch-icon.png' },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = { themeColor: '#0b0c0e', colorScheme: 'dark' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US">
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={organizationLd()} />
      </body>
    </html>
  );
}
