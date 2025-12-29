import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

const teamMembers = [
  'Ikram Menyaoui',
  'Aya Mekni',
  'Tasnime Mtir',
  'Nour Saibi',
];

export const Footer = () => {
  return (
    <footer className="relative py-16 border-t border-primary/20">
      {/* Neon bottom border glow */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(187, 100%, 50%), transparent)',
          boxShadow: '0 0 20px hsla(187, 100%, 50%, 0.5)',
        }}
      />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-4">
              <span className="text-foreground">Admin</span>
              <span className="gradient-text">Doc-X</span>
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              AI-powered document intelligence system for extracting structured data from administrative documents.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-sm font-bold text-foreground mb-4 tracking-wider">RESOURCES</h4>
            <ul className="space-y-3">
              {[
                { label: 'Documentation', href: '#' },
                { label: 'API Reference', href: '#' },
                { label: 'GitHub Repository', href: '#' },
                { label: 'Research Paper', href: '#' },
              ].map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Team */}
          <div>
            <h4 className="font-display text-sm font-bold text-foreground mb-4 tracking-wider">CREATED BY</h4>
            <div className="space-y-2">
              {teamMembers.map((member) => (
                <div key={member} className="text-muted-foreground text-sm">
                  {member}
                </div>
              ))}
              <div className="text-primary text-xs font-mono mt-4">
                Data Science & AI Engineering
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-muted-foreground text-sm">
            © 2024 AdminDoc-X. All rights reserved.
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="w-10 h-10 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary hover:neon-border transition-all"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary hover:neon-border transition-all"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary hover:neon-border transition-all"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
