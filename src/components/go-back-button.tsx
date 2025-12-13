
"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export function GoBackButton() {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <div className="absolute top-28 left-4 md:left-8 z-30">
            <Button
                onClick={handleGoBack}
                variant="ghost"
                size="icon"
                className={cn(
                    'rounded-full w-12 h-12 bg-black/30 text-gold-accent backdrop-blur-sm',
                    'hover:bg-gold-accent/20 hover:text-white transition-all duration-300',
                    'border border-gold-accent/30 hover:border-gold-accent/60'
                )}
                aria-label="Go back"
            >
                <ArrowLeft className="h-7 w-7" />
            </Button>
        </div>
    );
}
