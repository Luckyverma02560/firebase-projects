
"use client";

import { useRef, useEffect, useLayoutEffect } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Users, Target, BrainCircuit, TrendingUp } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
    const headingRef = useRef<HTMLHeadingElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    const storyImage = PlaceHolderImages.find(p => p.id === 'our-story');

    useLayoutEffect(() => {
        const sectionEl = sectionRef.current;
        const headingEl = headingRef.current;
        const cardEls = cardsRef.current;
        const imageEl = sectionEl?.querySelector('.bg-image');

        if (!sectionEl || !headingEl || !cardEls.length || !imageEl) return;
        
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionEl,
                start: 'top center',
                end: 'bottom bottom',
                scrub: 1,
            }
        });
        
        // Background image Ken Burns effect
        tl.fromTo(imageEl, 
            { scale: 1.1, y: '-5%' },
            { scale: 1, y: '5%', ease: 'none' },
            0 
        );

        // Heading animation
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
        
        // Cards animation
        gsap.fromTo(cardEls,
            { opacity: 0, y: 50, scale: 0.95 },
            { 
                opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', stagger: 0.2,
                scrollTrigger: {
                    trigger: headingEl,
                    start: 'bottom 80%',
                    toggleActions: 'play none none none'
                }
            }
        );

    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full flex items-center justify-center py-20 md:py-32 px-4 overflow-hidden min-h-screen"
        >
            <div className="absolute inset-0 bg-black/20 z-0">
                {storyImage && (
                    <Image
                        src={storyImage.imageUrl}
                        alt="Financial workspace"
                        fill
                        priority
                        className="object-cover opacity-20 filter blur-[2px] bg-image"
                    />
                )}
                 <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
            </div>

            <div className="relative text-center max-w-6xl mx-auto z-10">
                <h2 ref={headingRef} className={cn("section-heading mb-12 text-gradient-wiretap")}>Why Choose Us</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {advantageCards.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <div 
                                key={card.title}
                                ref={el => cardsRef.current[index] = el!}
                            >
                                <div className="bg-secondary/30 backdrop-blur-sm border border-border/20 rounded-xl p-6 h-full flex flex-col items-center text-center transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30">
                                    <div className="bg-primary/10 p-4 rounded-full mb-4 ring-2 ring-primary/20">
                                        <Icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <h4 className="text-xl font-bold text-heading-text mb-2">{card.title}</h4>
                                    <p className="text-muted-foreground text-sm">{card.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
