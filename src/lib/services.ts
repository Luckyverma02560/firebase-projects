
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
}

export type ServicePlans = Record<BillingCycle, Record<PlanName, PlanDetails>>;

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
        'Basic': { price: '100', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'], isAvailable: true },
        'Standard': { price: '130', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'], isAvailable: true },
        'Premium': { price: '150', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'], isAvailable: true },
        'Super Premium': { price: '170', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'], isAvailable: true }
    },
    'half-yearly': {
        'Basic': { price: '550', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'], isAvailable: true },
        'Standard': { price: '700', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'], isAvailable: true },
        'Premium': { price: '850', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'], isAvailable: true },
        'Super Premium': { price: '1000', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'], isAvailable: true }
    },
    yearly: {
        'Basic': { price: '1000', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'], isAvailable: true },
        'Standard': { price: '1300', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'], isAvailable: true },
        'Premium': { price: '1500', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'], isAvailable: true },
        'Super Premium': { price: '1800', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'], isAvailable: true }
    }
});

export const initialServices: Service[] = PlaceHolderImages.filter(p => serviceLogoIds.includes(p.id)).map((p, index) => {
    const service: Service = {
        id: index + 1,
        name: p.description,
        icon: p.imageUrl,
        plans: generateDefaultPlans(),
    };

    if (p.description === 'Prime Video') {
        service.plans.monthly['Basic'].price = '90';
        service.plans.monthly['Standard'].price = '120';
        service.plans.monthly['Premium'].price = '150';
        service.plans.monthly['Super Premium'].price = '170';
    }

    if (p.description === 'Netflix') {
        // Mark Netflix 3 months and half yearly plans as unavailable
        service.plans['half-yearly']['Basic'].isAvailable = false;
        service.plans['half-yearly']['Standard'].isAvailable = false;
        service.plans['half-yearly']['Super Premium'].isAvailable = false;
        
        service.plans['yearly']['Basic'].isAvailable = false;
        service.plans['yearly']['Standard'].isAvailable = false;
        service.plans['yearly']['Super Premium'].isAvailable = false;
    }

    return service;
});
