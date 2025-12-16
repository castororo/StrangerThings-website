import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import GlitchText from '@/components/GlitchText';
import DimensionalTear from '@/components/DimensionalTear';
import { Code2, Palette, Cpu, Sparkles } from 'lucide-react';

const skills = [
  { icon: Code2, label: 'Front-End & Full-Stack Development' },
  { icon: Palette, label: 'Creative UI/UX Engineering' },
  { icon: Sparkles, label: '3D Interactions & Web Animations' },
  { icon: Cpu, label: 'Cloud, Automation & IT Systems' },
];

interface ProfileCardProps {
  name: string;
  role: string;
  index: number;
}

function ProfileCard({ name, role, index }: ProfileCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-card border border-border">
        {/* Normal World Image - Placeholder */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-secondary to-muted flex items-center justify-center transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="w-24 h-24 rounded-full bg-muted-foreground/20 flex items-center justify-center">
            <span className="font-cinzel text-4xl text-muted-foreground/50">
              {name[0]}
            </span>
          </div>
        </div>

        {/* Upside Down Image - Revealed on Hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-glow/10 flex items-center justify-center transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="w-24 h-24 rounded-full bg-glow/20 flex items-center justify-center border-2 border-glow/50 animate-pulse-glow">
            <span className="font-cinzel text-4xl text-glow neon-glow">
              {name[0]}
            </span>
          </div>

          {/* Fog Effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-glow/20 to-transparent" />
          </motion.div>

          <motion.svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.6 : 0 }}
            transition={{ duration: 0.5 }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 50 0 L 48 20 L 52 25 L 47 45 L 55 50 L 45 55 L 53 75 L 48 80 L 50 100"
              stroke="hsl(var(--glow))"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              fill="none"
              className="animate-flicker"
              style={{ filter: 'drop-shadow(0 0 10px hsl(var(--glow)))' }}
            />
          </motion.svg>
        </div>
      </div>

      <div className="mt-4 text-center">
        <h3 className="font-cinzel text-xl text-foreground">{name}</h3>
        <p className="text-muted-foreground font-inter">{role}</p>
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={sectionRef} className="py-0 relative">
      <DimensionalTear className="">
        <div className="container mx-auto px-4 py-24 lg:py-32">
          {/* Section Title */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <GlitchText
              as="h2"
              className="font-cinzel text-3xl md:text-4xl lg:text-5xl text-foreground mb-4"
            >
              Who We Are on Both Sides of the Gate
            </GlitchText>
          </motion.div>

          {/* Content */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Profile Cards */}
            <div className="grid grid-cols-2 gap-6">
              <ProfileCard name="Jaya" role="Creative Developer" index={0} />
              <ProfileCard name="Josh" role="Tech Engineer" index={1} />
            </div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                We're Jaya & Josh, founders of Castororo — a creative tech duo crafting
                memorable digital experiences inspired by storytelling, design, and
                futuristic engineering.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                On the surface, we build clean, modern, high-performance websites.
                But beneath the surface — in our "Upside Down" world — we experiment
                with atmospheric visuals, advanced animations, and boundary-pushing interfaces.
              </p>

              {/* Skills */}
              <div className="space-y-4">
                {skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-4 group"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors group-hover:box-glow">
                      <skill.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-inter text-foreground group-hover:text-primary transition-colors">
                      ✦ {skill.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </DimensionalTear>
    </section>
  );
}