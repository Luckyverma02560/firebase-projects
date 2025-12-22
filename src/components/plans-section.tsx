
"use client";

import { useState, useEffect } from 'react';
import { PricingCard } from './pricing-card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from '@/lib/utils';
import { ServiceCard } from './service-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { initialServices, Service, PlanName, BillingCycle } from '@/lib/services';

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

interface PlansSectionProps {
    showPlans: boolean;
    selectedService: string | null;
}

export const PlansSection = ({ showPlans, selectedService }: PlansSectionProps) => {
    const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
    const [currentServices, setCurrentServices] = useState<Service[]>(initialServices);

    const services = PlaceHolderImages.filter(p => serviceIds.includes(p.id)).map(p => ({
        id: p.id,
        name: p.description,
        logoUrl: p.imageUrl,
        logoHint: p.imageHint,
    }));
    
    const serviceData = currentServices.find(s => s.name === selectedService);
    const plansToShow = serviceData ? Object.values(serviceData.plans.monthly).map((planDetails, index) => {
        const planName = Object.keys(serviceData.plans.monthly)[index] as PlanName;
        // This is a bit of a hack to map the plan data to the old structure for PricingCard
        // A better approach would be to refactor PricingCard to accept the new structure directly
        const features = serviceData.plans.monthly[planName].features;
        const prices = {
            monthly: serviceData.plans.monthly[planName],
            'half-yearly': serviceData.plans['half-yearly'][planName],
            yearly: serviceData.plans.yearly[planName],
        };

        let gradient = 'from-blue-500 to-indigo-600';
        let shadow = 'shadow-blue-500/30';
        let isPopular = false;

        switch(planName) {
            case 'Standard':
                gradient = 'from-purple-500 to-violet-600';
                shadow = 'shadow-purple-500/30';
                isPopular = true;
                break;
            case 'Premium':
                 gradient = 'from-red-500 to-orange-600';
                 shadow = 'shadow-red-500/30';
                break;
            case 'Super Premium':
                gradient = 'from-green-500 to-teal-600';
                shadow = 'shadow-green-500/30';
                break;
        }

        return {
            name: planName,
            description: 'Description for ' + planName, // Add more descriptive text if needed
            features,
            prices,
            buttonText: 'BUY NOW',
            gradient,
            shadow,
            isPopular
        };
    }) : [];
    
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
                                <RadioGroupItem value="half-yearly" id="half-yearly" className="peer sr-only" />
                                <Label htmlFor="half-yearly" className={cn("px-4 md:px-6 py-2 md:py-3 rounded-full border-2 border-transparent cursor-pointer transition-all text-sm md:text-base",
                                    billingCycle === 'half-yearly' ? 'bg-purple-600 text-white border-purple-400 shadow-lg' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                )}>
                                3 Months
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yearly" id="yearly" className="peer sr-only" />
                                <Label htmlFor="yearly" className={cn("px-4 md:px-6 py-2 md:py-3 rounded-full border-2 border-transparent cursor-pointer transition-all text-sm md:text-base",
                                    billingCycle === 'yearly' ? 'bg-purple-600 text-white border-purple-400 shadow-lg' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                )}>
                                Half Yearly
                                </Label>
                            </div>
                        </RadioGroup>

                        <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-8", plansToShow.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3')}>
                            {plansToShow.map((plan, index) => {
                                const priceInfo = plan.prices[billingCycle];
                                if (!priceInfo) return null; // Handle cases where a plan might not exist for a cycle
                                const {price, isAvailable} = priceInfo;
                                const period = billingCycle === 'monthly' ? '/month' : billingCycle === 'half-yearly' ? '/3mo' : '/6mo';
                                
                                return (
                                <PricingCard 
                                        key={index} 
                                        {...plan}
                                        price={price}
                                        pricePeriod={period}
                                        isAvailable={isAvailable}
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
