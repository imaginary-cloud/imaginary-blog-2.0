import type { Metadata } from 'next';
import { lato } from '@/lib/fonts';
import './globals.scss';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Imaginary Blog',
  description: 'Imaginary Cloud Blog',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <Header />
        <main className="flex align-center mx-auto max-w-[1140px]">{children}</main>
      </body>
    </html>
  );
}
