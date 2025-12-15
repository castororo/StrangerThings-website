import React, { useEffect, useState, memo } from 'react';
import { useSound } from '@/context/SoundContext';
import { usePageVisibility } from '@/hooks/usePageVisibility';

const DETECTIONS = [
    "Entity detected at 8 o’clock",
    "Dimensional tear forming nearby",
    "Energy spike detected",
    "Anomaly signature unstable",
    "Demogorgon screech distant",
    "Upside Down interference",
    "Mind Flayer signal weak"
];

function EntityRadar() {
    const { playSound, stopSound } = useSound();
    const isVisible = usePageVisibility();
    const [isDetecting, setIsDetecting] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [blipPosition, setBlipPosition] = useState({ top: '50%', left: '50%' });

    // Radar Hum Management
    useEffect(() => {
        if (isVisible) {
            playSound('radar-hum');
        } else {
            stopSound('radar-hum');
        }
        return () => stopSound('radar-hum');
    }, [playSound, stopSound, isVisible]);

    // Detection Logic Loop
    useEffect(() => {
        if (!isVisible) return; // Pause updates when not visible

        let timeoutId: NodeJS.Timeout;

        const triggerDetection = () => {
            // 1. Randomize Blip
            const angle = Math.random() * 360;
            const radius = 30 + Math.random() * 40; // 30-70% radius
            const top = 50 - (Math.sin(angle * Math.PI / 180) * radius) + '%';
            const left = 50 + (Math.cos(angle * Math.PI / 180) * radius) + '%';

            setBlipPosition({ top, left });
            setIsDetecting(true);

            const randomMsg = DETECTIONS[Math.floor(Math.random() * DETECTIONS.length)];
            setMessage(randomMsg);
            playSound('radar-blip');

            // Reset after animation
            setTimeout(() => {
                setIsDetecting(false);
                setMessage(null);
            }, 4000);

            // Re-schedule
            scheduleNext();
        };

        const scheduleNext = () => {
            const delay = 15000 + Math.random() * 15000; // 15-30s
            timeoutId = setTimeout(triggerDetection, delay);
        };

        scheduleNext();

        return () => clearTimeout(timeoutId);
    }, [playSound, isVisible]);

    const handleRadarClick = () => {
        playSound('radar-click');
        playSound('static-burst');

        // Global Flash Effect
        document.body.classList.add('upsidedown-flash');
        setTimeout(() => {
            document.body.classList.remove('upsidedown-flash');
        }, 1000);
    };

    if (!isVisible) return null; // Optional: Don't render animations offscreen? Or keep static?
    // Let's keep rendering but stop logic. Actually rendering static is fine.

    return (
        <div
            id="entity-radar"
            onClick={handleRadarClick}
            className="fixed bottom-8 right-8 w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-red-900/50 bg-black z-50 overflow-hidden cursor-pointer shadow-[0_0_15px_rgba(255,0,0,0.4)] group hover:shadow-[0_0_25px_rgba(255,0,0,0.6)] transition-shadow"
            style={{ willChange: 'transform' }}
        >
            {/* SCANLINE OVERLAY */}
            <div className="absolute inset-0 pointer-events-none bg-[url('/images/crt-scanlines.png')] opacity-20 z-20 mix-blend-overlay" />

            {/* RADAR SWEEP ARM */}
            <div className="absolute inset-0 z-10 animate-radar-sweep origin-center rounded-full bg-gradient-to-r from-transparent via-red-500/10 to-transparent border-t border-red-500/50" />

            {/* RINGS */}
            <div className="absolute inset-0 rounded-full border border-red-900/30 scale-50" />
            <div className="absolute inset-0 rounded-full border border-red-900/30 scale-75" />
            <div className="absolute inset-0 rounded-full border border-red-500/20 animate-pulse-slow" />

            {/* CROSSHAIR */}
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-red-900/30" />
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-red-900/30" />

            {/* BLIP - Only visible when detecting */}
            {isDetecting && (
                <div
                    className="absolute w-2 h-2 bg-red-500 rounded-full animate-ping z-20"
                    style={{ top: blipPosition.top, left: blipPosition.left }}
                />
            )}

            {/* MESSAGE POPUP */}
            {message && (
                <div className="absolute -top-12 right-0 w-48 bg-black/80 text-red-500 text-xs font-mono p-2 border border-red-900/50 rounded pointer-events-none animate-in fade-in slide-in-from-bottom-2">
                    <span className="animate-pulse">⚠</span> {message}
                </div>
            )}
        </div>
    );
}

export default memo(EntityRadar);
