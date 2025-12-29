import { ScanLine, LayoutGrid, UserCheck, ShieldCheck, FileJson, ArrowRight } from 'lucide-react';

const pipelineSteps = [
  {
    icon: ScanLine,
    title: 'OCR',
    subtitle: 'Text Recognition',
    description: 'Advanced optical character recognition handles noisy scans, skewed images, and low-quality PDFs.',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: LayoutGrid,
    title: 'Layout Parsing',
    subtitle: 'Document Structure',
    description: 'LayoutLMv2 analyzes spatial relationships, understanding tables, headers, and document hierarchy.',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    icon: UserCheck,
    title: 'Entity Extraction',
    subtitle: 'NER Processing',
    description: 'Named Entity Recognition identifies key fields: Names, CIN, Dates, Establishments, and more.',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: ShieldCheck,
    title: 'Validation',
    subtitle: 'Rule Engine',
    description: 'Regulatory rules validate extracted data against business logic and format requirements.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: FileJson,
    title: 'JSON Export',
    subtitle: 'Structured Output',
    description: 'Clean, structured JSON with confidence scores ready for integration with any system.',
    color: 'from-pink-500 to-cyan-500',
  },
];

export const PipelineSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dots opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider mb-4 block">// PROCESSING PIPELINE</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            From Scan to <span className="gradient-text">Structured Data</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Watch your documents transform through our intelligent five-stage pipeline
          </p>
        </div>

        {/* Pipeline cards */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {pipelineSteps.map((step, index) => (
              <div 
                key={step.title}
                className="relative group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Card */}
                <div className="pipeline-card h-full">
                  {/* Step number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-background border border-primary/50 flex items-center justify-center">
                    <span className="text-primary font-display text-sm font-bold">{index + 1}</span>
                  </div>

                  {/* Scanning effect on hover */}
                  <div className="absolute inset-0 overflow-hidden rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="scan-line animate-scan" />
                  </div>

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} p-3 mb-4 group-hover:animate-pulse-glow transition-all`}>
                    <step.icon className="w-full h-full text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-bold text-foreground mb-1">{step.title}</h3>
                  <p className="text-primary text-sm font-mono mb-3">{step.subtitle}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>

                  {/* Bounding box decoration */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 border border-dashed border-primary/50 rounded animate-pulse" />
                  </div>
                </div>

                {/* Arrow connector */}
                {index < pipelineSteps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-primary/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
