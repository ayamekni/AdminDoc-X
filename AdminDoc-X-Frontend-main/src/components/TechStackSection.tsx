const technologies = [
  { name: 'Python', icon: '🐍' },
  { name: 'PyTorch', icon: '🔥' },
  { name: 'HuggingFace', icon: '🤗' },
  { name: 'LayoutLMv2', icon: '📐' },
  { name: 'EasyOCR', icon: '👁️' },
  { name: 'FastAPI', icon: '⚡' },
  { name: 'Streamlit', icon: '🎈' },
  { name: 'Docker', icon: '🐳' },
];

export const TechStackSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Radial background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, hsla(199, 89%, 48%, 0.1) 0%, transparent 40%)',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider mb-4 block">// TECH STACK</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Powered By <span className="gradient-text">Modern AI</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Built on cutting-edge machine learning frameworks and production-ready tools
          </p>
        </div>

        {/* Tech circle */}
        <div className="relative max-w-3xl mx-auto">
          {/* Central element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full glass-strong flex items-center justify-center neon-border">
            <span className="font-display text-xl font-bold gradient-text">AI Core</span>
          </div>

          {/* Orbit ring */}
          <div className="relative w-80 h-80 md:w-96 md:h-96 mx-auto">
            <div className="absolute inset-0 rounded-full border border-primary/20" />
            <div className="absolute inset-4 rounded-full border border-primary/10" />
            <div className="absolute inset-8 rounded-full border border-primary/5" />

            {/* Tech items positioned in circle */}
            {technologies.map((tech, index) => {
              const angle = (index * 360) / technologies.length - 90;
              const radius = 45;
              const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
              const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

              return (
                <div
                  key={tech.name}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 tech-icon"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                  }}
                >
                  <div className="text-2xl">{tech.icon}</div>
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-mono text-muted-foreground whitespace-nowrap">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional tech info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-4xl mx-auto">
          {[
            { label: 'Transformer Models', value: 'LayoutLMv2' },
            { label: 'OCR Engine', value: 'EasyOCR + Tesseract' },
            { label: 'NER Framework', value: 'SpaCy + Custom' },
            { label: 'API Framework', value: 'FastAPI' },
          ].map((item) => (
            <div key={item.label} className="glass rounded-xl p-4 text-center">
              <div className="text-xs text-muted-foreground font-mono mb-1">{item.label}</div>
              <div className="text-sm text-primary font-semibold">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
