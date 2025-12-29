import { 
  Eye, 
  Layers, 
  Brain, 
  LayoutDashboard, 
  ShieldCheck, 
  FileOutput,
  Sparkles
} from 'lucide-react';

const features = [
  {
    icon: Eye,
    title: 'Noise-Resistant OCR',
    description: 'Handles low-quality scans, skewed images, stamps, handwritten notes, and complex backgrounds with industry-leading accuracy.',
  },
  {
    icon: Layers,
    title: 'Multi-Template Classification',
    description: 'Automatically identifies document types: attestations, conventions, relevés, certificates, and more without manual configuration.',
  },
  {
    icon: Brain,
    title: 'Smart NER Extraction',
    description: 'Extracts key entities like Names, CIN, Dates, Establishments, and custom fields using transformer-based models.',
  },
  {
    icon: LayoutDashboard,
    title: 'Layout-Aware Intelligence',
    description: 'LayoutLMv2 understands spatial relationships, preserving table structures and document hierarchy.',
  },
  {
    icon: ShieldCheck,
    title: 'Regulatory Validation',
    description: 'Built-in rule engine validates extracted data against business logic and regulatory requirements.',
  },
  {
    icon: FileOutput,
    title: 'Rich JSON Export',
    description: 'Structured output with confidence scores, bounding boxes, and metadata ready for any downstream system.',
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 relative">
      {/* Background gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, hsla(199, 89%, 48%, 0.08) 0%, transparent 60%)',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-primary font-mono text-sm tracking-wider">CAPABILITIES</span>
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Powerful <span className="gradient-text">Features</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Enterprise-grade document intelligence built for scale and accuracy
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="feature-card group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Corner decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                <div className="absolute top-0 right-0 w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent" />
                <div className="absolute top-0 right-0 w-12 h-[1px] bg-gradient-to-l from-primary/50 to-transparent" />
              </div>

              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center group-hover:neon-border transition-all duration-300">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Bottom line decoration */}
              <div className="absolute bottom-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
