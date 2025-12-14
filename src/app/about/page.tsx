
"use client";

import { Suspense } from 'react';
import { StarfieldAnimation } from '@/components/starfield-animation';
import { HeroParticles } from '@/components/hero-particles';
import { UpwardNeonParticles } from '@/components/upward-neon-particles';
import { GoBackButton } from '@/components/go-back-button';
import { PlansSection } from '@/components/plans-section';
import { useSearchParams } from 'next/navigation';

interface AboutPageProps {
  searchParams?: {
    service?: string;
  };
}

function AboutPageClient({ searchParams }: AboutPageProps) {
  const selectedService = searchParams?.service || null;
  const showPlans = !!selectedService;

  return (
    <div className="relative overflow-hidden">
      {showPlans && <GoBackButton />}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0E0E10] to-[#1B1C1E] z-0" />
      <div className="absolute inset-0 z-1 pointer-events-none">
          <HeroParticles />
          <UpwardNeonParticles />
      </div>
      <div className="aurora-background">
        <div className="aurora-layer" style={{ top: '10%', left: '20%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(48, 8, 96, 0.5) 0%, transparent 70%)', animationDuration: '20s' }}></div>
        <div className="aurora-layer" style={{ top: '50%', left: '70%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(10, 50, 120, 0.5) 0%, transparent 70%)', animationDuration: '30s', animationDelay: '5s' }}></div>
        <div className="aurora-layer" style={{ top: '80%', left: '30%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(80, 10, 60, 0.5) 0%, transparent 70%)', animationDuration: '25s', animationDelay: '10s' }}></div>
      </div>
      <StarfieldAnimation />
      <div className="relative z-2">
        <PlansSection
          showPlans={showPlans}
          selectedService={selectedService}
        />
      </div>
    </div>
  );
}

// This is the main page component, now correctly set up for Suspense.
function AboutPageWithSuspense() {
  const searchParams = useSearchParams();
  const service = searchParams.get('service');
  
  const props = {
    searchParams: {
      service: service || undefined,
    },
  };

  return <AboutPageClient {...props} />;
}

export default function AboutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AboutPageWithSuspense />
    </Suspense>
  );
}
