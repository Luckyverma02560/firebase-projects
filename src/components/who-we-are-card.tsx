
"use client";

import { CSSProperties } from 'react';

interface WhoWeAreCardProps {
    transform: string;
    rotation: { rotateX: number; rotateY: number };
}

export const WhoWeAreCard = ({ transform, rotation }: WhoWeAreCardProps) => {
    
    const shadowX = -rotation.rotateY * 0.7;
    const shadowY = rotation.rotateX * 0.7;

    const cardStyle: CSSProperties = {
        transform: transform,
        boxShadow: `
            ${shadowX}px ${shadowY}px 30px rgba(0, 191, 255, 0.3),
            inset 0 0 15px rgba(0, 191, 255, 0.1)
        `,
        willChange: 'transform, box-shadow'
    };

    return (
        <div
            className="bg-[rgba(30,30,32,0.65)] backdrop-blur-xl rounded-2xl border border-[rgba(199,164,91,0.3)] text-center p-8 md:p-16 transition-all duration-100 ease-out"
            style={cardStyle}
        >
            <div className="relative">
                <div className="light-streak"></div>
                <h2 
                    className="font-headline text-5xl md:text-6xl font-bold text-heading-text tracking-[2px] animate-fade-in-up transition-all duration-300 ease-out" 
                    style={{ animationDelay: '0.2s' }}
                >
                    <span className="heading-light-sweep">HOW IT WORKS</span>
                </h2>
                <div className="w-32 h-0.5 mx-auto my-6 gold-divider" />
                <p className="font-inter text-lg text-subtle-text max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                    Bridging Insight and Intelligence in Global Capital Markets
                </p>
                <div className="grid md:grid-cols-2 gap-8 text-subtle-text/70 text-base leading-relaxed mt-12 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
                    <p>
                        LoQ Capital Markets is a premier provider of research and
                        analytics (R&A) services for financial institutions across the globe. We
                        provide a broad range of services, including equity research, credit
                        research, investment banking support, and financial modeling.
                    </p>
                    <p>
                        Our team of experienced professionals has a deep understanding of the
                        capital markets and is committed to providing our clients with the
                        highest quality of service. We are headquartered in New Delhi, India,
                        and have a team of over 50 professionals.
                    </p>
                </div>
            </div>
        </div>
    )
}
