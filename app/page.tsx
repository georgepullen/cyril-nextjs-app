"use client"
import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import HeroSection from './components/HeroSection';
import EvolutionSection from './components/EvolutionSection';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import { useTheme } from './contexts/ThemeContext';

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className={`min-h-screen overflow-x-hidden font-mono
                   ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          style={{ background: 'var(--background)' }}>
      <ParticleBackground />
      <div className="fixed inset-0 pointer-events-none" 
           style={{ background: 'var(--gradient-overlay)' }} />

      <div className="relative z-20">
        <Navbar scrolled={scrolled} />
        
        <HeroSection />
        <EvolutionSection />
        
        <Footer />
      </div>

      <style jsx global>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        ::-webkit-scrollbar {
          width: 8px;
          background: #0D0D15;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #b35cff, #ffad4a);
          border-radius: 4px;
        }

        ::selection {
          background: #b35cff;
          color: #0D0D15;
        }
      `}</style>
    </main>
  );
}