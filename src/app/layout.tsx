import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/header';
import Footer from '@/components/footer';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';

export const metadata: Metadata = {
  title: 'LoQ Capital Markets Clone',
  description: 'A clone of the LoQ Capital Markets About Us page.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Inter:wght@400;500;600&family=Noto+Serif:wght@400;700&family=PT+Sans:wght@400;700&family=Playfair+Display:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
          <Header />
          <main>{children}</main>
          <Footer />
          <Toaster />
          <ScrollToTopButton />
      </body>
    </html>
  );
}
