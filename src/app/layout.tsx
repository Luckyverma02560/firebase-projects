
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/header';
import Footer from '@/components/footer';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import { CartProvider } from '@/context/cart-context';
import { ServiceProvider } from '@/context/service-context';

export const metadata: Metadata = {
  title: 'EL11VEN HUB',
  description: 'Your Gateway to Ultimate Streaming Experience',
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
        <ServiceProvider>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <Toaster />
            <ScrollToTopButton />
          </CartProvider>
        </ServiceProvider>
      </body>
    </html>
  );
}
