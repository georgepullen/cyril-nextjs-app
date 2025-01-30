'use client';

import { useTheme } from '../contexts/ThemeContext';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <main className={`min-h-screen relative ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          style={{ background: 'var(--background)' }}>
      {/* Primary glow effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'var(--hero-glow-1)' }} />
        <div className="absolute inset-0" style={{ background: 'var(--hero-glow-2)' }} />
      </div>
      
      {/* Accent pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-70">
        <div className="absolute inset-0" 
             style={{ 
               background: 'var(--hero-accent)',
               filter: 'blur(80px)',
               transform: 'scale(1.2)',
             }} />
      </div>

      {/* Gradient overlay for content readability */}
      <div className="fixed inset-0 pointer-events-none" 
           style={{ background: 'var(--gradient-overlay)' }} />

      {/* Content */}
      <div className="relative z-20">
        {children}
      </div>
    </main>
  );
} 