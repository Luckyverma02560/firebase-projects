
"use client";

import { CSSProperties } from 'react';

interface WhoWeAreCardProps {
    transform: string;
    rotation: { rotateX: number; rotateY: number };
}

export const WhoWeAreCard = ({ transform, rotation }: WhoWeAreCardProps) => {

    return (
        <div
            className="bg-[rgba(30,30,32,0.65)] backdrop-blur-xl rounded-2xl border border-[rgba(199,164,91,0.3)] text-center p-8 md:p-16 transition-all duration-100 ease-out animated-glow"
            style={{ transform }}
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
                <div className="grid md:grid-cols-3 gap-8 text-subtle-text/90 text-sm leading-relaxed mt-12">
                    <div className="bg-black/20 border border-gold-accent/50 rounded-lg p-6 animate-fade-in-up flex flex-col items-center" style={{ animationDelay: '1.2s' }}>
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-red-600 flex items-center justify-center mb-4">
                            <span className="text-2xl font-bold text-white">1</span>
                        </div>
                        <h4 className="font-headline text-gold-accent text-lg mb-3">Choose Your Plan</h4>
                        <p>
                            Choose Your Desired OTT/Softwares and Add To Cart OR Hit Buy.
                        </p>
                    </div>
                    <div className="bg-black/20 border border-gold-accent/50 rounded-lg p-6 animate-fade-in-up flex flex-col items-center" style={{ animationDelay: '1.4s' }}>
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-red-600 flex items-center justify-center mb-4">
                            <span className="text-2xl font-bold text-white">2</span>
                        </div>
                        <h4 className="font-headline text-gold-accent text-lg mb-3">Pay via QR</h4>
                        <p>
                            Quick And Secure Payment Via UPI And Whatsapp.
                        </p>
                    </div>
                    <div className="bg-black/20 border border-gold-accent/50 rounded-lg p-6 animate-fade-in-up flex flex-col items-center" style={{ animationDelay: '1.6s' }}>
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-red-600 flex items-center justify-center mb-4">
                            <span className="text-2xl font-bold text-white">3</span>
                        </div>
                        <h4 className="font-headline text-gold-accent text-lg mb-3">Rapid Activation</h4>
                        <p>
                           Get Your Login Details And start Streaming 4K In Minutes.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
