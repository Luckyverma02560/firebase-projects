
"use client";

import Image from 'next/image';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { MessageSquare, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ServiceCardProps {
    name: string;
    logoUrl: string;
    logoHint: string;
}

export const ServiceCard = ({ name, logoUrl, logoHint }: ServiceCardProps) => {
    const isPrime = name === 'Prime Video';
    const isHotstar = name === 'Disney+ Hotstar';
    const isZee = name === 'ZEE5';
    const isYoutube = name === 'Youtube Premium';
    const isNetflix = name === 'Netflix';
    const isSony = name === 'SONY';
    const isPlayBox = name === 'PlayBox TV';
    const isCanva = name === 'Canva';
    
    const whatsappNumber = "918600070638";
    const message = `Hello, I want more information about "${name}" Plans.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className={cn(
            "relative group overflow-hidden bg-gradient-angled backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between transition-all duration-300 hover:border-white/30 w-full max-w-4xl mx-auto gap-4"
        )}>
            <div className="light-streak" />
            <div className="flex items-center justify-start gap-4 md:gap-2 mb-4 md:mb-0 flex-1 w-full md:w-auto">
                <Image
                    src={logoUrl}
                    alt={`${name} logo`}
                    data-ai-hint={logoHint}
                    width={isHotstar || isZee || isPrime || isYoutube || isNetflix || isSony || isPlayBox || isCanva ? 56 : 80}
                    height={isHotstar || isZee || isPrime || isYoutube || isNetflix || isSony || isPlayBox || isCanva ? 56 : 80}
                    className={cn("object-contain w-14 h-14", isYoutube ? 'rounded-full' : '', isSony ? 'rounded-full' : '', isCanva ? 'rounded-full' : '')}
                />
                {isNetflix && (
                    <svg viewBox="0 0 120 40" className="w-28 md:w-32 h-auto overflow-visible -ml-2">
                        <defs>
                            <path id="netflix-curve" d="M -5,45 C 60,25 120,25 185,45" />
                        </defs>
                        <text className="font-bebas-neue text-3xl font-bold fill-netflix-red uppercase tracking-wider" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.4)" }}>
                            <textPath href="#netflix-curve" startOffset="50%" textAnchor="middle">
                                NETFLIX
                            </textPath>
                        </text>
                    </svg>
                )}
                {isPrime && (
                    <div className="flex flex-col justify-center ml-2 md:ml-4">
                        <span className="font-sharp-sans text-2xl md:text-3xl tracking-wider flex items-center gap-1">
                            <span className="text-prime-blue">prime</span>
                            <span className="text-white">video</span>
                        </span>
                    </div>
                )}
                {isHotstar && (
                     <div className="flex flex-col justify-center ml-2 md:ml-4">
                        <span className="font-sharp-sans text-xl md:text-2xl tracking-wider flex items-center">
                            <span className="text-white">Disney+</span>
                        </span>
                    </div>
                )}
                {isZee && (
                     <div className="flex flex-col justify-center ml-2 md:ml-4">
                        <span className="font-sharp-sans text-xl md:text-2xl tracking-wider flex items-center">
                            <span className="text-white">ZEE</span>
                            <span className="text-white">5</span>
                        </span>
                    </div>
                )}
                {isYoutube && (
                    <div className="flex flex-col justify-center ml-2 md:ml-4">
                       <span className="font-sharp-sans text-xl md:text-2xl tracking-wider flex items-center font-semibold">
                           <span className="text-white">YouTube</span>
                           <span className="text-youtube-red ml-1">Premium</span>
                       </span>
                   </div>
                )}
                 {isSony && (
                    <div className="flex flex-col justify-center ml-2 md:ml-4">
                       <span className="font-clarendon text-xl md:text-2xl tracking-wider flex items-center">
                           <span className="text-white">SONY</span>
                       </span>
                   </div>
                )}
                 {isPlayBox && (
                    <div className="flex flex-col justify-center ml-2 md:ml-4">
                       <span className="font-sharp-sans text-xl md:text-2xl tracking-wider flex items-center">
                           <span className="font-bold">Play</span>
                           <span>Box</span>
                           <span className="font-bold ml-1">TV</span>
                       </span>
                   </div>
                )}
                 {isCanva && (
                    <div className="flex flex-col justify-center ml-2 md:ml-4">
                       <span className="font-sharp-sans text-xl md:text-2xl tracking-wider flex items-center">
                           <span className="text-white">Canva</span>
                       </span>
                   </div>
                )}
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
                 <Button asChild variant="outline" size="sm" className="bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white w-full sm:w-auto">
                    <Link href={whatsappUrl} target="_blank">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Chat Support
                    </Link>
                </Button>
                <Button
                    asChild
                    size="sm"
                    className={cn(
                        "font-bold text-base text-white transition-all duration-300 hover:shadow-xl bg-gradient-view-plans w-full sm:w-auto",
                        'hover:scale-105'
                    )}
                >
                    <Link href={`/about?service=${encodeURIComponent(name)}`}>
                        View Plans <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    );
};
