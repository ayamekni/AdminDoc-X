import { GraduationCap, Building2, Landmark, CreditCard, FileStack } from 'lucide-react';

const useCases = [
  {
    icon: GraduationCap,
    title: 'Universities',
    description: 'Process thousands of student attestations, transcripts, and enrollment documents automatically.',
    documents: ['Attestations', 'Transcripts', 'Enrollment Forms'],
  },
  {
    icon: Building2,
    title: 'HR Departments',
    description: 'Streamline onboarding by extracting data from IDs, certificates, and employment documents.',
    documents: ['ID Cards', 'Certificates', 'Contracts'],
  },
  {
    icon: Landmark,
    title: 'Government',
    description: 'Digitize administrative archives and process citizen requests at scale.',
    documents: ['Civil Status', 'Permits', 'Applications'],
  },
  {
    icon: CreditCard,
    title: 'Banking & Insurance',
    description: 'Accelerate KYC/KYB processes with automated document verification and data extraction.',
    documents: ['KYC Documents', 'Claims', 'Policies'],
  },
  {
    icon: FileStack,
    title: 'Any Paperwork',
    description: "From invoices to medical records—if it's a document, AdminDoc-X can understand it.",
    documents: ['Invoices', 'Reports', 'Forms'],
  },
];

export const UseCasesSection = () => {
  return (
    <section className="py-24 relative">
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 70% 50%, hsla(187, 100%, 50%, 0.05) 0%, transparent 50%)',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider mb-4 block">// USE CASES</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Built For <span className="gradient-text">Every Industry</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From education to finance, AdminDoc-X adapts to your document processing needs
          </p>
        </div>

        {/* Use cases grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {useCases.map((useCase, index) => (
            <div 
              key={useCase.title}
              className="doc-card group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Paper fold effect */}
              <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
                <div 
                  className="absolute top-0 right-0 w-12 h-12 bg-background transform rotate-45 translate-x-6 -translate-y-6"
                  style={{ boxShadow: '-2px 2px 5px rgba(0,0,0,0.2)' }}
                />
              </div>

              <div className="p-6">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <useCase.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {useCase.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {useCase.description}
                </p>

                {/* Document types */}
                <div className="flex flex-wrap gap-2">
                  {useCase.documents.map((doc) => (
                    <span 
                      key={doc}
                      className="text-xs font-mono px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {doc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom decoration - paper lines */}
              <div className="px-6 pb-4">
                <div className="space-y-1.5 opacity-20">
                  <div className="h-0.5 bg-foreground/30 rounded w-full" />
                  <div className="h-0.5 bg-foreground/30 rounded w-5/6" />
                  <div className="h-0.5 bg-foreground/30 rounded w-4/6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
