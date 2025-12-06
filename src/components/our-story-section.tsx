

"use client";

import { useRef, useEffect } from 'react';
import { AnimateOnScroll } from './animate-on-scroll';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Users, Target, BrainCircuit, TrendingUp } from 'lucide-react';

const advantageCards = [
    {
        icon: Users,
        title: 'Expert-Led',
        description: 'Direct access to insights from seasoned analysts and former investment bankers.'
    },
    {
        icon: Target,
        title: 'Precision Analytics',
        description: 'Leverage our proprietary models for data-driven, high-conviction strategies.'
    },
    {
        icon: BrainCircuit,
        title: 'Actionable Intelligence',
        description: 'We translate complex market data into clear, executable advice for our clients.'
    },
    {
        icon: TrendingUp,
        title: 'Proven Track Record',
        description: 'Our history of successful calls and market foresight speaks for itself.'
    }
];


export const WhyChooseUsSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const storyImage = PlaceHolderImages.find(p => p.id === 'our-story');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-in-view');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const currentRef = sectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full flex items-center justify-center py-20 md:py-32 px-4 overflow-hidden"
        >
            <div className="absolute inset-0 bg-black/20 z-0">
                {storyImage && (
                    <Image
                        src={storyImage.imageUrl}
                        alt="Financial workspace"
                        fill
                        priority
                        className="object-cover opacity-20 filter blur-[2px] scale-110 transition-transform duration-1000 ease-out [.is-in-view_&]:scale-100"
                    />
                )}
                 <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
            </div>

            <div className="relative text-center max-w-6xl mx-auto z-10">
                <AnimateOnScroll animationClasses="animate-fade-in-up">
                    <h2 className={cn("section-heading mb-12 text-gradient-wiretap")}>Why Choose Us</h2>
                </AnimateOnScroll>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {advantageCards.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <AnimateOnScroll
                                key={card.title}
                                className={`animation-delay-${index * 200}`}
                                animationClasses="animate-fade-in-up"
                            >
                                <div className="bg-secondary/30 backdrop-blur-sm border border-border/20 rounded-xl p-6 h-full flex flex-col items-center text-center transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30">
                                    <div className="bg-primary/10 p-4 rounded-full mb-4 ring-2 ring-primary/20">
                                        <Icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <h4 className="text-xl font-bold text-heading-text mb-2">{card.title}</h4>
                                    <p className="text-muted-foreground text-sm">{card.description}</p>
                                </div>
                            </AnimateOnScroll>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
