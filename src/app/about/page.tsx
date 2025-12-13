
"use client"

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { HeroParticles } from '@/components/hero-particles';
import { UpwardNeonParticles } from '@/components/upward-neon-particles';
import { PlansSection } from '@/components/plans-section';
import { StarfieldAnimation } from '@/components/starfield-animation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useRouter } from 'next/navigation';

function AboutPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceQueryParam = searchParams.get('service');
  
  const [selectedService, setSelectedService] = useState<string | null>(null);

  useEffect(() => {
    setSelectedService(serviceQueryParam);
  }, [serviceQueryParam]);

  const handleViewPlans = (serviceName: string) => {
      // Use router.push to update the URL without a full page reload
      router.push(`/about?service=${encodeURIComponent(serviceName)}`, { scroll: false });
  };

  const handleGoBack = () => {
      // Use router.push to navigate back to the service selection view
      router.push('/about', { scroll: false });
  };

  // Determine if we should show plans based on the state, which is derived from the URL query param
  const showPlans = selectedService !== null;

  return (
    <>
      <div className="relative overflow-hidden">
        {showPlans && (
            <div className="absolute top-28 left-4 md:left-8 z-30">
                 <Button
                    onClick={handleGoBack}
                    variant="ghost"
                    size="icon"
                    className={cn(
                        'rounded-full w-12 h-12 bg-black/30 text-gold-accent backdrop-blur-sm',
                        'hover:bg-gold-accent/20 hover:text-white transition-all duration-300',
                        'border border-gold-accent/30 hover:border-gold-accent/60'
                    )}
                    aria-label="Go back to service selection"
                >
                    <ArrowLeft className="h-7 w-7" />
                </Button>
            </div>
        )}
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
          <PlansSection showPlans={showPlans} onShowPlans={handleViewPlans} selectedService={selectedService} />
        </div>
      </div>
    </>
  );
}

export default function AboutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AboutPageContent />
    </Suspense>
  )
}
