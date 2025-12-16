import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Howl, Howler } from 'howler';
import { useTheme } from '@/hooks/useTheme';

interface SoundContextType {
    isPlaying: boolean;
    isMuted: boolean;
    volume: number;
    toggleMute: () => void;
    setVolume: (val: number) => void;
    playSound: (name: string) => void;
    stopSound: (name: string) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();
    const [isMuted, setIsMuted] = useState(true); // Start muted by default for UX/Browser policy
    const [volume, setVolumeState] = useState(0.5);
    const [isPlaying, setIsPlaying] = useState(false);

    // Refs to hold Howl instances
    const ambientLightRef = useRef<Howl | null>(null);
    const ambientDarkRef = useRef<Howl | null>(null);

    // SFX Refs (loaded on demand)
    const sfxRef = useRef<Record<string, Howl>>({});

    // Configuration for sounds
    const sfxUniqueConfigs = useRef<Record<string, { loop: boolean, volume: number }>>({
        'hover': { loop: false, volume: 0.5 },
        'click': { loop: false, volume: 0.5 },
        'switch_dimension': { loop: false, volume: 0.6 },
        'glitch': { loop: false, volume: 0.4 },
        'gate-open': { loop: false, volume: 0.7 },
        'tear-close': { loop: false, volume: 0.6 },
        'crackle': { loop: true, volume: 0.4 },
        'radar-hum': { loop: true, volume: 0.15 },
        'radar-blip': { loop: false, volume: 0.5 },
        'radar-click': { loop: false, volume: 0.5 },
        'static-burst': { loop: false, volume: 0.6 },

        'clock-chime-ambient': { loop: false, volume: 0.4 },
        'flashlight-rumble': { loop: true, volume: 0.3 },
        'anomaly-detect': { loop: false, volume: 0.6 },
    });

    useEffect(() => {
        // Initialize Ambient Tracks (keep these for now, or lazy load too?)
        // Let's keep ambient tracks as is for smoother BG audio start, or lazy load them on first user interaction?
        // Plan says "Load sound files ONLY after first user interaction". 
        // For now, let's stick to optimizing the SFX list which is growing large.

        ambientLightRef.current = new Howl({
            src: ['/sounds/ambient-light.mp3'],
            loop: true,
            volume: 0,
            html5: true,
        });

        ambientDarkRef.current = new Howl({
            src: ['/sounds/ambient-dark.mp3'],
            loop: true,
            volume: 0,
            html5: true,
        });

        return () => {
            ambientLightRef.current?.unload();
            ambientDarkRef.current?.unload();
            Object.values(sfxRef.current).forEach(h => h.unload());
        };
    }, []);

    const getOrLoadSound = (name: string): Howl | null => {
        if (sfxRef.current[name]) {
            return sfxRef.current[name];
        }

        const config = sfxUniqueConfigs.current[name];
        if (!config) {
            console.warn(`Sound configuration for "${name}" not found.`);
            return null;
        }

        const sound = new Howl({
            src: [`/sounds/sfx-${name}.mp3`],
            loop: config.loop,
            volume: config.volume,
            preload: true,
        });

        sfxRef.current[name] = sound;
        return sound;
    };

    const toggleMute = () => {
        setIsMuted(prev => !prev);
    };

    const stopSound = (name: string) => {
        const sound = sfxRef.current[name];
        if (sound) {
            sound.stop();
        }
    };

    const playSound = (name: string) => {
        if (isMuted) return;
        const sound = getOrLoadSound(name);
        if (sound) {
            // If it's a looping sound and already playing, don't restart?
            // "Prevent overlapping audio instances" logic
            if (sound.loop() && sound.playing()) return;
            sound.play();
            console.log(`[Sound] Playing: ${name}`);
        } else {
            console.warn(`[Sound] Sound not found or not loaded: ${name}`);
        }
    };

    const setVolume = (val: number) => {
        setVolumeState(val);
    };

    return (
        <SoundContext.Provider value={{ isPlaying, isMuted, volume, toggleMute, setVolume, playSound, stopSound }}>
            {children}
        </SoundContext.Provider>
    );
}

export function useSound() {
    const context = useContext(SoundContext);
    if (!context) {
        throw new Error('useSound must be used within a SoundProvider');
    }
    return context;
}
