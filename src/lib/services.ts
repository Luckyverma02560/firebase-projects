
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

        service.plans['half-yearly']['Basic']!.price = '200';
        service.plans['half-yearly']['Basic']!.isAvailable = false;
        service.plans['half-yearly']['Standard']!.price = '250';
        service.plans['half-yearly']['Premium']!.price = '300';
        service.plans['half-yearly']['Super Premium']!.price = '350';
        service.plans['half-yearly']['Super Premium']!.isAvailable = false;
    }

    if (p.description === 'Netflix') {
        service.plans['half-yearly']['Basic']!.isAvailable = false;
        service.plans['yearly']['Basic']!.isAvailable = false;
        
        service.plans['half-yearly']['Standard']!.isAvailable = true;
        service.plans['half-yearly']['Standard']!.price = '700';
        service.plans['yearly']['Standard']!.isAvailable = true;
        service.plans['yearly']['Standard']!.price = '1300';
        
        service.plans['half-yearly']['Premium']!.isAvailable = false;
        service.plans['half-yearly']['Premium']!.price = '400';
        service.plans['yearly']['Premium']!.isAvailable = false;
        service.plans['yearly']['Premium']!.price = '800';

        service.plans['half-yearly']['Super Premium']!.isAvailable = false;
        service.plans['yearly']['Super Premium']!.isAvailable = false;
    }

    return service;
});
