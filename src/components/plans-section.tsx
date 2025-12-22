
"use client";

import { useState } from 'react';
import { PricingCard } from './pricing-card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from '@/lib/utils';
import { ServiceCard } from './service-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

const allPlans = [
    {
        name: 'Basic Plan',
        description: 'Ideal for individuals starting out',
        features: [
            '1 Device access',
            'Full customer support',
            '4K streaming quality',
            'Shared account access'
        ],
        prices: {
            monthly: { price: 'INR 100', period: '/month' },
            'half-yearly': { price: 'INR 849', period: '/6mo' },
            yearly: { price: 'INR 1599', period: '/yr' }
        },
        buttonText: 'BUY NOW',
        gradient: 'from-blue-500 to-indigo-600',
        shadow: 'shadow-blue-500/30'
    },
    {
        name: 'Standard Plan',
        description: 'Perfect for families and small groups',
        features: [
            '1 Device access',
            'Profile Login',
            '4k streaming quality',
            'Limited sharing'
        ],
        prices: {
            monthly: { price: 'INR 130', period: '/month' },
            'half-yearly': { price: 'INR 1699', period: '/6mo' },
            yearly: { price: 'INR 3299', period: '/yr' }
        },
        buttonText: 'BUY NOW',
        gradient: 'from-purple-500 to-violet-600',
        shadow: 'shadow-purple-500/30',
        isPopular: true
    },
    {
        name: 'Premium Plan',
        description: 'For the ultimate streaming enthusiasts',
        features: [
            '1 Device Access',
            'Profile Login',
            '4K  Streaming Quality',
            'Private Account Access'
        ],
        prices: {
            monthly: { price: 'INR 150', period: '/month' },
            'half-yearly': { price: 'INR 2899', period: '/6mo' },
            yearly: { price: 'INR 5499', period: '/yr' }
        },
        buttonText: 'BUY NOW',
        gradient: 'from-red-500 to-orange-600',
        shadow: 'shadow-red-500/30'
    },
    {
        name: 'Super Premium',
        description: 'For power users and large families',
        features: [
            '2 Device Access',
            'Profile Login',
            '4K streaming quality',
            'Private Account Access'
        ],
        prices: {
            monthly: { price: 'INR 170', period: '/month' },
            'half-yearly': { price: 'INR 4599', period: '/6mo' },
            yearly: { price: 'INR 8999', period: '/yr' }
        },
        buttonText: 'BUY NOW',
        gradient: 'from-green-500 to-teal-600',
        shadow: 'shadow-green-500/30'
    }
];

const serviceIds = [
    'netflix-logo',
    'prime-video-logo',
    'hotstar-logo',
    'zee5-logo',
    'youtube-premium-logo',
    'sony-logo',
    'aha-logo',
    'canva-logo'
];

type BillingCycle = 'monthly' | 'half-yearly' | 'yearly';

interface PlansSectionProps {
    showPlans: boolean;
    selectedService: string | null;
}

export const PlansSection = ({ showPlans, selectedService }: PlansSectionProps) => {
    const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

    const services = PlaceHolderImages.filter(p => serviceIds.includes(p.id)).map(p => ({
        id: p.id,
        name: p.description,
        logoUrl: p.imageUrl,
        logoHint: p.imageHint,
    }));

    const plansToShow = (selectedService === 'Netflix' || selectedService === 'Prime Video') ? allPlans : allPlans.slice(0, 3);
    const gridColsClass = plansToShow.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3';

    return (
        <section className="relative w-full flex items-center justify-center py-20 md:py-32 px-4">
            <div className="relative text-center max-w-7xl mx-auto z-10 w-full">
                <div className="flex justify-center items-center mb-4">
                    <h2 className={cn("section-heading", showPlans ? "text-gradient-subscription" : "text-gradient-wiretap")}>
                        {showPlans ? `${selectedService} Plans` : 'Choose Your Service'}
                    </h2>
                </div>
                <p className="section-subheading mb-8">
                    {showPlans 
                        ? "Choose the plan that's right for you and unlock a world of entertainment."
                        : "Select your favorite streaming service to see available subscription plans."
                    }
                </p>

                {showPlans ? (
                    <>
                        <RadioGroup
                            defaultValue="monthly"
                            onValueChange={(value: string) => setBillingCycle(value as BillingCycle)}
                            className="flex items-center justify-center space-x-2 md:space-x-4 mb-12"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="monthly" id="monthly" className="peer sr-only" />
                                <Label htmlFor="monthly" className={cn("px-4 md:px-6 py-2 md:py-3 rounded-full border-2 border-transparent cursor-pointer transition-all text-sm md:text-base",
                                    billingCycle === 'monthly' ? 'bg-purple-600 text-white border-purple-400 shadow-lg' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                )}>
                                Monthly
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="half-yearly" id="3-months" className="peer sr-only" />
                                <Label htmlFor="3-months" className={cn("px-4 md:px-6 py-2 md:py-3 rounded-full border-2 border-transparent cursor-pointer transition-all text-sm md:text-base",
                                    billingCycle === 'half-yearly' ? 'bg-purple-600 text-white border-purple-400 shadow-lg' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                )}>
                                3 Months
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yearly" id="half-yearly" className="peer sr-only" />
                                <Label htmlFor="half-yearly" className={cn("px-4 md:px-6 py-2 md:py-3 rounded-full border-2 border-transparent cursor-pointer transition-all text-sm md:text-base",
                                    billingCycle === 'yearly' ? 'bg-purple-600 text-white border-purple-400 shadow-lg' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                )}>
                                Half Yearly
                                </Label>
                            </div>
                        </RadioGroup>

                        <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-8", gridColsClass)}>
                            {plansToShow.map((plan, index) => {
                                const {price, period} = plan.prices[billingCycle];
                                return (
                                <PricingCard 
                                        key={index} 
                                        {...plan}
                                        price={price}
                                        pricePeriod={period}
                                        serviceName={selectedService}
                                        billingCycle={billingCycle}
                                    />
                                )
                            })}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-6 px-4 md:px-0">
                        {services.map((service) => (
                           service && (
                             <ServiceCard
                                key={service.id}
                                name={service.name}
                                logoUrl={service.logoUrl}
                                logoHint={service.logoHint}
                            />
                           )
                        ))}
                    </div>
                )}
            </div>
        </section>
    );

    
