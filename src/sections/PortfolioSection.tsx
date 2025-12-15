import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import GlitchText from '@/components/GlitchText';
import { X, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const projects = [
  {
    id: 1,
    title: 'Dimensional Dashboard',
    category: 'Web Application',
    description: 'A data visualization platform with atmospheric dark theme and real-time updates.',
  },
  {
    id: 2,
    title: 'Portal Commerce',
    category: 'E-commerce',
    description: 'An immersive shopping experience with 3D product previews and smooth animations.',
  },
  {
    id: 3,
    title: 'Rift Analytics',
    category: 'SaaS Platform',
    description: 'Business intelligence tool with otherworldly visualizations and dark mode interface.',
  },
  {
    id: 4,
    title: 'Shadow Network',
    category: 'Web Application',
    description: 'A secure communication platform with encrypted messaging and atmospheric UI.',
  },
  {
    id: 5,
    title: 'Void Studio',
    category: 'Creative Tool',
    description: 'A creative design tool with particle effects and experimental interactions.',
  },
  {
    id: 6,
    title: 'Ember Labs',
    category: 'Landing Page',
    description: 'A cinematic landing page with scroll-driven animations and 3D elements.',
  },
];

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
  onClick: () => void;
}

function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="relative aspect-[4/3] cursor-pointer group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="absolute inset-0 rounded-xl overflow-hidden bg-card border border-border group-hover:border-primary/50 transition-colors">
        {/* Normal World State */}
        <div 
          className={cn(
            'absolute inset-0 transition-opacity duration-500',
            'bg-gradient-to-br from-muted via-secondary to-muted',
            isHovered ? 'opacity-0' : 'opacity-100'
          )}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-background/50 flex items-center justify-center">
                <span className="font-cinzel text-2xl text-muted-foreground">
                  {project.id}
                </span>
              </div>
              <h3 className="font-cinzel text-lg text-foreground">{project.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{project.category}</p>
            </div>
          </div>
        </div>
        
        {/* Upside Down State */}
        <div 
          className={cn(
            'absolute inset-0 transition-opacity duration-500',
            'bg-gradient-to-br from-background via-primary/10 to-glow/10',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
        >
          {/* Gate crack effect */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Crack SVG */}
            <svg
              className="absolute w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M 50 0 L 48 15 L 52 20 L 47 35 L 55 45 L 45 55 L 53 65 L 48 80 L 50 100"
                stroke="hsl(var(--glow))"
                strokeWidth="0.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={isHovered ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.5 }}
                style={{ filter: 'drop-shadow(0 0 10px hsl(var(--glow)))' }}
              />
            </svg>
            
            <div className="text-center p-6 relative z-10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-glow/20 flex items-center justify-center animate-pulse-glow border border-glow/50">
                <span className="font-cinzel text-2xl text-glow neon-glow">
                  {project.id}
                </span>
              </div>
              <h3 className="font-cinzel text-lg text-glow neon-glow">{project.title}</h3>
              <p className="text-sm text-foreground/70 mt-1">{project.category}</p>
            </div>
          </motion.div>
          
          {/* Fog effect */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-glow/20 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
}

interface ProjectModalProps {
  project: typeof projects[0] | null;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-background/90 backdrop-blur-md"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        
        {/* Modal */}
        <motion.div
          className="relative max-w-2xl w-full bg-card border border-border rounded-2xl overflow-hidden box-glow"
          initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
          transition={{ type: 'spring', damping: 20 }}
        >
          {/* Header Image Area */}
          <div className="aspect-video bg-gradient-to-br from-primary/20 via-background to-glow/10 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-xl bg-glow/20 flex items-center justify-center border-2 border-glow/50 animate-pulse-glow">
                <span className="font-cinzel text-4xl text-glow neon-glow">
                  {project.id}
                </span>
              </div>
            </div>
            
            {/* Fog */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-card to-transparent" />
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center hover:bg-background/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-8">
            <span className="text-sm text-primary font-inter mb-2 block">
              {project.category}
            </span>
            <h3 className="font-cinzel text-2xl text-foreground mb-4">
              {project.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {project.description}
            </p>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-inter">
                <ExternalLink className="w-4 h-4" />
                View Project
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function PortfolioSection() {
  const sectionRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="portfolio" ref={sectionRef} className="py-24 lg:py-32 relative">
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
            Work From This World… and the Other One
          </GlitchText>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hover to reveal the Upside Down version of each project.
          </p>
        </motion.div>
        
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>
      
      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}