
"use client";

import { Check, ShoppingCart } from 'lucide-react';
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
            "relative bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col transition-all duration-300 hover:border-white/30 hover:scale-105",
            shadow,
            isPopular ? 'border-purple-500 border-2 shadow-lg shadow-purple-500/40' : 'hover:shadow-lg'
        )}>
            {isPopular && (
                <div className="absolute top-0 right-4 md:right-8 -translate-y-1/2 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                </div>
            )}
            <div className="flex-grow">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{name}</h3>
                <p className="text-gray-400 text-sm md:text-base mb-4 md:mb-6">{description}</p>
                <div className="mb-6 md:mb-8">
                    <span className="text-4xl md:text-5xl font-extrabold text-white">{price}</span>
                    <span className="text-base md:text-lg text-gray-400">{pricePeriod}</span>
                </div>
                <ul className="space-y-3 text-left mb-6 md:mb-8">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-300 text-sm">
                            <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex items-center gap-2">
                <Button size="lg" className={cn(
                    "w-full font-bold text-base md:text-lg bg-gradient-to-r text-white transition-all duration-300 hover:shadow-xl",
                    gradient,
                    'hover:scale-105'
                )}>
                    {buttonText}
                </Button>
                <Button size="icon" className={cn(
                    "h-11 w-11 md:h-12 md:w-12 flex-shrink-0 bg-gradient-to-r text-white transition-all duration-300 hover:shadow-xl",
                    gradient,
                    'hover:scale-105'
                )} aria-label="Add to cart">
                    <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />
                </Button>
            </div>
        </div>
    );
};
