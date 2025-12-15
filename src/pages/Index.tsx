import HeroSection from '@/sections/HeroSection';
import AboutSection from '@/sections/AboutSection';
import ServicesSection from '@/sections/ServicesSection';
import PortfolioSection from '@/sections/PortfolioSection';
import TechStackSection from '@/sections/TechStackSection';
import ContactSection from '@/sections/ContactSection';
import CRTOverlay from '@/components/CRTOverlay';

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <CRTOverlay />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <TechStackSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="font-cinzel text-muted-foreground">
            © 2024 Castororo. Crafted from both dimensions.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;