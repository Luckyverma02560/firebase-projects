import type {Metadata} from 'next';
import { Cinzel, Inter, Noto_Serif, PT_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/header';
import Footer from '@/components/footer';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import { CartProvider } from '@/context/cart-context';
import { ServiceProvider } from '@/context/service-context';
import { cn } from '@/lib/utils';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-playfair-display',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-cinzel',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
});

const notoSerif = Noto_Serif({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-noto-serif',
});


export const metadata: Metadata = {
  title: 'EL11VEN HUB',
  description: 'Your Gateway to Ultimate Streaming Experience',
};
<meta name="google-site-verification" content="DWlSbvZKyN7Q0_5hhkF7yvoIIELBF1_alXzNmy9cQM0" />

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth dark" suppressHydrationWarning>
      <body className={cn("font-body antialiased", ptSans.variable, playfairDisplay.variable, cinzel.variable, inter.variable, notoSerif.variable)} suppressHydrationWarning>
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
