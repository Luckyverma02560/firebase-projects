
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
    return (
        <div className={cn(
            "relative bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between transition-all duration-300 hover:border-white/30 w-full max-w-4xl mx-auto"
        )}>
            <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-0">
                <Image
                    src={logoUrl}
                    alt={`${name} logo`}
                    data-ai-hint={logoHint}
                    width={80}
                    height={80}
                    className="object-contain"
                />
                <svg viewBox="0 0 400 100" className="w-48 h-auto overflow-visible -ml-2">
                    <defs>
                        <path id="curve" d="M 20,90 C 100,45 300,45 380,90" />
                    </defs>
                    <text className="font-bebas-neue text-6xl font-bold fill-netflix-red uppercase tracking-wider" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.4)" }}>
                        <textPath href="#curve" startOffset="50%" text-anchor="middle">
                            Netflix
                        </textPath>
                    </text>
                </svg>
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
                        "font-bold text-lg bg-gradient-to-r text-white transition-all duration-300 hover:shadow-xl from-purple-500 to-violet-600",
                        'hover:scale-105'
                    )}
                >
                    View Plans
                </Button>
            </div>
        </div>
    );
};
