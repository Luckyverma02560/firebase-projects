
"use client"

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimateOnScroll } from '@/components/animate-on-scroll';
import { WhoWeAreSection } from '@/components/who-we-are-section';
import { WhyChooseUsSection } from '@/components/our-story-section';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroParticles = dynamic(() => import('@/components/hero-particles').then(m => m.HeroParticles), { ssr: false });
const UpwardNeonParticles = dynamic(() => import('@/components/upward-neon-particles').then(m => m.UpwardNeonParticles), { ssr: false });

export default function Home() {
  const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 });
  const isMobile = useIsMobile();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (y / rect.height - 0.5) * -12;
    const rotateY = (x / rect.width - 0.5) * 12;
    setRotation({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setRotation({ rotateX: 0, rotateY: 0 });
  };

  const transformStyle = {
    transform: `perspective(1000px) rotateX(${rotation.rotateX}deg) rotateY(${rotation.rotateY}deg)`,
    willChange: 'transform'
  };

  return (
    <>
      <div 
        className="relative overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E0E10] to-[#1B1C1E] z-0" />
        <div className="absolute inset-0 z-1 pointer-events-none">
            <HeroParticles />
            {!isMobile && <UpwardNeonParticles />}
        </div>
        <div 
          className="relative z-2"
        >
          <section className="relative h-screen w-full flex items-center justify-center text-center text-white overflow-hidden">
            <div className="relative z-10 p-4" style={isMobile ? {} : transformStyle}>
                <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl font-medium tracking-[3px] uppercase opacity-0 animate-heading-in hero-heading-sweep">
                  EL<span className="text-[1.2em]">11</span>VEN HUB
                </h1>
                <div className="w-32 h-0.5 mx-auto mt-8 mb-6 bg-gold-accent opacity-0 animate-divider-in shadow-[0_0_15px_3px_rgba(199,164,91,0.4)]" />
                <p className="font-orange-avenue text-lg md:text-xl font-medium tracking-wider text-[#B0B0B2] max-w-4xl mx-auto opacity-0 animate-subheading-in">
                    Your Gateway to Ultimate Streaming Experience
                </p>
                <div className="mt-12 opacity-0 animate-subheading-in">
                    <Button asChild className="font-headline text-base uppercase tracking-wider bg-gradient-view-plans text-white font-bold shadow-[0_0_15px_rgba(142,45,226,0.5)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(74,0,224,0.8)] hover:scale-105">
                        <Link href="/about">View Plans</Link>
                    </Button>
                </div>
            </div>
          </section>

          <WhoWeAreSection />
          <AnimateOnScroll>
            <WhyChooseUsSection />
          </AnimateOnScroll>
        </div>
      </div>
      <div className="relative bg-[#121315]">
        <div className="relative z-10">
        </div>
      </div>
    </>
  );
}
