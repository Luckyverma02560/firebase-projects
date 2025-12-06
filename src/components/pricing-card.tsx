
"use client";

import { Check } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface PricingCardProps {
    name: string;
    price: string;
    pricePeriod: string;
    description: string;
    features: string[];
    buttonText: string;
    gradient: string;
    shadow: string;
    isPopular?: boolean;
}

export const PricingCard = ({ name, price, pricePeriod, description, features, buttonText, gradient, shadow, isPopular = false }: PricingCardProps) => {
    return (
        <div className={cn(
            "relative bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 flex flex-col transition-all duration-300 hover:border-white/30 hover:scale-105",
            shadow,
            isPopular ? 'border-purple-500 border-2 shadow-lg shadow-purple-500/40' : 'hover:shadow-lg'
        )}>
            {isPopular && (
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-purple-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                </div>
            )}
            <div className="flex-grow">
                <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
                <p className="text-gray-400 mb-6">{description}</p>
                <div className="mb-8">
                    <span className="text-5xl font-extrabold text-white">{price}</span>
                    <span className="text-lg text-gray-400">{pricePeriod}</span>
                </div>
                <ul className="space-y-4 text-left mb-8">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-300">
                            <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <Button size="lg" className={cn(
                "w-full font-bold text-lg bg-gradient-to-r text-white transition-all duration-300 hover:shadow-xl",
                gradient,
                'hover:scale-105'
            )}>
                {buttonText}
            </Button>
        </div>
    );
};
