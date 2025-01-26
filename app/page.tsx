"use client"
import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import HeroSection from './components/HeroSection';
import EvolutionSection from './components/EvolutionSection';

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

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
    <main className="min-h-screen bg-[#0D0D15] text-white overflow-x-hidden font-mono">
      <ParticleBackground />
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(45deg,transparent_0%,rgba(179,92,255,0.05)_50%,rgba(255,173,74,0.05)_100%)] animate-[gradientShift_10s_ease-in-out_infinite] z-10" />

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