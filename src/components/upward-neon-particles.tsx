
"use client";

import { useEffect, useState } from 'react';

const NUM_PARTICLES = 80;
const NEON_COLORS = [
    '#39FF14', // Neon Green
    '#FF073A', // Neon Red
    '#0FF0FC', // Cyan
    '#F5D300', // Yellow
    '#FF00FF', // Magenta
    '#FF5F1F'  // Bright Orange
];

export const UpwardNeonParticles = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: NUM_PARTICLES }).map(() => {
        const color = NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)];
        return {
            left: `${Math.random() * 100}%`,
            size: `${Math.random() * 2.5 + 1}px`,
            delay: `${Math.random() * 20}s`,
            duration: `${Math.random() * 15 + 10}s`,
            color: color,
            opacity: Math.random() * 0.5 + 0.4
        }
    });
    setParticles(newParticles);
  }, []);

  return (
    <div className="particle-container animate-particles-in">
      {particles.map((p, i) => (
        <div
          key={i}
          className="particle up"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: p.opacity,
            animationDelay: p.delay,
            animationDuration: p.duration,
            boxShadow: `0 0 8px ${p.color}, 0 0 12px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
};
