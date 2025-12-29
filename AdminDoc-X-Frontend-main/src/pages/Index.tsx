import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { PipelineSection } from '@/components/PipelineSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { DemoSection } from '@/components/DemoSection';
import { UseCasesSection } from '@/components/UseCasesSection';
import { TechStackSection } from '@/components/TechStackSection';
import { BeforeAfterSection } from '@/components/BeforeAfterSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      <main>
        <HeroSection />
        
        <section id="pipeline">
          <PipelineSection />
        </section>
        
        <section id="features">
          <FeaturesSection />
        </section>
        
        <section id="demo">
          <DemoSection />
        </section>
        
        <section id="usecases">
          <UseCasesSection />
        </section>
        
        <section id="tech">
          <TechStackSection />
        </section>
        
        <BeforeAfterSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
