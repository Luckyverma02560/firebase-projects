
import { PlaceHolderImages } from '@/lib/placeholder-images';

const serviceLogoIds = [
    'netflix-logo',
    'prime-video-logo',
    'hotstar-logo',
    'zee5-logo',
    'youtube-premium-logo',
    'sony-logo',
    'canva-logo'
];

export type PlanName = 'Basic' | 'Standard' | 'Premium' | 'Super Premium';
export type BillingCycle = 'monthly' | 'half-yearly' | 'yearly';
export type JioBillingCycle = '3-months' | '6-months';

export interface PlanDetails {
    price: string;
    features: string[];
    isAvailable: boolean;
    isPopular?: boolean;
}

export type ServicePlans = Record<BillingCycle, Partial<Record<PlanName, PlanDetails>>> & {
    '3-months'?: Partial<Record<PlanName, PlanDetails>>;
    '6-months'?: Partial<Record<PlanName, PlanDetails>>;
};


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
        
        service.plans['half-yearly']['Basic']!.price = '600';
        service.plans['half-yearly']['Basic']!.isAvailable = false;
        service.plans['half-yearly']['Standard']!.price = '650';
        service.plans['half-yearly']['Standard']!.isAvailable = true;
        service.plans['half-yearly']['Standard']!.isPopular = true;
        service.plans['half-yearly']['Premium']!.price = '700';
        service.plans['half-yearly']['Premium']!.isAvailable = false;
        service.plans['half-yearly']['Super Premium']!.price = '750';

        service.plans.yearly['Basic']!.isAvailable = false;
        service.plans.yearly['Standard']!.isAvailable = true;
        service.plans.yearly['Standard']!.isPopular = true;
        service.plans.yearly['Premium']!.isAvailable = false;

        service.plans['half-yearly']['Super Premium']!.isAvailable = false;
        service.plans.yearly['Super Premium']!.isAvailable = false;
    }
    
    if (p.description === 'Jio Hotstar') {
        // Monthly
        service.plans.monthly['Basic']!.price = '70';
        service.plans.monthly['Basic']!.isAvailable = true;
        service.plans.monthly['Basic']!.features = [
            '2 Device Access',
            'Profile Login',
            '4K streaming quality',
            'Limited Sharing'
        ];

        service.plans.monthly['Standard']!.price = '80';
        service.plans.monthly['Standard']!.isPopular = true;
        service.plans.monthly['Standard']!.features = [
            '2 Device Access',
            'No. Activation',
            '4K streaming quality',
            'Limited Sharing'
        ];

        service.plans.monthly['Premium']!.price = '120';
        service.plans.monthly['Premium']!.isPopular = false;
        service.plans.monthly['Premium']!.features = [
            '5 Device Access',
            'Profile Login',
            '4K streaming quality',
            'Private Account Access'
        ];

        service.plans.monthly['Super Premium']!.price = '150';
        service.plans.monthly['Super Premium']!.features[0] = '5 Device Access';
        service.plans.monthly['Super Premium']!.isPopular = false;
        
        // 3 & 6 Months
        service.plans['half-yearly'] = {};
        
        service.plans['3-months'] = {
            'Premium': { 
                price: '300', 
                features: [
                    '1 Device Access',
                    'Profile Login',
                    'FHD Streaming Quality',
                    'Limited Sharing'
                ], 
                isAvailable: true, 
                isPopular: true 
            },
            'Super Premium': { 
                price: '350', 
                features: [
                    '2 Device Access',
                    'Profile Login',
                    '4K streaming quality',
                    'Private Account Access'
                ], 
                isAvailable: false,
                isPopular: false
            }
        };
        
        service.plans['6-months'] = {
            'Premium': { 
                price: '250', 
                features: [
                    '1 Device Access',
                    'Profile Login',
                    'FHD Streaming Quality',
                    'Limited Sharing'
                ], 
                isAvailable: true, 
                isPopular: true 
            },
            'Super Premium': { 
                price: '300', 
                features: [
                    '2 Device Access',
                    'Profile Login',
                    '4K streaming quality',
                    'Private Account Access'
                ], 
                isAvailable: false,
                isPopular: false
            }
        };

        // Yearly
        service.plans.yearly['Basic']!.isAvailable = false;
        service.plans.yearly['Standard']!.price = '500';
        service.plans.yearly['Standard']!.isPopular = true;
        service.plans.yearly['Premium']!.isAvailable = false;
        service.plans.yearly['Super Premium']!.isAvailable = false;
    }

    if (p.description === 'ZEE5') {
        service.plans.monthly['Basic']!.price = '60';
        service.plans.monthly['Basic']!.features[2] = 'FHD Streaming Quality';
        service.plans.monthly['Basic']!.isAvailable = false;
        service.plans.monthly['Standard']!.price = '70';
        service.plans.monthly['Standard']!.features[2] = 'FHD Streaming Quality';
        service.plans.monthly['Premium']!.price = '80';
        service.plans.monthly['Premium']!.isPopular = true;
        service.plans.monthly['Premium']!.features[1] = 'No. Activation';
        service.plans.monthly['Premium']!.features[2] = 'FHD Streaming Quality';
        service.plans.monthly['Premium']!.features[3] = 'Limited Sharing';
        service.plans.monthly['Super Premium']!.price = '120';
        service.plans.monthly['Super Premium']!.features[0] = '1 Device Access';
        service.plans.monthly['Super Premium']!.features[2] = 'FHD Streaming Quality';
        
        // 3 & 6 Months for ZEE5
        service.plans['half-yearly'] = {};
        
        service.plans['3-months'] = {
            'Premium': { 
                price: '200', 
                features: [
                    '1 Device Access',
                    'Profile Login',
                    'FHD Streaming Quality',
                    'Limited Sharing'
                ], 
                isAvailable: true,
                isPopular: true
            },
            'Super Premium': {
                price: '250',
                features: [
                    '2 Device Access',
                    'Profile Login',
                    'FHD Streaming Quality',
                    'Private Account Access'
                ],
                isAvailable: false,
                isPopular: false
            }
        };
        
        service.plans['6-months'] = {
            'Premium': { 
                price: '250', 
                features: [
                    '1 Device Access',
                    'Profile Login',
                    'FHD Streaming Quality',
                    'Limited Sharing'
                ], 
                isAvailable: true,
                isPopular: true
            },
             'Super Premium': {
                price: '300',
                features: [
                    '2 Device Access',
                    'Profile Login',
                    'FHD Streaming Quality',
                    'Private Account Access'
                ],
                isAvailable: false,
                isPopular: false
            }
        };

        service.plans.yearly['Basic']!.isAvailable = false;
        service.plans.yearly['Standard']!.price = '320';
        service.plans.yearly['Standard']!.isAvailable = false;
        service.plans.yearly['Standard']!.features[2] = 'FHD Streaming Quality';
        service.plans.yearly['Premium']!.price = '350';
        service.plans.yearly['Premium']!.isAvailable = true;
        service.plans.yearly['Premium']!.isPopular = true;
        service.plans.yearly['Premium']!.features[2] = 'FHD Streaming Quality';
        service.plans.yearly['Super Premium']!.price = '400';
        service.plans.yearly['Super Premium']!.isAvailable = true;
        service.plans.yearly['Super Premium']!.features[2] = 'FHD Streaming Quality';
    }

    if (p.description === 'Sony Liv') {
        service.plans.monthly['Basic']!.price = '60';
        service.plans.monthly['Standard']!.price = '80';
        service.plans.monthly['Premium']!.price = '100';
        service.plans.monthly['Super Premium']!.price = '120';
        
        service.plans.monthly['Basic']!.isAvailable = false;
        service.plans.monthly['Standard']!.isAvailable = true;
        service.plans.monthly['Premium']!.isAvailable = false;
        service.plans.monthly['Super Premium']!.isAvailable = false;

        service.plans.yearly['Basic']!.price = '200';
        service.plans.yearly['Standard']!.price = '250';
        service.plans.yearly['Premium']!.price = '300';
        service.plans.yearly['Super Premium']!.price = '400';

        service.plans.yearly['Basic']!.isAvailable = false;
        service.plans.yearly['Standard']!.isAvailable = false;
        service.plans.yearly['Premium']!.isAvailable = true;
        service.plans.yearly['Super Premium']!.isAvailable = true;

        service.plans.yearly['Premium']!.features[1] = 'No. Activation';
        service.plans.yearly['Super Premium']!.features[0] = '5 Device Access';
        service.plans.yearly['Super Premium']!.features[1] = 'No. Activation';

        service.plans['half-yearly']!['Basic']!.isAvailable = false;
        service.plans['half-yearly']!['Standard']!.isAvailable = false;
        service.plans['half-yearly']!['Premium']!.isAvailable = false;
        service.plans['half-yearly']!['Super Premium']!.isAvailable = false;
    }

    if (p.description === 'Canva') {
        service.plans = {
            monthly: {
                'Premium': {
                    price: '150',
                    features: [
                        'Canva Pro features',
                        'Invite based activation',
                        'Full customer support',
                        'Private account access'
                    ],
                    isAvailable: true,
                    isPopular: true
                }
            },
            'half-yearly': {},
            yearly: {
                 'Premium': {
                    price: '500',
                    features: [
                        'Canva Pro features',
                        'Invite based activation',
                        'Full customer support',
                        'Private account access'
                    ],
                    isAvailable: true,
                    isPopular: true
                }
            }
        };
    }

    if (p.description === 'Youtube Premium') {
        service.plans.monthly['Basic']!.price = '60';
        service.plans.monthly['Basic']!.features = [
            '1 Device access',
            'Invite Login',
            'Ad-Free Experience',
            'Enjoy uninterrupted streaming'
        ];
        service.plans.monthly['Standard']!.price = '80';
        service.plans.monthly['Standard']!.features = [
            'Upto 10 Device Access',
            'Activation On Mail',
            'Ad-Free Experience',
            'Enjoy uninterrupted streaming'
        ];
        service.plans.monthly['Premium']!.price = '100';
        service.plans.monthly['Premium']!.features = [
            'Upto 10 Device Access',
            'Activation On Mail',
            'Ad-Free Experience',
            '100% Guarenteed Service'
        ];

        delete service.plans.monthly['Super Premium'];
        service.plans['half-yearly'] = {};
        service.plans.yearly = {};
    }
    
    return service;
});
