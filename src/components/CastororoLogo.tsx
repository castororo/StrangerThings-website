import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CastororoLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

export default function CastororoLogo({ 
  className = '', 
  size = 'lg',
  animated = true 
}: CastororoLogoProps) {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl md:text-7xl lg:text-8xl',
    xl: 'text-7xl md:text-8xl lg:text-9xl',
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  const glowVariants = {
    initial: { textShadow: '0 0 10px hsl(var(--glow) / 0.3)' },
    animate: {
      textShadow: [
        '0 0 10px hsl(var(--glow) / 0.3)',
        '0 0 20px hsl(var(--glow) / 0.5)',
        '0 0 30px hsl(var(--glow) / 0.7)',
        '0 0 20px hsl(var(--glow) / 0.5)',
        '0 0 10px hsl(var(--glow) / 0.3)',
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const letters = 'CASTORORO'.split('');
  const riftIndex = 5; // The second O

  return (
    <motion.div
      className={cn(
        'font-cinzel font-bold tracking-wider relative',
        sizeClasses[size],
        className
      )}
      initial="initial"
      animate="animate"
      variants={glowVariants}
    >
      <div className="relative inline-flex items-center">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            custom={i}
            initial={animated ? "hidden" : "visible"}
            animate="visible"
            variants={letterVariants}
            className={cn(
              'relative inline-block text-foreground',
              i === riftIndex && 'relative'
            )}
            style={{
              textShadow: 'inherit',
            }}
          >
            {letter}
            {/* Rift effect in the O */}
            {i === riftIndex && (
              <motion.span
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <svg
                  viewBox="0 0 100 100"
                  className="absolute w-full h-full"
                  style={{ filter: 'drop-shadow(0 0 5px hsl(var(--glow)))' }}
                >
                  <line
                    x1="50"
                    y1="15"
                    x2="50"
                    y2="85"
                    stroke="hsl(var(--glow))"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.span>
            )}
          </motion.span>
        ))}
      </div>
      
      {/* Reflection effect */}
      <div 
        className="absolute top-full left-0 w-full opacity-20 pointer-events-none select-none"
        style={{
          transform: 'scaleY(-0.5) translateY(-20%)',
          maskImage: 'linear-gradient(to bottom, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
        }}
      >
        <span className="font-cinzel font-bold tracking-wider">
          CASTORORO
        </span>
      </div>
    </motion.div>
  );
}