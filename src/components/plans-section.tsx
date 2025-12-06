
"use client";

import { PricingCard } from './pricing-card';

const plans = [
    {
        name: 'Basic Plan',
        price: '₹149',
        pricePeriod: '/month',
        description: 'Ideal for individuals starting out',
        features: [
            'Access to 2 devices',
            'Full HD (1080p) streaming',
            'Basic support'
        ],
        buttonText: 'Choose Basic',
        gradient: 'from-blue-500 to-indigo-600',
        shadow: 'shadow-blue-500/30'
    },
    {
        name: 'Standard Plan',
        price: '₹299',
        pricePeriod: '/month',
        description: 'Perfect for families and small groups',
        features: [
            'Access to 4 devices',
            'Ultra HD (4K) streaming',
            'Priority support',
            'Early access to new shows'
        ],
        buttonText: 'Choose Standard',
        gradient: 'from-purple-500 to-violet-600',
        shadow: 'shadow-purple-500/30',
        isPopular: true
    },
    {
        name: 'Premium Plan',
        price: '₹499',
        pricePeriod: '/month',
        description: 'For the ultimate streaming enthusiasts',
        features: [
            'Access to 8 devices',
            'Ultra HD (4K) + HDR streaming',
            '24/7 dedicated support',
            'Offline downloads',
            'Exclusive content access'
        ],
        buttonText: 'Choose Premium',
        gradient: 'from-red-500 to-orange-600',
        shadow: 'shadow-red-500/30'
    }
];

export const PlansSection = () => {
    return (
        <section className="relative w-full flex items-center justify-center py-20 md:py-32 px-4">
            <div className="relative text-center max-w-6xl mx-auto z-10">
                <h2 className="section-heading mb-4 text-gradient-wiretap">
                    Subscription Plans
                </h2>
                <p className="section-subheading mb-12">
                    Choose the plan that's right for you and unlock a world of entertainment.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <PricingCard key={index} {...plan} />
                    ))}
                </div>
            </div>
        </section>
    );
};
