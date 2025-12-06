
"use client";

import Image from 'next/image';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
    name: string;
    logoUrl: string;
    logoHint: string;
    onButtonClick: () => void;
}

export const ServiceCard = ({ name, logoUrl, logoHint, onButtonClick }: ServiceCardProps) => {
    return (
        <div className={cn(
            "relative bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center transition-all duration-300 hover:border-white/30 hover:scale-105 shadow-lg hover:shadow-purple-500/30 w-full max-w-sm"
        )}>
            <div className="mb-6">
                <Image
                    src={logoUrl}
                    alt={`${name} logo`}
                    data-ai-hint={logoHint}
                    width={180}
                    height={100}
                    className="object-contain"
                />
            </div>
            <h3 className="text-3xl font-bold text-white mb-6">{name}</h3>
            <Button
                size="lg"
                onClick={onButtonClick}
                className={cn(
                    "w-full font-bold text-lg bg-gradient-to-r text-white transition-all duration-300 hover:shadow-xl from-purple-500 to-violet-600",
                    'hover:scale-105'
                )}
            >
                View Plans
            </Button>
        </div>
    );
};
