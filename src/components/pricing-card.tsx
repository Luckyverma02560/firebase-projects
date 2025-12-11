
"use client";

import { Check, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

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
    serviceName: string | null;
    billingCycle: string;
}

export const PricingCard = ({ name, price, pricePeriod, description, features, buttonText, gradient, shadow, isPopular = false, serviceName, billingCycle }: PricingCardProps) => {
    const { addToCart } = useCart();
    const { toast } = useToast();

    const handleAddToCart = () => {
        const item = {
            id: `${serviceName}-${name}-${price}`,
            name: `${serviceName} - ${name}`,
            price: parseFloat(price.replace('INR ', '')),
            period: pricePeriod,
            quantity: 1,
        };
        addToCart(item);
        toast({
            title: "Added to cart",
            description: `${name} has been added to your cart.`,
        });
    };

    const priceParts = price.split(' ');
    const currency = priceParts.length > 1 ? priceParts[0] : '';
    const amount = priceParts.length > 1 ? priceParts.slice(1).join(' ') : price;

    const whatsappNumber = "918600070638";
    const message = `Hey, I Need the ${serviceName} ${name} (${billingCycle}). Kindly Reach Me Soon.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    return (
        <div className={cn(
            "relative bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex flex-col transition-all duration-300 hover:border-white/30 hover:scale-105",
            shadow,
            isPopular ? 'border-purple-500 border-2 shadow-lg shadow-purple-500/40' : 'hover:shadow-lg'
        )}>
            {isPopular && (
                <div className="absolute top-0 right-4 -translate-y-1/2 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                </div>
            )}
            <div className="flex-grow p-2 sm:p-0">
                <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
                <p className="text-gray-400 text-sm mb-2">{description}</p>
                <div className="mb-3">
                    <span className="text-4xl font-extrabold text-white">
                        {currency && <span className="font-headline text-3xl mr-1">{currency}</span>}
                        {amount}
                    </span>
                    <span className="text-sm text-gray-400">{pricePeriod}</span>
                </div>
                <ul className="space-y-1 text-left mb-4">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-300 text-sm">
                            <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex items-center gap-2">
                <Button asChild size="lg" className={cn(
                    "w-full font-bold text-lg bg-gradient-to-r text-white transition-all duration-300 hover:shadow-xl",
                    gradient,
                    'hover:scale-105'
                )}>
                     <Link href={whatsappUrl} target="_blank">
                        {buttonText}
                    </Link>
                </Button>
                <Button 
                    size="icon" 
                    className={cn(
                        "h-11 w-11 flex-shrink-0 bg-gradient-to-r text-white transition-all duration-300 hover:shadow-xl",
                        gradient,
                        'hover:scale-105'
                    )} 
                    aria-label="Add to cart"
                    onClick={handleAddToCart}
                >
                    <ShoppingCart className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
};
