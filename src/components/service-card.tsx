
"use client";

import Image from 'next/image';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { MessageSquare } from 'lucide-react';

interface ServiceCardProps {
    name: string;
    logoUrl: string;
    logoHint: string;
    onButtonClick: () => void;
}

export const ServiceCard = ({ name, logoUrl, logoHint, onButtonClick }: ServiceCardProps) => {
    const isPrime = name === 'Prime Video';
    const isHotstar = name === 'Disney+ Hotstar';
    const isZee = name === 'ZEE5';
    const isYoutube = name === 'Youtube Premium';
    const isNetflix = name === 'Netflix';
    const isSony = name === 'SONY';
    const isPlayBox = name === 'PlayBox TV';
    const isCanva = name === 'Canva';

    return (
        <div className={cn(
            "relative bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between transition-all duration-300 hover:border-white/30 w-full max-w-4xl mx-auto h-28"
        )}>
            <div className="flex items-center justify-start gap-4 md:gap-2 mb-4 md:mb-0 flex-1">
                <Image
                    src={logoUrl}
                    alt={`${name} logo`}
                    data-ai-hint={logoHint}
                    width={isHotstar || isZee || isPrime || isYoutube || isNetflix || isSony || isPlayBox || isCanva ? 64 : 96}
                    height={isHotstar || isZee || isPrime || isYoutube || isNetflix || isSony || isPlayBox || isCanva ? 64 : 96}
                    className={cn("object-contain w-16 h-16", isYoutube ? 'rounded-full' : '', isSony ? 'rounded-full' : '', isCanva ? 'rounded-full' : '')}
                />
                {isNetflix && (
                    <svg viewBox="0 0 120 40" className="w-32 h-auto overflow-visible -ml-2">
                        <defs>
                            <path id="netflix-curve" d="M -5,25 C 60,5 120,5 185,25" />
                        </defs>
                        <text className="font-bebas-neue text-3xl font-bold fill-netflix-red uppercase tracking-wider" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.4)" }}>
                            <textPath href="#netflix-curve" startOffset="50%" textAnchor="middle">
                                NETFLIX
                            </textPath>
                        </text>
                    </svg>
                )}
                {isPrime && (
                    <div className="flex flex-col justify-center ml-4">
                        <span className="font-sharp-sans text-3xl tracking-wider flex items-center gap-1">
                            <span className="text-prime-blue">prime</span>
                            <span className="text-white">video</span>
                        </span>
                    </div>
                )}
                {isHotstar && (
                     <div className="flex flex-col justify-center ml-4">
                        <span className="font-sharp-sans text-2xl tracking-wider flex items-center">
                            <span className="text-white">Disney+</span>
                        </span>
                    </div>
                )}
                {isZee && (
                     <div className="flex flex-col justify-center ml-4">
                        <span className="font-sharp-sans text-2xl tracking-wider flex items-center">
                            <span className="text-white">ZEE</span>
                            <span className="text-white">5</span>
                        </span>
                    </div>
                )}
                {isYoutube && (
                    <div className="flex flex-col justify-center ml-4">
                       <span className="font-sharp-sans text-2xl tracking-wider flex items-center font-semibold">
                           <span className="text-white">YouTube</span>
                           <span className="text-youtube-red ml-1">Premium</span>
                       </span>
                   </div>
                )}
                 {isSony && (
                    <div className="flex flex-col justify-center ml-4">
                       <span className="font-sharp-sans text-2xl tracking-wider flex items-center">
                           <span className="text-white">SONY</span>
                       </span>
                   </div>
                )}
                 {isPlayBox && (
                    <div className="flex flex-col justify-center ml-4">
                       <span className="font-sharp-sans text-2xl tracking-wider flex items-center">
                           <span className="text-white font-bold">Play</span>
                           <span className="text-white">Box</span>
                           <span className="text-white font-bold ml-2">TV</span>
                       </span>
                   </div>
                )}
                 {isCanva && (
                    <div className="flex flex-col justify-center ml-4">
                       <span className="font-sharp-sans text-2xl tracking-wider flex items-center">
                           <span className="text-white">Canva</span>
                       </span>
                   </div>
                )}
            </div>
            <div className="flex items-center gap-4">
                <Button variant="outline" className="bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Chat Support
                </Button>
                <Button
                    size="lg"
                    onClick={onButtonClick}
                    className={cn(
                        "font-bold text-lg text-white transition-all duration-300 hover:shadow-xl bg-gradient-view-plans",
                        'hover:scale-105'
                    )}
                >
                    View Plans
                </Button>
            </div>
        </div>
    );
};
