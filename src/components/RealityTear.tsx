import React, { useId, useState, useMemo } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { motion } from 'framer-motion';
import { useTearReveal } from '@/hooks/useTearReveal';

interface RealityTearProps {
    children?: React.ReactNode;
    className?: string;
}

export default function RealityTear({ children, className = '' }: RealityTearProps) {
    const { theme } = useTheme();
    const maskId = useId();
    const {
        containerRef,
        isDragging,
        tearWidth,
        tearHeight,
        tearCenterX,
        tearCenterY,
        handlers
    } = useTearReveal();

    // Generate a random jagged polygon for the tear shape
    // This stays constant for the component instance to keep the same "rip" pattern
    const noisePoints = useMemo(() => {
        return Array.from({ length: 12 }).map(() => Math.random());
    }, []);

    return (
        <div
            ref={containerRef}
            className={`relative group touch-none select-none ${className} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            {...handlers}
        >
            {/* 
        LAYER 1: BOTTOM (The "Revealed" Dimension)
        Always fully visible in the DOM, but effectively hidden by the Top Layer 
        unless the Top Layer has a hole (mask) in it.
      */}
            <div
                className="absolute inset-0 bg-cover bg-center pointer-events-none"
                style={{
                    backgroundImage: theme === 'light'
                        ? 'url("/images/about_upside.png")'
                        : 'url("/images/about_normal.png")'
                }}
            >
                {/* Optional: Add some "internal" effects to the revealed layer here, like fog or particles */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* 
         LAYER 2: TOP (The "Current" Dimension)
         This layer has an SVG MASK applied to it.
      */}
            <motion.div
                className="relative bg-cover bg-center transition-colors duration-300"
                style={{
                    // Apply the mask via CSS. 
                    // We use WebkitMask for compatibility.
                    maskImage: `url(#${maskId})`,
                    WebkitMaskImage: `url(#${maskId})`,
                }}
            >
                {/* The Actual Content (Children) goes here, inside the "Normal" world */}
                <div
                    className="bg-cover bg-center"
                    style={{
                        backgroundImage: theme === 'light'
                            ? 'url("/images/about_normal.png")'
                            : 'url("/images/about_upside.png")'
                    }}
                >
                    {children}
                </div>
            </motion.div>

            {/* 
        SVG MASK DEFINITION 
        Rendered invisibly, referenced by ID.
      */}
            <svg className="absolute w-0 h-0 pointer-events-none">
                <defs>
                    <mask id={maskId} maskUnits="objectBoundingBox" maskContentUnits="userSpaceOnUse">
                        {/* 
               1. White Rect = Everything is visible by default 
             */}
                        <rect x="0" y="0" width="10000" height="10000" fill="white" />

                        {/* 
               2. Black Shape = The "Hole" (Tear)
               We use framer-motion's motion.path or motion.ellipse to animate it.
             */}
                        <TearShape
                            cx={tearCenterX}
                            cy={tearCenterY}
                            rx={tearWidth}
                            ry={tearHeight}
                            noise={noisePoints}
                        />
                    </mask>
                </defs>
            </svg>
        </div>
    );
}

// Sub-component to render the jagged shape driven by MotionValues
function TearShape({ cx, cy, rx, ry, noise }: { cx: any, cy: any, rx: any, ry: any, noise: number[] }) {
    // We need to re-render this SVG path on every frame potentially?
    // Actually, framer-motion components in SVG are highly optimized.
    // We construct a path d-string or use an ellipse with filter?
    // Simpler: Use a motion.ellipse for the base, and an SVG filter for distortion?
    // OR: Just a polygon. Let's try an ellipse first for smoothness, then add noise.

    // To make it jagged without complex path math on every frame, 
    // we can use <motion.ellipse> and apply an SVG <filter> with <feTurbulence>.

    return (
        <>
            <filter id="tear-distortion">
                <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" />
            </filter>

            <motion.ellipse
                cx={cx}
                cy={cy}
                rx={rx}
                ry={ry}
                fill="black"
                filter="url(#tear-distortion)"
            />
        </>
    );
}
