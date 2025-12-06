
"use client";

import { useEffect, useState } from 'react';

const NUM_PARTICLES = 40;

export const WhoWeAreParticles = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: NUM_PARTICLES }).map(() => ({
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2.5 + 1}px`,
      delay: `${Math.random() * 30}s`,
      duration: `${Math.random() * 20 + 20}s`,
      color: `rgba(35, 198, 217, ${Math.random() * 0.3 + 0.1})`,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="particle-container">
      {particles.map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDelay: p.delay,
            animationDuration: p.duration,
            boxShadow: `0 0 10px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
};
