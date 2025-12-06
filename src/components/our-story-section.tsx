
"use client";

import { useState, useRef, useLayoutEffect } from 'react';
import { cn } from '@/lib/utils';
import { Tv, Power, Users, Server } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const advantageCards = [
    {
        icon: Tv,
        title: 'Watch on Any Device',
        description: 'Stream on your phone, tablet, laptop, or TV'
    },
    {
        icon: Power,
        title: 'No Bandwidth Limits',
        description: 'Unlimited streaming in crystal-clear 4K'
    },
    {
        icon: Users,
        title: 'Family Sharing',
        description: 'Share with family members safely'
    },
    {
        icon: Server,
        title: 'Indian Servers',
        description: 'Faster streaming with local servers'
    }
];

const gradients = [
    'linear-gradient(to right, #009fff, #ec2f4b)',
    'linear-gradient(to right, #ec2f4b, #e94057, #f27121)',
    'linear-gradient(to right, #f27121, #e94057, #ec2f4b)',
    'linear-gradient(to right, #ec2f4b, #009fff)',
];

export const WhyChooseUsSection = () => {
    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const sectionEl = sectionRef.current;
            const headingEl = headingRef.current;
            const cardEls = cardsRef.current.filter(el => el !== null) as HTMLDivElement[];

            if (!sectionEl || !headingEl || !cardEls.length) return;

            gsap.fromTo(headingEl,
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionEl,
                        start: 'top 60%',
                        toggleActions: 'play none none none'
                    }
                }
            );

            if (selectedCard === null) {
                gsap.fromTo(cardEls,
                    { opacity: 0, y: 50, scale: 0.95 },
                    {
                        opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power4.out', stagger: 0.2,
                        scrollTrigger: {
                            trigger: headingEl,
                            start: 'bottom 80%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();

    }, [selectedCard]);

    const handleCardClick = (e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        setSelectedCard(prev => (prev === index ? null : index));
    };

    const handleBackgroundClick = () => {
        setSelectedCard(null);
    };

    return (
        <section
            ref={sectionRef}
            className="relative w-full flex items-center justify-center py-20 md:py-32 px-4 overflow-hidden bg-transparent"
            onClick={handleBackgroundClick}
        >
            <div className="relative text-center max-w-5xl mx-auto z-10">
                <h2 ref={headingRef} className={cn("section-heading mb-12 text-gradient-wiretap")}>Why Choose Us</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                    {advantageCards.map((card, index) => {
                        const Icon = card.icon;
                        const isSelected = selectedCard === index;
                        const isAnotherSelected = selectedCard !== null && !isSelected;

                        return (
                            <div
                                key={card.title}
                                ref={el => cardsRef.current[index] = el}
                                onClick={(e) => handleCardClick(e, index)}
                                className={cn(
                                    "rounded-xl p-6 h-full flex flex-col items-center text-center transform transition-all duration-500 text-white cursor-pointer",
                                    isSelected ? "scale-110 z-20" : "hover:-translate-y-2",
                                    isAnotherSelected ? "opacity-10" : "opacity-100"
                                )}
                                style={{ background: gradients[index] }}
                            >
                                <div className="bg-white/20 p-4 rounded-full mb-4 ring-2 ring-white/30">
                                    <Icon className="w-8 h-8 text-white" />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-2">{card.title}</h4>
                                <p className="text-white/80 text-sm">{card.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
