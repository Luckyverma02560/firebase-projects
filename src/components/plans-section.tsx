
"use client";

import { useState } from 'react';
import { PricingCard } from './pricing-card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from '@/lib/utils';

const plans = [
    {
        name: 'Basic Plan',
        description: 'Ideal for individuals starting out',
        features: [
            'Access to 2 devices',
            'Full HD (1080p) streaming',
            'Basic support'
        ],
        prices: {
            monthly: { price: '₹149', period: '/month' },
            'half-yearly': { price: '₹849', period: '/6mo' },
            yearly: { price: '₹1599', period: '/yr' }
        },
        buttonText: 'Choose Basic',
        gradient: 'from-blue-500 to-indigo-600',
        shadow: 'shadow-blue-500/30'
    },
    {
        name: 'Standard Plan',
        description: 'Perfect for families and small groups',
        features: [
            'Access to 4 devices',
            'Ultra HD (4K) streaming',
            'Priority support',
            'Early access to new shows'
        ],
        prices: {
            monthly: { price: '₹299', period: '/month' },
            'half-yearly': { price: '₹1699', period: '/6mo' },
            yearly: { price: '₹3299', period: '/yr' }
        },
        buttonText: 'Choose Standard',
        gradient: 'from-purple-500 to-violet-600',
        shadow: 'shadow-purple-500/30',
        isPopular: true
    },
    {
        name: 'Premium Plan',
        description: 'For the ultimate streaming enthusiasts',
        features: [
            'Access to 8 devices',
            'Ultra HD (4K) + HDR streaming',
            '24/7 dedicated support',
            'Offline downloads',
            'Exclusive content access'
        ],
        prices: {
            monthly: { price: '₹499', period: '/month' },
            'half-yearly': { price: '₹2899', period: '/6mo' },
            yearly: { price: '₹5499', period: '/yr' }
        },
        buttonText: 'Choose Premium',
        gradient: 'from-red-500 to-orange-600',
        shadow: 'shadow-red-500/30'
    }
];

type BillingCycle = 'monthly' | 'half-yearly' | 'yearly';

export const PlansSection = () => {
    const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

    return (
        <section className="relative w-full flex items-center justify-center py-20 md:py-32 px-4">
            <div className="relative text-center max-w-6xl mx-auto z-10">
                <h2 className="section-heading mb-4 text-gradient-wiretap">
                    Subscription Plans
                </h2>
                <p className="section-subheading mb-8">
                    Choose the plan that's right for you and unlock a world of entertainment.
                </p>

                <RadioGroup
                    defaultValue="monthly"
                    onValueChange={(value: string) => setBillingCycle(value as BillingCycle)}
                    className="flex items-center justify-center space-x-2 md:space-x-4 mb-12"
                >
                    <div className="flex items-center space-x-2">
                         <RadioGroupItem value="monthly" id="monthly" className="peer sr-only" />
                         <Label htmlFor="monthly" className={cn("px-6 py-3 rounded-full border-2 border-transparent cursor-pointer transition-all",
                            billingCycle === 'monthly' ? 'bg-purple-600 text-white border-purple-400 shadow-lg' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                         )}>
                           Monthly
                         </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="half-yearly" id="half-yearly" className="peer sr-only" />
                         <Label htmlFor="half-yearly" className={cn("px-6 py-3 rounded-full border-2 border-transparent cursor-pointer transition-all",
                            billingCycle === 'half-yearly' ? 'bg-purple-600 text-white border-purple-400 shadow-lg' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                         )}>
                           Half Year
                         </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yearly" id="yearly" className="peer sr-only" />
                         <Label htmlFor="yearly" className={cn("px-6 py-3 rounded-full border-2 border-transparent cursor-pointer transition-all",
                            billingCycle === 'yearly' ? 'bg-purple-600 text-white border-purple-400 shadow-lg' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                         )}>
                           Yearly
                         </Label>
                    </div>
                </RadioGroup>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {plans.map((plan, index) => {
                        const {price, period} = plan.prices[billingCycle];
                        return (
                           <PricingCard 
                                key={index} 
                                {...plan}
                                price={price}
                                pricePeriod={period}
                            />
                        )
                    })}
                </div>
            </div>
        </section>
    );
};
