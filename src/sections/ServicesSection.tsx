import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import GlitchText from '@/components/GlitchText';
import { Globe, Palette, Sparkles, Cloud } from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Crafting fast, responsive, scalable sites with cinematic polish.',
    upsideDownText: 'Glitchy code sparks • Red glow • Digital portals',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Experiences shaped by emotion, motion, and modern aesthetics.',
    upsideDownText: 'Atmospheric visuals • Dark patterns • Neon accents',
  },
  {
    icon: Sparkles,
    title: 'Creative Tech Experiments',
    description: 'Portals, shaders, 3D scenes — interactive moments that feel alive.',
    upsideDownText: 'Dimensional rifts • Particle storms • Reality bends',
  },
  {
    icon: Cloud,
    title: 'Future IT Solutions',
    description: 'Cloud integrations, automation, data-driven systems for growth.',
    upsideDownText: 'Infinite scale • Shadow networks • Data streams',
  },
];

interface ServiceCardProps {
  service: typeof services[0];
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = service.icon;
  
  return (
    <motion.div
      className="relative h-80 perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full transition-transform duration-500 preserve-3d cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front - Normal World */}
        <div
          className={cn(
            'absolute inset-0 rounded-xl p-6',
            'bg-card border border-border',
            'flex flex-col items-center justify-center text-center',
            'backface-hidden'
          )}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <Icon className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-cinzel text-xl text-foreground mb-3">
            {service.title}
          </h3>
          <p className="text-muted-foreground font-inter leading-relaxed">
            {service.description}
          </p>
        </div>
        
        {/* Back - Upside Down */}
        <div
          className={cn(
            'absolute inset-0 rounded-xl p-6',
            'bg-gradient-to-br from-background via-primary/10 to-glow/5',
            'border-2 border-glow/50',
            'flex flex-col items-center justify-center text-center',
            'box-glow'
          )}
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="w-16 h-16 rounded-full bg-glow/20 flex items-center justify-center mb-6 animate-pulse-glow">
            <Icon className="w-8 h-8 text-glow neon-glow" />
          </div>
          <h3 className="font-cinzel text-xl text-glow neon-glow mb-3">
            {service.title}
          </h3>
          <p className="text-foreground/80 font-inter italic">
            {service.upsideDownText}
          </p>
          
          {/* Fog Effect */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-glow/10 to-transparent rounded-b-xl" />
          
          {/* Glitch Lines */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden"
            animate={{
              opacity: [0, 0.3, 0, 0.2, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            <div className="absolute top-1/4 left-0 right-0 h-px bg-glow/50" />
            <div className="absolute top-2/4 left-0 right-0 h-px bg-glow/30" />
            <div className="absolute top-3/4 left-0 right-0 h-px bg-glow/40" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef(null);

  return (
    <section id="services" ref={sectionRef} className="py-24 lg:py-32 relative bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlitchText
            as="h2"
            className="font-cinzel text-3xl md:text-4xl lg:text-5xl text-foreground mb-4"
          >
            Capabilities That Bend Dimensions
          </GlitchText>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From clean corporate websites to otherworldly interactions, 
            we design experiences that stand out.
          </p>
        </motion.div>
        
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}