
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const homeLink = { href: '/', label: 'Home' };
const plansLink = { href: '/about', label: 'Plans' };
const getStartedLink = { href: '#', label: 'Get Started' };
const cartLink = { href: '/cart', label: 'View Cart' };


const navLinks = [
  { href: '#', label: 'Payment' },
  { href: '#', label: 'Contact Us' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const logo = PlaceHolderImages.find(p => p.id === 'logo');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    // Set initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLink = ({ href, label, className }: { href: string; label: string; className?: string }) => {
    const isActive = pathname === href;
    return (
      <Link href={href} className={cn(
        "relative group font-headline text-base uppercase tracking-wider transition-colors whitespace-nowrap",
        "text-white hover:text-bright-accent",
        isActive ? "text-bright-accent font-bold" : "font-normal",
        className
      )}>
        {label}
        <span className={cn(
            "absolute -bottom-1 left-0 h-0.5 bg-bright-accent transition-all duration-300 ease-in-out",
            isActive ? "w-full" : "w-0 group-hover:w-full"
        )}></span>
      </Link>
    );
  };
  
  const MobileNavLink = ({ href, label, isButton = false, isGetStarted = false }: { href: string; label: string; isButton?: boolean; isGetStarted?: boolean; }) => {
     const isActive = pathname === href;
    return (
        <SheetClose asChild>
          <Link href={href} className={cn(
            "block py-3 text-xl text-center font-headline rounded-md",
            isButton ? "bg-gradient-plans text-white" : 
            (isGetStarted ? "bg-gradient-get-started text-white" : 
            (isActive ? "text-bright-accent" : "text-foreground"))
            )}>
              {label}
          </Link>
        </SheetClose>
    );
  };


  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-black/40 shadow-md backdrop-blur-[20px]" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              {logo && (
                <Image
                  src={logo.imageUrl}
                  alt={logo.description}
                  data-ai-hint={logo.imageHint}
                  width={72}
                  height={72}
                  priority
                  className={cn('rounded-full')}
                />
              )}
            </Link>
          </div>

          <nav className="hidden md:flex flex-1 justify-center items-center space-x-6">
            <NavLink 
                key={homeLink.label}
                href={homeLink.href}
                label={homeLink.label}
              />
            <Button asChild className="font-headline text-base uppercase tracking-wider bg-gradient-plans text-white font-bold shadow-[0_0_15px_rgba(252,70,107,0.5)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(252,70,107,0.8)] hover:scale-105">
                <Link href={plansLink.href}>{plansLink.label}</Link>
            </Button>
            {navLinks.map(link => (
              <NavLink 
                key={link.label}
                href={link.href}
                label={link.label}
              />
            ))}
          </nav>
          
          <div className="hidden md:flex flex-shrink-0 justify-end items-center gap-4">
            <Button asChild className="font-headline text-base uppercase tracking-wider bg-gradient-get-started text-white font-bold shadow-[0_0_15px_rgba(52,148,230,0.5)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(236,110,173,0.8)] hover:scale-105">
                <Link href={getStartedLink.href}>{getStartedLink.label}</Link>
            </Button>
            <Button asChild variant="outline" size="icon" className="text-white border-gold-accent hover:bg-gold-accent/20 hover:text-white transition-colors duration-300">
                <Link href={cartLink.href}>
                    <ShoppingCart />
                    <span className="sr-only">{cartLink.label}</span>
                </Link>
            </Button>
          </div>

          <div className="md:hidden flex-1 flex justify-end">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={cn('text-white hover:text-bright-accent hover:bg-transparent')}>
                  <Menu size={32} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80vw] bg-black/80 backdrop-blur-md flex flex-col justify-center">
                 <div className="flex flex-col gap-4">
                    <MobileNavLink key={homeLink.label} href={homeLink.href} label={homeLink.label} />
                    <MobileNavLink key={plansLink.label} href={plansLink.href} label={plansLink.label} isButton />
                    {navLinks.map(link => <MobileNavLink key={link.label} href={link.href} label={link.label} />)}
                     <SheetClose asChild>
                        <Link href={cartLink.href} className="flex items-center justify-center gap-2 py-3 text-xl text-center font-headline rounded-md text-foreground">
                            <ShoppingCart />
                            <span>{cartLink.label}</span>
                        </Link>
                    </SheetClose>
                    <div className="pt-4">
                      <MobileNavLink href={getStartedLink.href} label={getStartedLink.label} isGetStarted />
                    </div>
                 </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
