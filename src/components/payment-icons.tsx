
"use client";

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const paymentIconIds = [
    'phonepe-logo', 'paytm-logo', 'bhim-logo', 'upi-logo', 'netbanking-logo'
];

export const PaymentIcons = () => {
    const paymentIcons = paymentIconIds.map(id => PlaceHolderImages.find(p => p.id === id)).filter(Boolean);
    const duplicatedIcons = [...paymentIcons, ...paymentIcons];

    return (
        <div className="relative w-full overflow-hidden h-20 group">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#1B1C1E] via-transparent to-[#1B1C1E] z-10" />
            <div className="animate-scroll-x flex gap-12 items-center h-full">
                {duplicatedIcons.map((icon, index) => (
                    icon && (
                        <div key={index} className="flex-shrink-0 w-28 h-12 flex items-center justify-center">
                             <Image
                                src={icon.imageUrl}
                                alt={icon.description}
                                width={80}
                                height={40}
                                className={cn(
                                    "object-contain",
                                    icon.id === 'netbanking-logo' && 'invert',
                                    (icon.id === 'paytm-logo' || icon.id === 'phonepe-logo' || icon.id === 'netbanking-logo') && 'w-20'
                                )}
                            />
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};
