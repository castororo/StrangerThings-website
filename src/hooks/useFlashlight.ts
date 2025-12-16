import { useEffect, useRef, useState } from 'react';
import { useSound } from '@/context/SoundContext';
import { usePageVisibility } from './usePageVisibility';

export function useFlashlight(containerRef: React.RefObject<HTMLElement>) {
    const { playSound, stopSound } = useSound();
    const isVisible = usePageVisibility();
    const requestRef = useRef<number>();
    const mousePos = useRef({ x: 0, y: 0 });
    const [isHoveringAnomaly, setIsHoveringAnomaly] = useState(false);

    useEffect(() => {
        if (!isVisible || !containerRef.current) return;

        const container = containerRef.current;

        // Start ambient rumble
        playSound('flashlight-rumble');

        const updateFlashlight = () => {
            if (!container) return;

            // Update CSS variables for the masking effect
            // We need relative coordinates if the container isn't full screen, 
            // but user asked for "cursor tracking logic" usually implying screen or viewport.
            // However, CSS mask is usually on the container.
            // Let's assume fixed viewport for cinematic effect or client rects.

            const rect = container.getBoundingClientRect();
            const x = mousePos.current.x - rect.left;
            const y = mousePos.current.y - rect.top;

            container.style.setProperty('--flashlight-x', `${x}px`);
            container.style.setProperty('--flashlight-y', `${y}px`);

            // Anomaly Detection
            // Optimization: Throttle this check or keep simplistic?
            // "Simple detection system (bounding box collision)"
            const anomalies = container.querySelectorAll('.anomaly-zone');
            let foundAnomaly = false;

            // Simple point-in-rect check
            anomalies.forEach((anomaly) => {
                const aRect = anomaly.getBoundingClientRect();
                if (
                    mousePos.current.x >= aRect.left &&
                    mousePos.current.x <= aRect.right &&
                    mousePos.current.y >= aRect.top &&
                    mousePos.current.y <= aRect.bottom
                ) {
                    foundAnomaly = true;
                }
            });

            if (foundAnomaly) {
                if (!isHoveringAnomaly) {
                    setIsHoveringAnomaly(true);
                    playSound('anomaly-detect');
                    // Intensify beam (css class)
                    container.classList.add('anomaly-active');
                }
            } else {
                if (isHoveringAnomaly) {
                    setIsHoveringAnomaly(false);
                    stopSound('anomaly-detect');
                    container.classList.remove('anomaly-active');
                }
            }

            requestRef.current = requestAnimationFrame(updateFlashlight);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('mousemove', handleMouseMove);
        requestRef.current = requestAnimationFrame(updateFlashlight);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            stopSound('flashlight-rumble');
            stopSound('anomaly-detect');
            container.classList.remove('anomaly-active');
        };
    }, [isVisible, containerRef, playSound, stopSound, isHoveringAnomaly]);

    return { isHoveringAnomaly };
}
