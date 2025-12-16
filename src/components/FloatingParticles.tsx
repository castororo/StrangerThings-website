import { useEffect, useRef, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface ParticleData {
  id: number;
  x: number; // percentage
  y: number; // percentage
  size: number;
  duration: number;
  delay: number;
}

interface FloatingParticlesProps {
  count?: number;
  className?: string;
}

export default function FloatingParticles({ count = 30, className = '' }: FloatingParticlesProps) {
  const isMobile = useIsMobile();

  // Mouse position in viewport percentage (0-100)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Convert pixel coordinates to percentage of window size
      const xPct = (e.clientX / window.innerWidth) * 100;
      const yPct = (e.clientY / window.innerHeight) * 100;
      mouseX.set(xPct);
      mouseY.set(yPct);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, mouseX, mouseY]);

  const particles = useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  })), [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <InteractiveParticle
          key={particle.id}
          data={particle}
          mouseX={mouseX}
          mouseY={mouseY}
          isMobile={!!isMobile}
        />
      ))}
    </div>
  );
}

function InteractiveParticle({
  data,
  mouseX,
  mouseY,
  isMobile
}: {
  data: ParticleData;
  mouseX: any;
  mouseY: any;
  isMobile: boolean;
}) {
  // Repulsion Logic
  const repelX = useTransform(mouseX, (mx: number) => {
    if (isMobile) return 0;
    const dx = mx - data.x;
    const dy = mouseY.get() - data.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Interaction Radius: 15% of viewport (approx 200px on desktop)
    const radius = 15;
    if (distance < radius) {
      // Calculate force (1 - pct distance) * strength
      const force = (1 - distance / radius) * 40; // Max repulsion 40% (strong!)
      // Direction: invert delta
      return (dx / distance) * -force; // Move AWAY
    }
    return 0;
  });

  const repelY = useTransform(mouseY, (my: number) => {
    if (isMobile) return 0;
    const dx = mouseX.get() - data.x;
    const dy = my - data.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const radius = 15;
    if (distance < radius) {
      const force = (1 - distance / radius) * 40;
      return (dy / distance) * -force;
    }
    return 0;
  });

  // Smooth out the repulsion movement
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(repelX, springConfig);
  const smoothY = useSpring(repelY, springConfig);

  return (
    <motion.div
      className="absolute rounded-full bg-glow/30"
      style={{
        left: `${data.x}%`,
        top: `${data.y}%`,
        width: data.size,
        height: data.size,
        x: smoothX,
        y: smoothY,
      }}
    // Ambient Float Animation (Combined with Repulsion via nested transform? No, framer motion handles x/y separate from layout)
    // Actually 'animate={{ x: ... }}' overrides style={{ x }}. 
    // We should use layout or separate wrapper.
    // BUT: 'animate' values will conflict with 'style' values if they target the same prop 'y'.
    // PROPOSAL: Wrap the loop animation in a child div, apply repulsion to this parent div.
    >
      <motion.div
        className="w-full h-full rounded-full bg-glow/30" // Move bg here
        animate={{
          y: [0, -30, 0], // CSS pixels for float
          x: [0, Math.random() * 20 - 10, 0],
          opacity: [0.2, 0.6, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: data.duration,
          delay: data.delay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
}