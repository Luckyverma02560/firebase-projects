
"use client"

import { useState, useEffect } from 'react';
import { AnimateOnScroll } from '@/components/animate-on-scroll';
import { WhoWeAreSection } from '@/components/who-we-are-section';
import { OurStorySection } from '@/components/our-story-section';
import { OurVisionSection } from '@/components/our-vision-section';
import { OurMissionSection } from '@/components/our-mission-section';
import { OurTeamSection } from '@/components/our-team-section';
import { DisclaimerSection } from '@/components/disclaimer-section';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { HeroParticles } from '@/components/hero-particles';
import Footer from '@/components/footer';
import { FooterParticles } from '@/components/footer-particles';

const teamMembers = [
  { id: 'team1', name: 'Harshit Verma', role: 'Founder & CEO' },
  { id: 'team2', name: 'Amit A.', role: 'Co-Founder & COO' },
  { id: 'team3', name: 'Ankit M.', role: 'Head of Operations' },
  { id: 'team4', name: 'Riddhima B.', role: 'Talent Acquisition Lead' },
  { id: 'team5', name: 'Nishant G.', role: 'Senior Manager' },
  { id: 'team6', name: 'Ankit J.', role: 'Senior Manager' },
  { id: 'team7', name: 'Nupur A.', role: 'Manager' },
  { id: 'team8', name: 'Aastha G.', role: 'Manager' },
  { id: 'team9', name: 'Poonam P.', role: 'Assistant Manager' },
];

export default function Home() {
  const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (y / rect.height - 0.5) * -4;
    const rotateY = (x / rect.width - 0.5) * 4;
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
      <section 
        className="relative h-screen w-full flex items-center justify-center text-center text-white overflow-hidden bg-gradient-angled animate-background-in"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute inset-0 animate-particles-in">
            <HeroParticles />
        </div>
        
        <div className="relative z-10 p-4" style={transformStyle}>
            <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-medium tracking-[3px] uppercase opacity-0 animate-heading-in hero-heading-sweep">
              EL<span className="text-[1.2em]">11</span>VEN HUB
            </h1>
            <div className="w-32 h-0.5 mx-auto mt-8 mb-6 bg-gold-accent opacity-0 animate-divider-in shadow-[0_0_15px_3px_rgba(199,164,91,0.4)]" />
            <p className="font-inter text-lg md:text-xl text-[#B0B0B2] max-w-2xl mx-auto opacity-0 animate-subheading-in">
                Your Gateway to Digital Excellence and Innovation.
            </p>
        </div>
      </section>

      <div className="bg-[#1A1C20] relative">
        <WhoWeAreSection />
        <AnimateOnScroll>
          <OurStorySection />
        </AnimateOnScroll>
        <AnimateOnScroll>
          <OurVisionSection />
        </AnimateOnScroll>
        <AnimateOnScroll>
          <OurMissionSection />
        </AnimateOnScroll>
        <AnimateOnScroll>
          <OurTeamSection teamMembers={teamMembers} placeholderImages={PlaceHolderImages} />
        </AnimateOnScroll>
        <div className="relative bg-[#121315]">
          <div className="absolute bottom-0 left-0 w-full h-[150%] pointer-events-none">
            <FooterParticles />
          </div>
          <div className="relative z-10">
            <AnimateOnScroll>
              <DisclaimerSection />
            </AnimateOnScroll>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
