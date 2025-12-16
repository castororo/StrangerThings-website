import { motion } from 'framer-motion';
import GlitchText from '@/components/GlitchText';
import DimensionalTear from '@/components/DimensionalTear';

export default function AcademyPage() {
    return (
        <div className="min-h-screen pt-20 bg-background text-foreground">
            <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
                <DimensionalTear className="w-full h-full flex items-center justify-center">
                    <div className="text-center z-10 p-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <GlitchText as="h1" className="font-cinzel text-4xl md:text-6xl lg:text-7xl mb-6 text-primary">
                                Academy
                            </GlitchText>
                            <p className="font-inter text-xl text-muted-foreground max-w-2xl mx-auto">
                                Unlock the secrets of the Upside Down. Tutorials and workshops coming soon.
                            </p>
                        </motion.div>
                    </div>
                </DimensionalTear>
            </section>

            <div className="container mx-auto px-4 py-16">
                {/* Content would go here */}
            </div>
        </div>
    );
}
