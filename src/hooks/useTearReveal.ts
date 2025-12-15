import { useState, useRef, useEffect, useCallback } from 'react';
import { useSpring, useMotionValue } from 'framer-motion';

interface TearState {
    isDragging: boolean;
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
}

export function useTearReveal() {
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Motion values for high-performance updates
    const tearWidth = useSpring(0, { damping: 15, stiffness: 200, mass: 0.5 });
    const tearHeight = useSpring(0, { damping: 15, stiffness: 200, mass: 0.5 });
    const tearCenterX = useSpring(0, { damping: 20, stiffness: 300 });
    const tearCenterY = useSpring(0, { damping: 20, stiffness: 300 });

    // Internal state for drag calculations
    const dragStart = useRef({ x: 0, y: 0 });

    const handlePointerDown = useCallback((e: React.PointerEvent) => {
        if (!containerRef.current) return;
        setIsDragging(true);
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        dragStart.current = { x, y };
        tearCenterX.set(x);
        tearCenterY.set(y);

        // Lock body scroll on mobile
        document.body.style.overflow = 'hidden';
    }, [tearCenterX, tearCenterY]);

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
        if (!isDragging || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;

        // Calculate drag distance
        const dx = currentX - dragStart.current.x;
        const dy = currentY - dragStart.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Update tear size based on drag distance
        // Max width 600px, but mapped logarithmically for better feel
        const size = Math.min(distance * 2.5, 800);

        tearWidth.set(size);
        tearHeight.set(size * 0.4); // Eye shape ratio

        // Optional: Move center slightly with drag? 
        // For now, keep center fixed at start point for "tearing open from point" feel
    }, [isDragging, tearWidth, tearHeight]);

    const handlePointerUp = useCallback(() => {
        setIsDragging(false);
        tearWidth.set(0);
        tearHeight.set(0);
        document.body.style.overflow = '';
    }, [tearWidth, tearHeight]);

    // Clean up on unmount
    useEffect(() => {
        const handleGlobalUp = () => {
            if (isDragging) handlePointerUp();
        };
        window.addEventListener('mouseup', handleGlobalUp);
        window.addEventListener('touchend', handleGlobalUp);
        return () => {
            window.removeEventListener('mouseup', handleGlobalUp);
            window.removeEventListener('touchend', handleGlobalUp);
            document.body.style.overflow = '';
        };
    }, [isDragging, handlePointerUp]);

    return {
        containerRef,
        isDragging,
        tearWidth,
        tearHeight,
        tearCenterX,
        tearCenterY,
        handlers: {
            onPointerDown: handlePointerDown,
            onPointerMove: handlePointerMove,
            onPointerUp: handlePointerUp,
            onPointerLeave: handlePointerUp
        } as {
            onPointerDown: (e: React.PointerEvent) => void;
            onPointerMove: (e: React.PointerEvent) => void;
            onPointerUp: (e: React.PointerEvent) => void;
            onPointerLeave: (e: React.PointerEvent) => void;
        }
    };
}
