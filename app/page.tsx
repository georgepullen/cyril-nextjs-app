"use client"
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import TimelineSection from './components/home/Timeline';
import Footer from './components/home/Footer';
import { LabSection } from './components/home/LabSection';
import { OverviewSection } from './components/home/OverviewSection';
import { HeroSection } from './components/home/HeroSection';
import { Navbar } from './components/home/Navbar';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cursorVariant, setCursorVariant] = useState("default");
  const [showCursor, setShowCursor] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const hasMouse = window.matchMedia("(hover: hover)").matches;
    setShowCursor(hasMouse);

    if (hasMouse) {
      const handleMouseMove = (e: MouseEvent) => {
        cursorX.set(e.clientX - 16);
        cursorY.set(e.clientY - 16);
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [cursorX, cursorY]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1000);

    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#0D0D15] text-white overflow-x-hidden font-mono">
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-[#0D0D15] flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl text-[#BE95FF] tracking-[0.3em]"
            >
              CYRIL
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showCursor && (
        <motion.div
          className="fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference"
          style={{
            x: cursorX,
            y: cursorY,
            backgroundColor: cursorVariant === "hover" ? "#BE95FF" : "#FF7C00"
          }}
          animate={{
            scale: cursorVariant === "hover" ? 1.5 : 1
          }}
          transition={{ duration: 0.2 }}
        />
      )}

      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(45deg,transparent_0%,rgba(190,149,255,0.05)_50%,rgba(255,124,0,0.05)_100%)] animate-[gradientShift_10s_ease-in-out_infinite] z-40" />

      <Navbar scrolled={scrolled} setCursorVariant={setCursorVariant} />

      <HeroSection isLoaded={isLoaded}/>

      <OverviewSection />

      <TimelineSection />

      <LabSection setCursorVariant={setCursorVariant}/>

      <Footer scrolled={scrolled} />

      <style jsx global>{`
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      .bg-gradient-animate {
        background-size: 400% 400%;
        animation: gradientShift 15s ease infinite;
      }

      ::-webkit-scrollbar {
        width: 8px;
        background: #0D0D15;
      }

      ::-webkit-scrollbar-thumb {
        background: linear-gradient(to bottom, #BE95FF, #FF7C00);
        border-radius: 4px;
      }

      ::selection {
        background: #BE95FF;
        color: #0D0D15;
      }
    `}</style>
    </main>
  );
}
