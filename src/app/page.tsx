
"use client"

import { useState } from 'react';
import { AnimateOnScroll } from '@/components/animate-on-scroll';
import { WhoWeAreSection } from '@/components/who-we-are-section';
import { WhyChooseUsSection } from '@/components/our-story-section';
import { HeroParticles } from '@/components/hero-particles';
import { UpwardNeonParticles } from '@/components/upward-neon-particles';


export default function Home() {
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
            <UpwardNeonParticles />
        </div>
        <div 
          className="relative z-2"
        >
          <section className="relative h-screen w-full flex items-center justify-center text-center text-white overflow-hidden">
            <div className="relative z-10 p-4" style={transformStyle}>
                <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-medium tracking-[3px] uppercase opacity-0 animate-heading-in hero-heading-sweep">
                  EL<span className="text-[1.2em]">11</span>VEN HUB
                </h1>
                <div className="w-32 h-0.5 mx-auto mt-8 mb-6 bg-gold-accent opacity-0 animate-divider-in shadow-[0_0_15px_3px_rgba(199,164,91,0.4)]" />
                <p className="font-orange-avenue text-lg md:text-xl font-medium tracking-wider text-[#B0B0B2] max-w-4xl mx-auto opacity-0 animate-subheading-in">
                    Your Gateway to Digital Excellence and Innovation.
                </p>
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
