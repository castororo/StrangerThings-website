import React, { useEffect, useState } from 'react';
import { useSound } from '@/context/SoundContext';

export default function AmbientTear() {
    const { playSound } = useSound();
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const triggerEvent = () => {
            // 1. Play Sound
            playSound('clock-chime-ambient');

            // 2. Shake Screen
            document.body.classList.add('clock-shake');

            // 3. Show Visual Rift
            setIsActive(true);

            // 4. Cleanup after 1 second (Event Duration)
            setTimeout(() => {
                document.body.classList.remove('clock-shake');
                setIsActive(false);
            }, 1000);

            // 5. Schedule Next Event
            scheduleNext();
        };

        const scheduleNext = () => {
            // Random interval between 2 and 5 minutes
            // 2 min = 120,000 ms
            // 5 min = 300,000 ms
            // range = 180,000 ms
            const minDelay = 120000;
            const maxDelay = 300000;
            // For testing, user might want it faster, but let's stick to spec.
            // Actually, for immediate feedback let's make the FIRST run faster?
            // No, strictly per plan.

            const delay = minDelay + Math.random() * (maxDelay - minDelay);

            timeoutId = setTimeout(triggerEvent, delay);
        };

        // Initial Schedule
        // Start slightly sooner for the first one? Maybe 30s to 60s
        // Spec said: "Start on page load... Choose random trigger time between 120,000 ms and 300,000 ms"
        // I will adhere to spec, but maybe run checks to ensure it doesn't trigger if user is interacting heavily?
        // "No UI is blocked — user can continue browsing" -> It's fine.

        scheduleNext();

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            document.body.classList.remove('clock-shake');
        };
    }, [playSound]);

    return (
        <div className={`ambient-tear ${isActive ? 'active' : ''}`} />
    );
}
