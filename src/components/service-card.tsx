
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
            "relative bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex items-center justify-between transition-all duration-300 hover:border-white/30 w-full"
        )}>
            <div className="flex items-center gap-6">
                <Image
                    src={logoUrl}
                    alt={`${name} logo`}
                    data-ai-hint={logoHint}
                    width={120}
                    height={60}
                    className="object-contain"
                />
                <div>
                    <h3 className="font-bebas-neue text-6xl font-bold text-netflix-red uppercase tracking-wider" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.4)' }}>{name}</h3>
                </div>
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

    