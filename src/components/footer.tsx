
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Footer() {
  const logo = PlaceHolderImages.find(p => p.id === 'logo');

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '#', label: 'Services' },
    { href: '#', label: 'Pricing' },
    { href: '/payment', label: 'Payment' },
    { href: '#', label: 'Investor Charter' },
    { href: '#', label: 'Blog' },
  ];

  const offeringsLinks = [
    { href: '#', label: 'Equity Research' },
    { href: '#', label: 'Credit Research' },
    { href: '#', label: 'Investment Banking Support' },
    { href: '#', label: 'Financial Modeling' },
  ];

  const socialLinks = [
    { href: '#', icon: Linkedin },
    { href: '#', icon: Twitter },
    { href: '#', icon: Facebook },
    { href: '#', icon: Instagram },
  ];

  return (
    <footer className="bg-transparent text-foreground/90 relative z-10">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Column 1: Logo and About */}
          <div>
            {logo && (
              <Link href="/">
                <Image
                  src={logo.imageUrl}
                  alt={logo.description}
                  data-ai-hint={logo.imageHint}
                  width={40}
                  height={40}
                  className={cn('brightness-0 invert mb-4 rounded-full')}
                />
              </Link>
            )}
            <p className="text-sm leading-relaxed mb-6 text-foreground/70">
              LoQ Capital Markets is a premier provider of research and analytics (R&A) services for financial institutions across the globe.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Link key={index} href={social.href} className="text-foreground/60 hover:text-accent transition-colors">
                  <social.icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-headline text-gold-accent mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-foreground/90 hover:text-accent transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Offerings */}
          <div>
            <h3 className="text-lg font-headline text-gold-accent mb-6">Our Offerings</h3>
            <ul className="space-y-3">
              {offeringsLinks.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-foreground/90 hover:text-accent transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
      <div className="bg-black/20 py-4">
        <div className="container mx-auto px-4 text-center text-xs text-foreground/50">
          <p>Copyright © 2024 LoQ Capital Markets. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
