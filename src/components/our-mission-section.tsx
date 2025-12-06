
"use client";

import { useRef, useLayoutEffect } from 'react';
import { AnimateOnScroll } from './animate-on-scroll';
import { ShieldCheck, Target, TrendingUp, Lightbulb } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
    ShieldCheck,
    Target,
    TrendingUp,
    Lightbulb
};

const missionCards = [
    {
        icon: 'ShieldCheck',
        title: 'Integrity First',
        description: 'Providing unbiased, transparent, and independent research to build unwavering trust.'
    },
    {
        icon: 'Target',
        title: 'Client-Centric',
        description: 'Aligning our success with yours by delivering insights that drive meaningful outcomes.'
    },
    {
        icon: 'TrendingUp',
        title: 'Pursuit of Excellence',
        description: 'Continuously refining our analytics and methodologies to stay ahead of the market curve.'
    },
    {
        icon: 'Lightbulb',
        title: 'Actionable Intelligence',
        description: 'Transforming complex data into clear, strategic actions for our clients.'
    }
];

export const OurMissionSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.mission-card');
            gsap.from(cards, {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none none',
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen w-full flex items-center justify-center py-20 md:py-32 px-4 overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-[#101113] to-[#0A0A0B] -z-10" />
            <div className="absolute inset-0 z-0">
                <div className="absolute -top-1/4 -left-1/4 w-2/3 h-2/3 bg-gold-accent/10 rounded-full filter blur-[100px] animate-pulse-slow" />
                <div className="absolute -bottom-1/4 -right-1/4 w-2/3 h-2/3 bg-gold-accent/10 rounded-full filter blur-[100px] animate-pulse-slow animation-delay-400" />
            </div>

            <div className="relative text-center max-w-6xl mx-auto z-10">
                <AnimateOnScroll animationClasses="animate-fade-in-up">
                    <h2 className="section-label">
                         <span className="inline-block relative overflow-hidden">
                           <span className="inline-block heading-sweep">Our Mission</span> 
                        </span>
                    </h2>
                    <h3 className="section-heading mt-4 mb-12">
                        <span className="relative inline-block">
                           Empowering Decisions with Clarity & Conviction
                           <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gold-accent/20 blur-md" />
                           <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gold-accent" />
                        </span>
                    </h3>
                </AnimateOnScroll>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {missionCards.map((card, index) => {
                        const Icon = iconMap[card.icon as keyof typeof iconMap];
                        return (
                            <div
                                key={card.title}
                                className="mission-card" // Class for GSAP targeting
                            >
                                <div className="bg-secondary/30 backdrop-blur-sm border border-[#23C6D9]/30 rounded-xl p-6 h-full flex flex-col items-center transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#23C6D9]/40 hover:border-[#23C6D9]/60">
                                    <div className="bg-gold-accent/10 p-4 rounded-full mb-4 ring-2 ring-gold-accent/20">
                                        <Icon className="w-8 h-8 text-gold-accent" />
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
