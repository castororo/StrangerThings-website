import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  glitchOnHover?: boolean;
}

export default function GlitchText({ 
  children, 
  className = '', 
  as: Component = 'span',
  glitchOnHover = false,
}: GlitchTextProps) {
  const glitchVariants = {
    initial: {},
    glitch: {
      x: [0, -2, 2, -1, 1, 0],
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      className="relative inline-block"
      initial="initial"
      whileHover={glitchOnHover ? "glitch" : undefined}
      whileInView={!glitchOnHover ? "glitch" : undefined}
      viewport={{ once: true }}
      variants={glitchVariants}
    >
      <Component
        className={cn('glitch relative', className)}
        data-text={children}
      >
        {children}
      </Component>
    </motion.div>
  );
}