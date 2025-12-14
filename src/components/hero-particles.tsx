
"use client";

import { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const NUM_PARTICLES_DESKTOP = 150;
const NUM_PARTICLES_MOBILE = 50;

const NEON_COLORS = [
    '#39FF14', // Neon Green
    '#FF073A', // Neon Red
    '#0FF0FC', // Cyan
    '#F5D300', // Yellow
    '#FF00FF', // Magenta
    '#FF5F1F'  // Bright Orange
];

export const HeroParticles = () => {
  const [particles, setParticles] = useState<any[]>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    const numParticles = isMobile ? NUM_PARTICLES_MOBILE : NUM_PARTICLES_DESKTOP;
    const newParticles = Array.from({ length: numParticles }).map(() => {
        const color = NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)];
        return {
            left: `${Math.random() * 100}%`,
            size: `${Math.random() * 2 + 1}px`,
            delay: `${Math.random() * 25}s`,
            duration: `${Math.random() * 10 + 25}s`,
            color: color,
            opacity: Math.random() * 0.4 + 0.3
        }
    });
    setParticles(newParticles);
  }, [isMobile]);

  return (
    <div className="particle-container animate-particles-in">
      {particles.map((p, i) => (
        <div
          key={i}
          className="particle down"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: p.opacity,
            animationDelay: p.delay,
            animationDuration: p.duration,
            boxShadow: `0 0 6px ${p.color}, 0 0 10px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
};
