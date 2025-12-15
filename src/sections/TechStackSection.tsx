import { motion } from 'framer-motion';
import { useRef } from 'react';
import GlitchText from '@/components/GlitchText';

const techStack = {
  frontend: {
    label: 'Frontend',
    items: ['React', 'Next.js', 'Framer Motion', 'GSAP'],
  },
  graphics: {
    label: '3D/Graphics',
    items: ['Three.js', 'R3F', 'GLSL Shaders'],
  },
  backend: {
    label: 'Backend',
    items: ['Node.js', 'Python', 'REST APIs'],
  },
  cloud: {
    label: 'Cloud',
    items: ['AWS', 'GCP', 'Vercel'],
  },
  database: {
    label: 'Databases',
    items: ['MongoDB', 'PostgreSQL', 'Redis'],
  },
};

interface TechItemProps {
  name: string;
  index: number;
  categoryIndex: number;
}

function TechItem({ name, index, categoryIndex }: TechItemProps) {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: categoryIndex * 0.1 + index * 0.05, duration: 0.4 }}
      whileHover={{ scale: 1.05, rotateY: 10 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="relative px-4 py-3 rounded-lg bg-card border border-border group-hover:border-primary/50 group-hover:box-glow transition-all duration-300">
        <span className="font-inter text-sm text-foreground group-hover:text-primary transition-colors">
          {name}
        </span>
        
        {/* Holographic shine effect */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: 'linear-gradient(135deg, transparent 30%, hsl(var(--glow) / 0.1) 50%, transparent 70%)',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '200% 200%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
    </motion.div>
  );
}

interface TechCategoryProps {
  category: { label: string; items: string[] };
  index: number;
}

function TechCategory({ category, index }: TechCategoryProps) {
  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
    >
      <h3 className="font-cinzel text-lg text-primary neon-glow-subtle">
        {category.label}
      </h3>
      <div className="flex flex-wrap gap-3">
        {category.items.map((item, i) => (
          <TechItem key={item} name={item} index={i} categoryIndex={index} />
        ))}
      </div>
    </motion.div>
  );
}

export default function TechStackSection() {
  const sectionRef = useRef(null);

  return (
    <section id="tech-stack" ref={sectionRef} className="py-24 lg:py-32 relative bg-secondary/30 overflow-hidden">
      {/* Neon Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
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
            Tools That Power Both Dimensions
          </GlitchText>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The technologies we use to bring cinematic ideas to life.
          </p>
        </motion.div>
        
        {/* Tech Categories */}
        <div className="max-w-4xl mx-auto space-y-8">
          {Object.values(techStack).map((category, i) => (
            <TechCategory key={category.label} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}