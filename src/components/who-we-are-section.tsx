
"use client";
import { useState } from 'react';
import { WhoWeAreCard } from '@/components/who-we-are-card';
import { useIsMobile } from '@/hooks/use-mobile';

export const WhoWeAreSection = () => {
    const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 });
    const isMobile = useIsMobile();

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isMobile || !e.currentTarget) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = (y / rect.height - 0.5) * -10; 
        const rotateY = (x / rect.width - 0.5) * 10;
        setRotation({ rotateX, rotateY });
    };

    const handleMouseLeave = () => {
        if (isMobile) return;
        setRotation({ rotateX: 0, rotateY: 0 });
    };

    const transform = `perspective(1000px) rotateX(${rotation.rotateX}deg) rotateY(${rotation.rotateY}deg)`;

    return (
        <section
            className="relative py-24 md:py-32 bg-transparent"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="relative container mx-auto px-4">
                <WhoWeAreCard transform={isMobile ? 'none' : transform} rotation={rotation} />
            </div>
        </section>
    );
};
