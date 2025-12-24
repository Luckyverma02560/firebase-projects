
"use client";

import { useState } from 'react';
import { PricingCard } from './pricing-card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from '@/lib/utils';
import { ServiceCard } from './service-card';
import { type Service, type PlanName, type BillingCycle, type JioBillingCycle } from '@/lib/services';
import Link from 'next/link';
import { useServices } from '@/context/service-context';

interface PlansSectionProps {
    showPlans: boolean;
    selectedService: string | null;
}

export const PlansSection = ({ showPlans, selectedService }: PlansSectionProps) => {
    const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
    const { services: currentServices } = useServices();

    const services = currentServices.map(s => ({
        id: s.id.toString(),
        name: s.name,
        logoUrl: s.icon,
        logoHint: s.name.toLowerCase() + ' logo',
    }));
    
    const serviceData = currentServices.find(s => s.name === selectedService);

    const getPlanDetails = (planName: PlanName, cycle: BillingCycle | JioBillingCycle) => {
        if (!serviceData) return null;
        
        const planDetails = (serviceData.plans as any)[cycle]?.[planName];
        if (!planDetails) return null;

        let gradient = 'from-blue-500 to-indigo-600';
        let shadow = 'shadow-blue-500/30';
        let description = 'Ideal for individuals starting out';

        switch(planName) {
            case 'Standard':
                gradient = 'from-purple-500 to-violet-600';
                shadow = 'shadow-purple-500/30';
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
        
        return {
            name: planName,
            description,
            features: planDetails.features || [],
            price: planDetails.price,
            isAvailable: planDetails.isAvailable,
            isPopular: planDetails.isPopular || false,
            buttonText: 'BUY NOW',
            gradient,
            shadow,
        };
    };
    
    const isNetflix = selectedService === 'Netflix';
    const isPrimeVideo = selectedService === 'Prime Video';
    const isJioHotstar = selectedService === 'Jio Hotstar';
    const isZee5 = selectedService === 'ZEE5';
    const isYoutubePremium = selectedService === 'Youtube Premium';
    const isCanva = selectedService === 'Canva';

    const renderPlan = (plan: any, period: string, billingCycleForMessage: string) => {
        if (!plan) return null;
        
        return (
        <PricingCard 
                key={`${plan.name}-${period}`} 
                {...plan}
                price={`INR ${plan.price}`}
                pricePeriod={period}
                serviceName={selectedService}
                billingCycle={billingCycleForMessage}
            />
        )
    };

    const monthlyPlans = serviceData ? (Object.keys(serviceData.plans.monthly || {}) as PlanName[]).map(p => getPlanDetails(p, 'monthly')) : [];
    const halfYearlyPlans = serviceData ? (Object.keys(serviceData.plans['half-yearly'] || {}) as PlanName[]).map(p => getPlanDetails(p, 'half-yearly')) : [];
    const yearlyPlans = serviceData ? (Object.keys(serviceData.plans.yearly || {}) as PlanName[]).map(p => getPlanDetails(p, 'yearly')) : [];

    const jio3MonthPlans = serviceData && (isJioHotstar || isZee5) ? (Object.keys(serviceData.plans['3-months'] || {}) as PlanName[]).map(p => getPlanDetails(p, '3-months')) : [];
    const jio6MonthPlans = serviceData && (isJioHotstar || isZee5) ? (Object.keys(serviceData.plans['6-months'] || {}) as PlanName[]).map(p => getPlanDetails(p, '6-months')) : [];

    const plansToShow = isCanva
        ? monthlyPlans
        : billingCycle === 'monthly'
        ? monthlyPlans
        : billingCycle === 'half-yearly'
        ? halfYearlyPlans
        : yearlyPlans;
    
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
                {showPlans && isPrimeVideo && (
                    <p className="text-sm text-gray-400 -mt-4 mb-8">
                        All Prime Video Plans Are Ad-Free Plans
                    </p>
                )}
                 {showPlans && (isJioHotstar || isZee5) && (
                    <p className="text-sm text-gray-400 -mt-4 mb-8">
                        All {selectedService} Plans Are 4K
                    </p>
                )}

                {showPlans ? (
                    <>
                        {!isYoutubePremium && !isCanva && (
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
                                    {isNetflix ? '3 Months' : (isJioHotstar || isZee5 ? '3/6 Months' : 'Half Yearly')}
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
                        )}
                        
                        {isCanva && (
                            <div className="flex justify-center mb-12">
                                 <div className="px-6 py-3 rounded-full bg-purple-600 text-white border-purple-400 shadow-lg">
                                    Lifetime
                                 </div>
                            </div>
                        )}

                        {(isJioHotstar || isZee5) && billingCycle === 'half-yearly' ? (
                            <div className="flex flex-col lg:flex-row justify-center items-start gap-8 lg:gap-8">
                                {/* 3 Months Branch */}
                                <div className="flex flex-col items-center gap-4 w-full">
                                    <div className="w-auto bg-gray-800 text-purple-400 font-bold text-lg px-8 py-2 rounded-full border-2 border-purple-500 text-center">3 Months</div>
                                    <div className={`grid grid-cols-1 ${jio3MonthPlans.length > 1 ? 'sm:grid-cols-2' : ''} gap-8 w-full`}>
                                        {jio3MonthPlans.map(plan => renderPlan(plan, '/3mo', '3 Months'))}
                                    </div>
                                </div>

                                <div className="w-full h-px bg-white/10 lg:hidden" />
                                <div className="w-px h-auto bg-white/10 hidden lg:block self-stretch mx-4" />
                                
                                {/* 6 Months Branch */}
                                <div className="flex flex-col items-center gap-4 w-full">
                                    <div className="w-auto bg-gray-800 text-green-400 font-bold text-lg px-8 py-2 rounded-full border-2 border-green-500 text-center">6 Months</div>
                                    <div className={`grid grid-cols-1 ${jio6MonthPlans.length > 1 ? 'sm:grid-cols-2' : ''} gap-8 w-full`}>
                                        {jio6MonthPlans.map(plan => renderPlan(plan, '/6mo', '6 Months'))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={cn(
                                "grid grid-cols-1 gap-8",
                                plansToShow.length > 1 && "md:grid-cols-2",
                                plansToShow.length === 1 && "max-w-sm mx-auto",
                                {
                                    "lg:grid-cols-3": plansToShow.length === 3,
                                    "lg:grid-cols-4": plansToShow.length >= 4
                                }
                            )}>
                                {plansToShow.map((plan) => {
                                    if (!plan) return null;
                                    let period = '/month';
                                    let cycleForMessage = 'Monthly';
                                    if (isCanva) {
                                        period = ' / Lifetime';
                                        cycleForMessage = 'Lifetime';
                                    } else if (billingCycle === 'half-yearly') {
                                        period = isNetflix ? '/3mo' : '/6mo';
                                        cycleForMessage = isNetflix ? '3 Months' : 'Half Yearly';
                                    } else if (billingCycle === 'yearly') {
                                        period = isNetflix ? '/6mo' : '/12mo';
                                        cycleForMessage = isNetflix ? 'Half Yearly' : 'Yearly';
                                    }
                                    return renderPlan(plan, period, cycleForMessage);
                                })}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-6 px-4 md:px-0">
                        {services.map((service) => (
                           <ServiceCard
                                key={service.id}
                                name={service.name}
                                logoUrl={service.logoUrl}
                                logoHint={service.logoHint}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );

};
