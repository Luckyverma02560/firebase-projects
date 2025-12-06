
"use client";

import { useEffect, useState } from 'react';

const NUM_PARTICLES = 30;

export const HeroParticles = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: NUM_PARTICLES }).map(() => ({
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      delay: `${Math.random() * 20}s`,
      duration: `${Math.random() * 15 + 10}s`,
      color: `rgba(199, 164, 91, ${Math.random() * 0.4 + 0.1})`,
    }));
    setParticles(newParticles);
  }, []);

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
            animationDelay: p.delay,
            animationDuration: p.duration,
            boxShadow: `0 0 8px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
};
