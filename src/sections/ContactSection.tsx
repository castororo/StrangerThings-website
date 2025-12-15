import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import GlitchText from '@/components/GlitchText';
import FloatingParticles from '@/components/FloatingParticles';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Send } from 'lucide-react';

export default function ContactSection() {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:hello@castororo.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden">
      {/* Portal Background Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
          <motion.div
            className="w-full h-full rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(var(--glow) / 0.3) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>
      
      <FloatingParticles count={20} />
      
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
            Ready to Cross Into Something Extraordinary?
          </GlitchText>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Reach out to Castororo. Tell us what you want to build — and we'll open the portal.
          </p>
        </motion.div>
        
        {/* Contact Form */}
        <motion.div
          className="max-w-xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="font-inter text-sm text-foreground">
                Name
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Your name"
                required
                className="bg-card border-border focus:border-primary focus:ring-primary/20 focus:shadow-[0_0_20px_hsl(var(--glow)/0.3)] transition-shadow"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="font-inter text-sm text-foreground">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your@email.com"
                required
                className="bg-card border-border focus:border-primary focus:ring-primary/20 focus:shadow-[0_0_20px_hsl(var(--glow)/0.3)] transition-shadow"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="font-inter text-sm text-foreground">
                Message
              </label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Tell us about your project..."
                rows={5}
                required
                className="bg-card border-border focus:border-primary focus:ring-primary/20 focus:shadow-[0_0_20px_hsl(var(--glow)/0.3)] transition-shadow resize-none"
              />
            </div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                size="lg"
                className="w-full group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground font-cinzel tracking-wider text-lg py-6 portal-pulse"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Open the Gate
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-glow/30 via-transparent to-glow/30"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </Button>
            </motion.div>
          </form>
          
          {/* Alternative Contact */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-muted-foreground text-sm mb-2">Or reach us directly at</p>
            <a
              href="mailto:hello@castororo.com"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-inter"
            >
              <Mail className="w-4 h-4" />
              hello@castororo.com
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}