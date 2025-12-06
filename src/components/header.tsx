
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
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

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '#', label: 'Services' },
  { href: '#', label: 'Pricing' },
  { href: '#', label: 'Payment' },
  { href: '#', label: 'Investor Charter' },
  { href: '#', label: 'Contact Us' },
  { href: '#', label: 'Blog' },
];

const moreLinksCol1 = [
    { href: '#', label: 'Complaints' },
    { href: '#', label: 'Disclaimer' },
    { href: '#', label: 'Disclosure' },
];

const moreLinksCol2 = [
    { href: '#', label: 'Performance & Reports' },
    { href: '#', label: 'Refund Policy' },
    { href: '#', label: 'Terms & Conditions' },
];


export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const logo = PlaceHolderImages.find(p => p.id === 'logo');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLink = ({ href, label, className }: { href: string; label: string; className?: string }) => {
    const isActive = pathname === href;
    return (
      <Link href={href} className={cn(
        "relative group font-headline text-sm uppercase tracking-wider transition-colors whitespace-nowrap",
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
  
  const MobileNavLink = ({ href, label }: { href: string; label: string; }) => {
     const isActive = pathname === href;
    return (
        <SheetClose asChild>
          <Link href={href} className={cn(
            "block py-3 text-lg text-center font-headline font-headline",
            isActive ? "text-bright-accent" : "text-foreground"
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
        <div className="flex items-center justify-between h-20">
          <div className="flex-1">
            <Link href="/" className="flex items-center">
              {logo && (
                <Image
                  src={logo.imageUrl}
                  alt={logo.description}
                  data-ai-hint={logo.imageHint}
                  width={40}
                  height={40}
                  priority
                  className={cn('brightness-0 invert rounded-full')}
                />
              )}
            </Link>
          </div>

          <nav className="hidden md:flex flex-1 justify-center items-center space-x-6">
            {navLinks.map(link => (
              <NavLink 
                key={link.label}
                href={link.href}
                label={link.label}
              />
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative group font-headline text-sm uppercase tracking-wider transition-colors text-white hover:text-bright-accent font-normal focus-visible:ring-0 focus-visible:ring-offset-0 p-0 hover:bg-transparent">
                  More
                  <span className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-bright-accent transition-all duration-300 ease-in-out w-0 group-hover:w-full"
                  )}></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/70 border-gray-700 p-4 min-w-[30rem]">
                <div className="grid grid-cols-2 gap-x-8">
                    <ul className="space-y-2">
                        {moreLinksCol1.map(link => (
                            <li key={link.label}>
                                <DropdownMenuItem asChild className="p-0 focus:bg-transparent">
                                    <NavLink href={link.href} label={link.label} className="text-white"/>
                                </DropdownMenuItem>
                            </li>
                        ))}
                    </ul>
                    <ul className="space-y-2">
                        {moreLinksCol2.map(link => (
                             <li key={link.label}>
                                <DropdownMenuItem asChild className="p-0 focus:bg-transparent">
                                    <NavLink href={link.href} label={link.label} className="text-white"/>
                                </DropdownMenuItem>
                            </li>
                        ))}
                    </ul>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="md:hidden flex-1 flex justify-end">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={cn('text-white hover:text-bright-accent hover:bg-transparent')}>
                  <Menu size={28} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80vw] bg-black/80 backdrop-blur-md">
                 <div className="mt-12 flex flex-col gap-4">
                    {[...navLinks, ...moreLinksCol1, ...moreLinksCol2].map(link => <MobileNavLink key={link.label} href={link.href} label={link.label} />)}
                 </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
