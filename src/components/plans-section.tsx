
"use client";

import { useState } from 'react';
import { PricingCard } from './pricing-card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from '@/lib/utils';
import { ServiceCard } from './service-card';
import { initialServices, type Service, type PlanName, type BillingCycle } from '@/lib/services';
import Link from 'next/link';

interface PlansSectionProps {
    showPlans: boolean;
    selectedService: string | null;
}

export const PlansSection = ({ showPlans, selectedService }: PlansSectionProps) => {
    const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
    const [currentServices, setCurrentServices] = useState<Service[]>(initialServices);

    const services = currentServices.map(s => ({
        id: s.id.toString(),
        name: s.name,
        logoUrl: s.icon,
        logoHint: s.name.toLowerCase() + ' logo',
    }));
    
    const serviceData = currentServices.find(s => s.name === selectedService);

    const plansToShow = serviceData ? (Object.keys(serviceData.plans.monthly) as PlanName[]).map(planName => {
        const planDetails = serviceData.plans.monthly[planName];
        if (!planDetails) return null;

        const prices = {
            monthly: serviceData.plans.monthly[planName],
            'half-yearly': serviceData.plans['half-yearly'][planName],
            yearly: serviceData.plans.yearly[planName],
        };

        let gradient = 'from-blue-500 to-indigo-600';
        let shadow = 'shadow-blue-500/30';
        let isPopular = false;
        let description = 'Ideal for individuals starting out';

        switch(planName) {
            case 'Standard':
                gradient = 'from-purple-500 to-violet-600';
                shadow = 'shadow-purple-500/30';
                isPopular = serviceData.name === 'Netflix' ? 
                    (billingCycle === 'monthly' || billingCycle === 'half-yearly' || billingCycle === 'yearly') : 
                    billingCycle === 'monthly';
                description = 'Perfect for families and small groups';
                break;
            case 'Premium':
                 gradient = 'from-red-500 to-orange-600';
                 shadow = 'shadow-red-500/30';
                 description = 'For the ultimate streaming enthusiasts';
                break;
            case 'Super Premium':
                gradient = 'from-green-500 to-teal-600';
                shadow = 'shadow-green-500/30';
                description = 'For power users and large families';
                break;
        }

        if (serviceData.name === 'Netflix') {
            if (planName === 'Standard' && (billingCycle === 'half-yearly' || billingCycle === 'yearly')) {
                isPopular = true;
            }
        }
        
        if (serviceData.name === 'Prime Video') {
            if (planName === 'Premium' && billingCycle === 'half-yearly') {
                isPopular = true;
            }
            if (planName === 'Super Premium' && billingCycle === 'yearly') {
                isPopular = true;
            }
        }

        if (serviceData.name === 'Jio Hotstar' && planName === 'Premium' && billingCycle === 'monthly') {
            isPopular = true;
        }


        return {
            name: planName,
            description,
            features: prices[billingCycle]?.features || [],
            prices,
            buttonText: 'BUY NOW',
            gradient,
            shadow,
            isPopular
        };
    }).filter(p => p !== null) as any[] : [];
    
    const gridColsClass = plansToShow.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3';

    const isNetflix = selectedService === 'Netflix';
    const isPrimeVideo = selectedService === 'Prime Video';
    const isJioHotstar = selectedService === 'Jio Hotstar';

    const renderPlan = (plan: any) => {
        const priceInfo = plan.prices[billingCycle];
        if (!priceInfo) return null;
        
        const {price, isAvailable, features} = priceInfo;
        let period = '/month';
        if (billingCycle === 'half-yearly') {
            period = isNetflix ? '/3mo' : '/6mo';
        } else if (billingCycle === 'yearly') {
            period = isNetflix ? '/6mo' : '/12mo';
        }
        
        return (
        <PricingCard 
                key={plan.name} 
                {...plan}
                price={`INR ${price}`}
                features={features}
                pricePeriod={period}
                isAvailable={isAvailable}
                serviceName={selectedService}
                billingCycle={billingCycle}
            />
        )
    };


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
                {showPlans && isPrimeVideo && (
                    <p className="text-sm text-gray-400 -mt-4 mb-8">
                        All Prime Video Plans Are Ad-Free Plans
                    </p>
                )}

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
                                {isNetflix ? '3 Months' : (isJioHotstar ? '3/6 Months' : 'Half Yearly')}
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yearly" id="yearly" className="peer sr-only" />
                                <Label htmlFor="yearly" className={cn("px-4 md:px-6 py-2 md:py-3 rounded-full border-2 border-transparent cursor-pointer transition-all text-sm md:text-base",
                                    billingCycle === 'yearly' ? 'bg-purple-600 text-white border-purple-400 shadow-lg' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                )}>
                                {isNetflix ? 'Half Yearly' : 'Yearly'}
                                </Label>
                            </div>
                        </RadioGroup>

                        {isJioHotstar && billingCycle === 'half-yearly' ? (
                            <div className="flex flex-col lg:flex-row justify-center items-start gap-12 lg:gap-16">
                                {/* 3 Months Branch */}
                                <div className="flex flex-col items-center gap-4 w-full">
                                    <div className="bg-gray-800 text-purple-400 font-bold text-lg px-6 py-2 rounded-full border-2 border-purple-500">3 Months</div>
                                    <div className="w-full lg:w-px h-px lg:h-8 bg-purple-500/50"></div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-2xl">
                                        {renderPlan(plansToShow.find(p => p.name === 'Premium'))}
                                        {renderPlan(plansToShow.find(p => p.name === 'Super Premium'))}
                                    </div>
                                </div>

                                <div className="w-full h-px bg-white/10 lg:hidden" />
                                <div className="w-px h-auto bg-white/10 hidden lg:block self-stretch" />

                                {/* 6 Months Branch */}
                                <div className="flex flex-col items-center gap-4 w-full">
                                    <div className="bg-gray-800 text-green-400 font-bold text-lg px-6 py-2 rounded-full border-2 border-green-500">6 Months</div>
                                    <div className="w-full lg:w-px h-px lg:h-8 bg-green-500/50"></div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-2xl">
                                        {renderPlan(plansToShow.find(p => p.name === 'Premium'))}
                                        {renderPlan(plansToShow.find(p => p.name === 'Super Premium'))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-8 justify-center", plansToShow.length >= 4 ? 'lg:grid-cols-4' : `lg:grid-cols-${plansToShow.length}`)}>
                                {plansToShow.map((plan) => renderPlan(plan))}
                            </div>
                        )}
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

};
