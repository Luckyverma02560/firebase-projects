
"use client";
import { useState } from 'react';
import { WhoWeAreCard } from '@/components/who-we-are-card';
import { WhoWeAreParticles } from '@/components/who-we-are-particles';

export const WhoWeAreSection = () => {
    const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!e.currentTarget) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = (y / rect.height - 0.5) * -12; 
        const rotateY = (x / rect.width - 0.5) * 12;
        setRotation({ rotateX, rotateY });
    };

    const handleMouseLeave = () => {
        setRotation({ rotateX: 0, rotateY: 0 });
    };

    const transform = `perspective(1000px) rotateX(${rotation.rotateX}deg) rotateY(${rotation.rotateY}deg)`;

    return (
        <section
            className="relative py-24 md:py-32 bg-transparent"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <WhoWeAreParticles />
            <div className="relative container mx-auto px-4">
                <WhoWeAreCard transform={transform} rotation={rotation} />
            </div>
        </section>
    );
};
