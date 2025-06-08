import type { Metadata } from 'next';
import { Source_Sans_3 } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { siteData } from '@/lib/siteData';

const sourceSans3 = Source_Sans_3({
  weight: ['400', '600', '700'],
  variable: '--font-source-sans-pro',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: siteData.name,
    template: `%s | ${siteData.name}`,
  },
  description: siteData.description,
  keywords: ['allergy', 'food safety', 'AI', 'ingredient analysis'],
  authors: [{ name: siteData.name }],
  creator: siteData.name,
  publisher: siteData.legal.company,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('allergy-agents-theme') === 'dark') {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${sourceSans3.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
