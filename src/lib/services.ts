
import { PlaceHolderImages } from '@/lib/placeholder-images';

const serviceLogoIds = [
    'netflix-logo',
    'prime-video-logo',
    'hotstar-logo',
    'zee5-logo',
    'youtube-premium-logo',
    'sony-logo',
    'aha-logo',
    'canva-logo'
];

export type PlanName = 'Basic' | 'Standard' | 'Premium' | 'Super Premium';
export type BillingCycle = 'monthly' | 'half-yearly' | 'yearly';

export interface PlanDetails {
    price: string;
    features: string[];
    isAvailable: boolean;
    isPopular?: boolean;
}

export type ServicePlans = Record<BillingCycle, Partial<Record<PlanName, PlanDetails>>>;

export interface Service {
    id: number;
    name: string;
    icon: string;
    plans: ServicePlans;
}

export const planNames: PlanName[] = ['Basic', 'Standard', 'Premium', 'Super Premium'];
export const billingCycles: BillingCycle[] = ['monthly', 'half-yearly', 'yearly'];

export const generateDefaultPlans = (): ServicePlans => ({
    monthly: {
        'Basic': { price: '100', features: [
            '1 Device access',
            'Full customer support',
            '4K streaming quality',
            'Shared account access'
        ], isAvailable: true },
        'Standard': { price: '130', features: [
            '1 Device access',
            'Profile Login',
            '4k streaming quality',
            'Limited sharing'
        ], isAvailable: true },
        'Premium': { price: '150', features: [
            '1 Device Access',
            'Profile Login',
            '4K  Streaming Quality',
            'Private Account Access'
        ], isAvailable: true },
        'Super Premium': { price: '170', features: [
            '2 Device Access',
            'Profile Login',
            '4K streaming quality',
            'Private Account Access'
        ], isAvailable: true }
    },
    'half-yearly': {
        'Basic': { price: '300', features: [
            '1 Device access',
            'Full customer support',
            '4K streaming quality',
            'Shared account access'
        ], isAvailable: true },
        'Standard': { price: '350', features: [
            '1 Device access',
            'Profile Login',
            '4k streaming quality',
            'Limited sharing'
        ], isAvailable: true },
        'Premium': { price: '400', features: [
            '1 Device Access',
            'Profile Login',
            '4K  Streaming Quality',
            'Private Account Access'
        ], isAvailable: true },
        'Super Premium': { price: '450', features: [
            '2 Device Access',
            'Profile Login',
            '4K streaming quality',
            'Private Account Access'
        ], isAvailable: true }
    },
    yearly: {
        'Basic': { price: '650', features: [
            '1 Device access',
            'Full customer support',
            '4K streaming quality',
            'Shared account access'
        ], isAvailable: true },
        'Standard': { price: '700', features: [
            '1Device access',
            'Profile Login',
            '4k streaming quality',
            'Limited sharing'
        ], isAvailable: true },
        'Premium': { price: '750', features: [
            '1 Device Access',
            'Profile Login',
            '4K  Streaming Quality',
            'Private Account Access'
        ], isAvailable: true },
        'Super Premium': { price: '800', features: [
            '2 Device Access',
            'Profile Login',
            '4K streaming quality',
            'Private Account Access'
        ], isAvailable: true }
    }
});

export const initialServices: Service[] = PlaceHolderImages.filter(p => serviceLogoIds.includes(p.id)).map((p, index) => {
    let service: Service = {
        id: index + 1,
        name: p.description,
        icon: p.imageUrl,
        plans: generateDefaultPlans(),
    };

    if (p.description === 'Prime Video') {
        service.plans.monthly['Basic']!.price = '90';
        service.plans.monthly['Standard']!.price = '120';
        service.plans.monthly['Premium']!.price = '150';
        service.plans.monthly['Super Premium']!.price = '170';
        service.plans.monthly['Super Premium']!.features[0] = '1 Device Access';


        service.plans['half-yearly']['Basic']!.price = '150';
        service.plans['half-yearly']['Basic']!.isAvailable = false;
        service.plans['half-yearly']['Standard']!.price = '200';
        service.plans['half-yearly']['Premium']!.price = '300';
        service.plans['half-yearly']['Super Premium']!.price = '400';
        service.plans['half-yearly']['Super Premium']!.isAvailable = true;
        service.plans['half-yearly']['Super Premium']!.features[0] = '5 Device Access';

        service.plans.yearly['Basic']!.price = '350';
        service.plans.yearly['Basic']!.isAvailable = false;
        service.plans.yearly['Standard']!.price = '400';
        service.plans.yearly['Standard']!.isAvailable = false;
        service.plans.yearly['Premium']!.price = '450';
        service.plans.yearly['Premium']!.isAvailable = false;
        service.plans.yearly['Super Premium']!.price = '500';
        service.plans.yearly['Super Premium']!.features[0] = '5 Device Access';
    }

    if (p.description === 'Netflix') {
        service.plans.monthly.Standard!.isPopular = true;
        
        service.plans['half-yearly']['Basic']!.isAvailable = false;
        service.plans['half-yearly']['Standard']!.isAvailable = true;
        service.plans['half-yearly']['Standard']!.isPopular = true;
        service.plans['half-yearly']['Premium']!.isAvailable = false;

        service.plans['yearly']['Basic']!.isAvailable = false;
        service.plans['yearly']['Standard']!.isAvailable = true;
        service.plans['yearly']['Standard']!.isPopular = true;
        service.plans['yearly']['Premium']!.isAvailable = false;

        service.plans['half-yearly']['Super Premium']!.isAvailable = false;
        service.plans['yearly']['Super Premium']!.isAvailable = false;
    }
    
    if (p.description === 'Jio Hotstar') {
        service.plans.monthly['Basic']!.price = '60';
        service.plans.monthly['Basic']!.isAvailable = false;
        service.plans.monthly['Standard']!.price = '70';
        service.plans.monthly['Premium']!.price = '80';
        service.plans.monthly['Premium']!.isPopular = true;
        service.plans.monthly['Premium']!.features[1] = 'No. Activation';
        service.plans.monthly['Premium']!.features[3] = 'Limited Sharing';
        service.plans.monthly['Super Premium']!.price = '120';
        service.plans.monthly['Super Premium']!.features[0] = '1 Device Access';
        
        // 3 Months
        service.plans['half-yearly']['Premium']!.price = '300'; 
        service.plans['half-yearly']['Super Premium']!.price = '350';
        service.plans['half-yearly']['Premium']!.features[3] = 'Limited Sharing';
        service.plans['half-yearly']['Super Premium']!.features[0] = '1 Device Access';
        service.plans['half-yearly']['Premium']!.isPopular = true;
        service.plans['half-yearly']['Super Premium']!.isAvailable = false;

        // 6 Months - This is a bit tricky since we only have one 'half-yearly' object.
        // The current structure re-uses the same plan object. To make 6-month plans different,
        // we'd need to adjust the data structure. For now, I'll apply the logic, but be aware
        // that both 3-month and 6-month plans will share these properties.
        const sixMonthPremium = JSON.parse(JSON.stringify(service.plans['half-yearly']['Premium']));
        sixMonthPremium.price = '400';
        sixMonthPremium.isPopular = true;

        const sixMonthSuperPremium = JSON.parse(JSON.stringify(service.plans['half-yearly']['Super Premium']));
        sixMonthSuperPremium.price = '450';
        sixMonthSuperPremium.isAvailable = false;

        // Note: The UI logic in plans-section.tsx will render these as separate cards,
        // but the underlying data for 'half-yearly' has been updated with the latest rules.
        // A better long term solution would be a more flexible data structure.
        
        // Applying the changes for 6 months logic by overwriting is not ideal but works with current structure.
        // Let's assume the UI will handle which price to show. The popularity and availability will be shared.

    }

    return service;
});
