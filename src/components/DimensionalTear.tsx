import React, { useId, useMemo } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useSound } from '@/context/SoundContext';
import { motion } from 'framer-motion';
import { useTearReveal } from '@/hooks/useTearReveal';

interface DimensionalTearProps {
    children: React.ReactNode;
    className?: string;
}

import { useIsMobile } from '@/hooks/use-mobile';

export default function DimensionalTear({ children, className = '' }: DimensionalTearProps) {
    const { theme } = useTheme();
    const maskId = useId();
    const isMobile = useIsMobile();
    const {
        containerRef,
        isDragging,
        tearWidth,
        tearHeight,
        tearCenterX,
        tearCenterY,
        handlers: originalHandlers
    } = useTearReveal();

    const { playSound, stopSound } = useSound();

    // Wrap handlers to add sound
    const handlers = {
        ...originalHandlers,
        onPointerDown: (e: any) => {
            if (isMobile) return;
            originalHandlers.onPointerDown(e);
            playSound('gate-open');
            playSound('crackle');
        },
        onPointerUp: (e: any) => {
            originalHandlers.onPointerUp(e);
            stopSound('crackle');
            playSound('tear-close');
        },
        // Handle PointerLeave similarly if needed, or rely on useTearReveal's global up
    };

    const noisePoints = useMemo(() => Array.from({ length: 12 }).map(() => Math.random()), []);

    return (
        <div
            ref={containerRef}
            className={`relative groupSelect-none ${className} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} ${isMobile ? 'touch-auto' : 'touch-none'}`}
            {...handlers}
        >
            {/* 
        LAYER 1: UPSIDE DOWN (The "Underneath" Dimension)
        Positioned absolutely, fully covering the area.
        Revealed only when top layer is masked.
      */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none bg-black">
                {/* Upside Down Content: Flipped and Filtered */}
                <div
                    className="w-full h-full relative"
                    style={{
                        transform: 'scaleY(-1)',
                        filter: 'sepia(1) hue-rotate(-50deg) saturate(3) contrast(1.2) brightness(0.8)'
                    }}
                >
                    {/* We clone the children here to replicate the content */}
                    {children}
                </div>

                {/* ATMOSPHERIC OVERLAYS */}

                {/* 1. Red Fog Animation */}
                <div className="absolute inset-0 opacity-60 mix-blend-screen pointer-events-none animate-fog-flow"
                    style={{ backgroundImage: 'url("/images/red_fog_overlay.png")', backgroundSize: 'cover' }}
                />

                {/* 2. Vines Overlay */}
                <div className="absolute inset-0 opacity-80 mix-blend-multiply pointer-events-none"
                    style={{ backgroundImage: 'url("/images/vines_overlay.png")', backgroundSize: '100% 100%' }}
                />

                {/* 3. Grain/Noise */}
                <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none bg-noise" />

                {/* 4. Pulsating Red Glow */}
                <div className="absolute inset-0 bg-gradient-radial from-red-900/40 to-transparent animate-pulse-slow" />
            </div>

            {/* 
         LAYER 2: NORMAL WORLD (Top Layer)
         This layer has the SVG MASK applied to it.
         The mask creates a "hole" (black part of mask) where the Tear is.
      */}
            <motion.div
                className="relative transition-colors duration-300 bg-background"
                style={{
                    // Masking logic: 
                    // White in mask = Visible. Black in mask = Hidden (Hole).
                    maskImage: `url(#${maskId})`,
                    WebkitMaskImage: `url(#${maskId})`,
                }}
            >
                {children}
            </motion.div>

            {/* SVG MASK DEFINITION */}
            <svg className="absolute w-0 h-0 pointer-events-none">
                <defs>
                    <mask id={maskId} maskUnits="objectBoundingBox" maskContentUnits="userSpaceOnUse">
                        {/* Base: Everything visible */}
                        <rect x="0" y="0" width="10000" height="10000" fill="white" />

                        {/* The Tear Hole: animated jagged ellipse */}
                        <TearShape
                            cx={tearCenterX}
                            cy={tearCenterY}
                            rx={tearWidth}
                            ry={tearHeight}
                        />
                    </mask>
                </defs>
            </svg>
        </div>
    );
}

function TearShape({ cx, cy, rx, ry }: { cx: any, cy: any, rx: any, ry: any }) {
    return (
        <>
            <filter id="tear-turbulence">
                <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" />
            </filter>

            <motion.ellipse
                cx={cx}
                cy={cy}
                rx={rx}
                ry={ry}
                fill="black"
                filter="url(#tear-turbulence)"
            />
        </>
    );
}
