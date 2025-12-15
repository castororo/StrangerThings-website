import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { useSound } from '@/context/SoundContext';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const { playSound } = useSound();

  const handleToggle = () => {
    playSound('switch_dimension');
    toggleTheme();
  };

  return (
    <motion.button
      onClick={handleToggle}
      onMouseEnter={() => playSound('hover')}
      className={cn(
        'relative p-3 rounded-full',
        'bg-secondary/50 backdrop-blur-sm border border-border',
        'hover:bg-secondary transition-colors duration-300',
        'focus:outline-none focus:ring-2 focus:ring-primary/50',
        'box-glow',
        className
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <AnimatePresence mode="wait">
        {theme === 'dark' ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Moon className="w-5 h-5 text-primary" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Sun className="w-5 h-5 text-primary" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glow ring on hover */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{
          opacity: 1,
          boxShadow: '0 0 20px hsl(var(--glow) / 0.5)',
        }}
      />
    </motion.button>
  );
}