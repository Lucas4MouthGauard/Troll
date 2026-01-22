import './globals.css';
import type { Metadata, Viewport } from 'next';
import { siteUrl } from '@/lib/config';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'A troll wearing a hat',
    template: '%s — A troll wearing a hat',
  },
  description:
    'troll is a troll+pill meme generator. Flat yellow, thick outline, instant exports. Take the pill, make them cope.',
  openGraph: {
    type: 'website',
    title: 'troll',
    description: 'Generate. Share. Multiply.',
    images: ['/og-pill-yellow.png'],
    url: '/',
  },
  icons: {
    icon: '/images/btroll.jpg',
    shortcut: '/images/btroll.jpg',
    apple: '/images/btroll.jpg',
  },
};

export const viewport: Viewport = {
  themeColor: '#FFD400',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/images/btroll.jpg" />
        <link rel="shortcut icon" href="/images/btroll.jpg" />
        <link rel="apple-touch-icon" href="/images/btroll.jpg" />
      </head>
      <body>{children}</body>
    </html>
  );
}