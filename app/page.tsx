"use client"
import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import HeroSection from './components/HeroSection';
import RoadmapSection from './components/Roadmap';
import Footer from './components/Footer';
import { useTheme } from './contexts/ThemeContext';

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      console.log('Scrolled! Current scrollY:', window.scrollY);
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative">
      {/* Background container - fixed position */}
      <div className={`fixed inset-0 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
           style={{ background: 'var(--background)' }}>
        {/* Primary glow effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ background: 'var(--hero-glow-1)' }} />
          <div className="absolute inset-0" style={{ background: 'var(--hero-glow-2)' }} />
        </div>
        
        {/* Accent pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-70">
          <div className="absolute inset-0" 
               style={{ 
                 background: 'var(--hero-accent)',
                 filter: 'blur(80px)',
                 transform: 'scale(1.2)',
               }} />
        </div>

        {/* Gradient overlay for content readability */}
        <div className="absolute inset-0 pointer-events-none" 
             style={{ background: 'var(--gradient-overlay)' }} />
      </div>

      {/* Content - scrollable */}
      <main className="relative min-h-screen z-20">
        <Navbar scrolled={scrolled} />
        <HeroSection />
        <RoadmapSection />
        <Footer />
      </main>
    </div>
  );
}