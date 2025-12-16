import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

export default function CustomCursor() {
    const isMobile = useIsMobile();
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Motion values for smooth physics
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Spring physics for the trailing follower
    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const followerX = useSpring(cursorX, springConfig);
    const followerY = useSpring(cursorY, springConfig);

    useEffect(() => {
        if (isMobile) return;

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseDown = () => setIsHovering(true); // Re-use hover state for click ripple potential
        const handleMouseUp = () => setIsHovering(false);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if hovering over clickable elements
            const isClickable = target.closest('a, button, input, textarea, [role="button"], .clickable');
            setIsHovering(!!isClickable);
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mouseout', () => setIsVisible(false));
        window.addEventListener('mouseenter', () => setIsVisible(true));

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mouseout', () => setIsVisible(false));
            window.removeEventListener('mouseenter', () => setIsVisible(true));
        };
    }, [isMobile, cursorX, cursorY, isVisible]);

    if (isMobile) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
            {/* Main Dot */}
            <motion.div
                className={cn(
                    "absolute h-2 w-2 rounded-full bg-white transition-opacity duration-300",
                    isVisible ? "opacity-100" : "opacity-0"
                )}
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />

            {/* Trailing Glow / Ring */}
            <motion.div
                className={cn(
                    "absolute h-8 w-8 rounded-full border border-primary/50 bg-primary/10 transition-all duration-300",
                    isVisible ? "opacity-100" : "opacity-0",
                    isHovering && "scale-150 border-primary bg-primary/20"
                )}
                style={{
                    x: followerX,
                    y: followerY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                {/* Particle effect inside */}
                <div className="absolute inset-0 animate-pulse-glow rounded-full opacity-50 blur-[2px]" />
            </motion.div>
        </div>
    );
}
