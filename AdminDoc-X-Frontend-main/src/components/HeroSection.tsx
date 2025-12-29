import { FloatingDocuments } from './FloatingDocuments';
import { FileText, Github, ArrowRight } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <FloatingDocuments />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 animate-fade-in-up">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground">AI-Powered Document Intelligence</span>
        </div>

        {/* Main Title */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up">
          <span className="text-foreground">Admin</span>
          <span className="gradient-text">Doc-X</span>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl lg:text-3xl text-foreground/90 font-light mb-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          The AI That <span className="text-primary neon-text">Understands</span> Administrative Documents
        </p>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-slide-up font-mono" style={{ animationDelay: '0.2s' }}>
          OCR • NER • Layout Intelligence • Structured Data Extraction
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <button className="btn-hero flex items-center gap-3 text-primary-foreground">
            <FileText className="w-5 h-5" />
            Try Demo
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="btn-outline-hero flex items-center gap-3">
            <Github className="w-5 h-5" />
            Explore GitHub
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto">
          {[
            { value: '3000+', label: 'Pages Processed' },
            { value: '99.2%', label: 'Accuracy Rate' },
            { value: '15+', label: 'Document Types' },
            { value: '<2s', label: 'Per Document' },
          ].map((stat, index) => (
            <div 
              key={stat.label}
              className="glass rounded-xl p-4 animate-fade-in-up"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <div className="text-3xl md:text-4xl font-display font-bold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};
