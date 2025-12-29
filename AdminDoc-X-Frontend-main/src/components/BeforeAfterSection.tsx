import { ArrowRight, X, Check, FileText, FileJson } from 'lucide-react';

export const BeforeAfterSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider mb-4 block">// TRANSFORMATION</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            From Chaos to <span className="gradient-text">Clarity</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            See how AdminDoc-X transforms messy documents into clean, structured data
          </p>
        </div>

        {/* Before/After comparison */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Before */}
            <div className="relative">
              <div className="glass rounded-2xl p-6 relative overflow-hidden opacity-70">
                {/* Label */}
                <div className="absolute top-4 left-4 flex items-center gap-2 text-destructive">
                  <X className="w-5 h-5" />
                  <span className="font-display font-bold">BEFORE</span>
                </div>

                {/* Simulated messy document */}
                <div className="mt-12 relative">
                  <div 
                    className="bg-foreground/5 rounded-xl p-6"
                    style={{
                      transform: 'rotate(-2deg)',
                      filter: 'blur(0.5px)',
                    }}
                  >
                    <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <div className="space-y-3 opacity-50">
                      <div className="h-2 bg-foreground/20 rounded w-full transform -skew-x-1" />
                      <div className="h-2 bg-foreground/15 rounded w-5/6 transform skew-x-1" />
                      <div className="h-2 bg-foreground/20 rounded w-4/5" />
                      <div className="h-2 bg-foreground/10 rounded w-full transform -skew-x-2" />
                      <div className="h-2 bg-foreground/15 rounded w-3/4" />
                    </div>
                    
                    {/* Noise overlay */}
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                    }} />
                  </div>
                </div>

                {/* Problems list */}
                <div className="mt-6 space-y-2">
                  {['Noisy scans', 'Skewed images', 'Unstructured data', 'Manual processing'].map((problem) => (
                    <div key={problem} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <X className="w-4 h-4 text-destructive" />
                      <span>{problem}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center animate-pulse-glow">
                <ArrowRight className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>

            {/* After */}
            <div className="relative">
              <div className="glass-strong rounded-2xl p-6 relative overflow-hidden neon-border">
                {/* Label */}
                <div className="absolute top-4 left-4 flex items-center gap-2 text-green-400">
                  <Check className="w-5 h-5" />
                  <span className="font-display font-bold">AFTER</span>
                </div>

                {/* Clean JSON output */}
                <div className="mt-12">
                  <div className="bg-background rounded-xl p-4 border border-primary/20">
                    <FileJson className="w-12 h-12 text-primary mx-auto mb-4" />
                    <pre className="text-xs font-mono text-foreground/80 overflow-hidden">
{`{
  "document_type": "attestation",
  "extracted_fields": {
    "full_name": "Mohamed Ben Ali",
    "cin": "AB123456",
    "date": "2024-03-15"
  },
  "confidence": 0.97
}`}
                    </pre>
                  </div>
                </div>

                {/* Benefits list */}
                <div className="mt-6 space-y-2">
                  {['Clean structured JSON', 'Confidence scores', 'API-ready format', 'Instant processing'].map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2 text-sm text-foreground">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Glow effect */}
                <div className="absolute -inset-1 bg-primary/10 blur-xl -z-10" />
              </div>
            </div>
          </div>

          {/* Mobile arrow */}
          <div className="flex lg:hidden justify-center my-4">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center rotate-90">
              <ArrowRight className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
