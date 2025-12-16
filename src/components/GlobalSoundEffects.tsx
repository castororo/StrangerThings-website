import { useEffect, useRef } from 'react';
import { useSound } from '@/context/SoundContext';

export default function GlobalSoundEffects() {
    const { playSound } = useSound();
    const lastHoverTime = useRef(0);

    useEffect(() => {
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if interactive
            const interactive = target.closest('a, button, [role="button"], input, select, textarea, .interactive');

            if (interactive) {
                // Debounce/Throttle to prevent spam
                const now = Date.now();
                if (now - lastHoverTime.current > 50) { // 50ms throttle
                    playSound('hover');
                    lastHoverTime.current = now;
                }
            }
        };

        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const interactive = target.closest('a, button, [role="button"], input, select, textarea, .interactive');

            if (interactive) {
                playSound('click');
            }
        };

        // Use capture phase or bubbling? Bubbling is usually fine.
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('click', handleClick);
        };
    }, [playSound]);

    return null; // Headless component
}
