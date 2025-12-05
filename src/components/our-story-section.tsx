

"use client";

import { useRef, useEffect } from 'react';
import { AnimateOnScroll } from './animate-on-scroll';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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
            className="relative min-h-screen w-full flex items-center justify-center py-20 md:py-32 px-4 overflow-hidden"
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

            <div className="relative text-center max-w-4xl mx-auto z-10">
                <AnimateOnScroll animationClasses="animate-fade-in-up">
                    <h2 className="section-label mb-4">
                        <span className="inline-block relative overflow-hidden">
                           <span className="inline-block heading-sweep">Why Choose Us</span> 
                        </span>
                    </h2>
                    <div className="w-24 h-0.5 bg-gold-accent mx-auto mb-8 shadow-[0_0_15px_2px_rgba(199,164,91,0.4)]" />
                    <h3 className="section-heading mb-6">Your Strategic Advantage</h3>
                    <p className="font-inter text-muted-foreground text-lg leading-relaxed">
                        Founded in 2021 by a collective of seasoned investment bankers and research analysts, LoQ Capital Markets was born from a shared vision: to democratize access to institutional-grade financial intelligence. We witnessed firsthand the struggle for clear, independent insights amidst market noise. Our story is one of building a bridge—connecting ambition with actionable data and empowering financial institutions to navigate the complexities of capital markets with newfound confidence.
                    </p>
                </AnimateOnScroll>
            </div>
        </section>
    );
};
