import { Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import CastororoLogo from '@/components/CastororoLogo';
import ThemeToggle from '@/components/ThemeToggle';
import FloatingParticles from '@/components/FloatingParticles';
import { Button } from '@/components/ui/button';
import { ArrowDown, Sparkles } from 'lucide-react';


export default function HeroSection() {

  const { theme } = useTheme();

  const scrollToWork = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images with Crossfade */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          {theme === 'light' ? (
            <motion.div
              key="hero-normal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
              style={{ backgroundImage: 'url("/images/hero_tech_v2_normal.png")' }}
            >
              {/* Overlay to ensure text readability */}
              <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px]" />
            </motion.div>
          ) : (
            <motion.div
              key="hero-upside-down"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
              style={{ backgroundImage: 'url("/images/hero_tech_v2_upside_down.png")' }}
            >
              {/* Overlay for Dark Mode */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Particles */}
      <FloatingParticles count={40} />

      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <CastororoLogo size="xl" animated />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-cinzel text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-6 tracking-wide"
        >
          Where Creativity Meets the Upside Down.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="font-inter text-base md:text-lg text-muted-foreground/80 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          We are Jaya & Josh — a duo building cinematic digital experiences,
          immersive web interfaces, and future-driven IT solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={scrollToWork}
            size="lg"
            className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-cinzel tracking-wider"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Explore Our Work
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-glow/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          </Button>

          <Button
            onClick={scrollToContact}
            variant="outline"
            size="lg"
            className="group border-2 border-primary/50 hover:border-primary hover:bg-primary/10 px-8 py-6 text-lg font-cinzel tracking-wider portal-pulse"
          >
            Open the Gate
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-muted-foreground/50 cursor-pointer"
          onClick={scrollToWork}
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}