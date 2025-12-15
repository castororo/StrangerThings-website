import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { useEffect, useState } from 'react';

export default function DimensionShifter() {
    const { isTransitioning, theme } = useTheme();
    const [active, setActive] = useState(false);

    // Sync active state with transition to allow exit animations
    useEffect(() => {
        if (isTransitioning) setActive(true);
        else {
            // Small delay to allow exit animation if needed, or just let AnimatePresence handle it
            const timer = setTimeout(() => setActive(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isTransitioning]);

    return (
        <AnimatePresence>
            {isTransitioning && (
                <motion.div
                    className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Glitch Overlay */}
                    <motion.div
                        className="absolute inset-0 bg-background mix-blend-exclusion"
                        initial={{ scaleY: 0, scaleX: 0.1, filter: 'hue-rotate(0deg)' }}
                        animate={{
                            scaleY: [0, 1.5, 0],
                            scaleX: [0.1, 1, 0.1],
                            filter: ['hue-rotate(0deg)', 'hue-rotate(90deg)', 'hue-rotate(0deg)']
                        }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />

                    {/* Central Flash */}
                    <motion.div
                        className="absolute inset-0 bg-primary/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1, delay: 0.5 }}
                    />

                    {/* Chromatic Aberration Lines */}
                    {Array.from({ length: 5 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-full h-[2px] bg-primary"
                            style={{ top: `${20 + i * 15}%` }}
                            initial={{ x: '-100%', opacity: 0 }}
                            animate={{
                                x: ['100%', '-100%'],
                                opacity: [0, 1, 0]
                            }}
                            transition={{ duration: 1.5, delay: i * 0.1, repeat: 1 }}
                        />
                    ))}

                </motion.div>
            )}
        </AnimatePresence>
    );
}
