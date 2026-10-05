import { DM_Sans, Outfit } from 'next/font/google';
import './globals.css';

// Outfit variable font — full weight axis 100..900
const outfit = Outfit({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-outfit',
  display: 'swap',
});

// DM Sans — only used for small print (e.g. the hero prescription disclaimer)
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata = {
  title: 'Canxiol — Heal The Way You Feel | Leiutis',
  description: 'Canxiol is a prescription cannabidiol oral solution for management of mild to moderate anxiety disorders.',
  icons: {
    icon: '/images/tab%20logo.png',
    apple: '/images/tab%20logo.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
