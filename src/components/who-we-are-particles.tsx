
'use client';
import { useState, useEffect } from 'react';

const PARTICLE_COUNT = 100;
const GLOWING_COLORS = ['#C7A45B', '#23C6D9', '#FF00FF']; // Gold, Teal, Magenta

export const WhoWeAreParticles = () => {
    const [particles, setParticles] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const generateParticles = () => {
            return Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
                const size = Math.random() * 3 + 1;
                const color = GLOWING_COLORS[Math.floor(Math.random() * GLOWING_COLORS.length)];
                const style = {
                    left: `${Math.random() * 100}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: color,
                    boxShadow: `0 0 8px ${color}, 0 0 12px ${color}66`,
                    animationDuration: `${Math.random() * 25 + 20}s`,
                    animationDelay: `-${Math.random() * 30}s`,
                };
                return <div key={i} className="particle" style={style} />;
            });
        };
        setParticles(generateParticles());
    }, []);

    return <div className="particle-container">{particles}</div>;
};
