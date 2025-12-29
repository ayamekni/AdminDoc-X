import { useEffect, useState } from 'react';

interface DocumentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  delay?: number;
}

const FloatingDocument = ({ className = '', style, children, delay = 0 }: DocumentProps) => {
  return (
    <div 
      className={`floating-doc ${className}`}
      style={{
        ...style,
        animationDelay: `${delay}s`,
      }}
    >
      {children}
      {/* Document lines simulation */}
      <div className="space-y-2 p-4">
        <div className="h-2 bg-glass-white/10 rounded w-3/4" />
        <div className="h-2 bg-glass-white/10 rounded w-full" />
        <div className="h-2 bg-glass-white/10 rounded w-5/6" />
        <div className="h-2 bg-glass-white/10 rounded w-2/3" />
        <div className="mt-4 h-2 bg-glass-white/10 rounded w-full" />
        <div className="h-2 bg-glass-white/10 rounded w-4/5" />
      </div>
      {/* Neon edge glow */}
      <div className="absolute inset-0 rounded-lg border border-primary/20 pointer-events-none" />
    </div>
  );
};

const ScanningLine = ({ parentHeight = 200 }: { parentHeight?: number }) => {
  return (
    <div 
      className="scan-line animate-scan"
      style={{ position: 'absolute', left: 0, right: 0 }}
    />
  );
};

const Stamp = ({ text, rotation, className }: { text: string; rotation: number; className?: string }) => {
  return (
    <div 
      className={`absolute border-2 border-primary/40 text-primary/50 px-4 py-2 rounded font-display text-xs tracking-wider ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {text}
    </div>
  );
};

export const FloatingDocuments = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      
      {/* Radial gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, hsla(199, 89%, 48%, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, hsla(187, 100%, 50%, 0.1) 0%, transparent 50%)',
        }}
      />

      {/* Floating documents with parallax */}
      <FloatingDocument
        className="w-48 h-64 animate-float"
        style={{
          top: '10%',
          left: '5%',
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px) rotate(-12deg)`,
        }}
        delay={0}
      >
        <ScanningLine />
      </FloatingDocument>

      <FloatingDocument
        className="w-56 h-72 animate-float-slow"
        style={{
          top: '20%',
          right: '10%',
          transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px) rotate(8deg)`,
        }}
        delay={1}
      >
        <ScanningLine />
      </FloatingDocument>

      <FloatingDocument
        className="w-40 h-56 animate-float"
        style={{
          bottom: '15%',
          left: '15%',
          transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px) rotate(-5deg)`,
        }}
        delay={2}
      >
        <ScanningLine />
      </FloatingDocument>

      <FloatingDocument
        className="w-52 h-68 animate-float-slow"
        style={{
          bottom: '25%',
          right: '5%',
          transform: `translate(${mousePosition.x * -0.6}px, ${mousePosition.y * -0.6}px) rotate(15deg)`,
        }}
        delay={0.5}
      />

      {/* Stamps */}
      <Stamp text="OFFICIAL" rotation={-15} className="top-[30%] left-[25%]" />
      <Stamp text="VALIDÉ" rotation={12} className="top-[60%] right-[20%]" />
      <Stamp text="ADMINISTRATIF" rotation={-8} className="bottom-[20%] left-[40%]" />

      {/* Particle effects */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
