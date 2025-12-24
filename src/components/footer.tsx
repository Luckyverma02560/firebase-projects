
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Facebook, Instagram, MessageSquare, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Footer() {
  const logo = PlaceHolderImages.find(p => p.id === 'logo');

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'Plans' },
    { href: '/payment', label: 'Payment' },
    { href: '/cart', label: 'Cart' },
    { href: '/admin', label: 'Control Panel' },
  ];

  const whatsappNumber = "918600070638";
  const message = `Hello, I'm visiting your site and have a question.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  const socialLinks = [
    { href: whatsappUrl, icon: MessageSquare, 'aria-label': 'WhatsApp' },
    { href: 'https://t.me/el11ven_hub', icon: Send, 'aria-label': 'Telegram' },
    { href: 'https://www.facebook.com/people/El11ven-Hub/61585139540594', icon: Facebook, 'aria-label': 'Facebook' },
    { href: 'https://www.instagram.com/el11ven.hub/', icon: Instagram, 'aria-label': 'Instagram' },
  ];

  return (
    <footer className="bg-transparent text-foreground/90 relative z-10">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
              Your Gateway to Ultimate Streaming Experience. Get premium subscriptions at unbeatable prices.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  className="text-foreground/60 hover:text-accent transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social['aria-label']}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-span-1">
            <h3 className="text-md font-headline text-gold-accent mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map(link => (
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
          <p>Copyright © 2024 EL11VEN HUB. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
