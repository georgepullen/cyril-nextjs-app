"use client"
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Feather, Activity, Speech, Waypoints } from 'lucide-react';
import TimelineSection from './components/home/Timeline';
import Footer from './components/home/Footer';

const phrases = [
  { text: "ACTIVE", delay: 0 },
  { text: "PARAMETER", delay: 0.4 },
  { text: "EVOLUTION", delay: 0.8 }
];

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const initialOffset = window.scrollY;
    setScrolled(initialOffset > 100);

    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: any, id: any) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (!element) return;

    const navbar = document.querySelector('nav');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  };

  return (
    <main className="min-h-screen bg-[#0D0D15] text-white overflow-x-hidden font-mono">
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(190,149,255,0.01)_50%)] bg-[length:100%_4px] z-50 opacity-20" />

      <div className="fixed inset-0 pointer-events-none animate-[flicker_8s_infinite] bg-[radial-gradient(ellipse_at_center,rgba(190,149,255,0.08)_0%,rgba(255,124,0,0.05)_50%,transparent_100%)] z-40" />

      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled
        ? 'p-4 md:py-4 bg-[#0D0D15]/90 backdrop-blur-sm'
        : 'p-4 md:p-6 mix-blend-difference'
        }`}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="text-base md:text-xl tracking-[0.2em] md:tracking-[0.3em] font-light whitespace-nowrap text-[#FF7C00]"
          >
            CYRIL
          </motion.div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-12 tracking-[0.15em] md:tracking-[0.2em] text-xs md:text-sm">
            <a href="#overview" onClick={(e) => handleNavClick(e, 'overview')}
              className="hover:text-[#BE95FF] transition-colors duration-300 cursor-pointer">
              OVERVIEW
            </a>
            <a href="#timeline" onClick={(e) => handleNavClick(e, 'timeline')}
              className="hover:text-[#BE95FF] transition-colors duration-300 cursor-pointer">
              TIMELINE
            </a>
            <a href="#lab" onClick={(e) => handleNavClick(e, 'lab')}
              className="hover:text-[#BE95FF] transition-colors duration-300 cursor-pointer">
              LAB
            </a>
          </div>
        </div>
      </nav>

      <section className="h-screen flex flex-col items-center justify-center relative px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(190,149,255,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,124,0,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_0%,rgba(190,149,255,0.05)_100%)]" />

        <AnimatePresence>
          {isLoaded && (
            <div className="space-y-4 md:space-y-6 text-center relative w-full">
              {phrases.map((phrase) => (
                <motion.div
                  key={phrase.text}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: {
                      duration: 1.2,
                      delay: phrase.delay,
                      ease: [0.25, 0.1, 0.25, 1]
                    }
                  }}
                  className="relative"
                >
                  <span className="text-4xl sm:text-5xl md:text-7xl xl:text-9xl font-light tracking-[0.15em] md:tracking-[0.2em] relative break-words bg-gradient-to-r from-[#BE95FF] via-white to-[#FF7C00] text-transparent bg-clip-text">
                    {phrase.text}
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{
                        scaleX: [0, 1, 1, 0],
                        transition: {
                          duration: 1.5,
                          delay: phrase.delay,
                          times: [0, 0.1, 0.9, 1],
                          ease: "easeInOut"
                        }
                      }}
                      className="absolute inset-0 bg-[#BE95FF] mix-blend-difference origin-left"
                    />
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </section>

      <section id="overview" className="min-h-screen py-16 md:py-16 relative px-4 md:px-6 md:space-y-8 space-y-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(190,149,255,0.1)_0%,transparent_60%)]" />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto text-center space-y-8 md:space-y-12"
        >
          <h2 className="text-xl md:text-2xl tracking-[0.2em] md:tracking-[0.3em] font-light text-[#BE95FF]">
            OVERVIEW
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto tracking-wider leading-relaxed">
            Cyril is an evolving AI system that attempts to internalise information rather than retrieving it.
          </p>
        </motion.div>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {[
              {
                icon: <Waypoints className="w-6 h-6" />,
                title: "SMALL_CONCEPT_MODEL",
                description: "Cyril is an evolving derivative of Meta AI's Large Concept Model."
              },
              {
                icon: <Activity className="w-6 h-6" />,
                title: "ACTIVE_PARAMETERS",
                description: "Cyril has the ability to actively manipulate his own model parameters during your conversation."
              },
              {
                icon: <Feather className="w-6 h-6" />,
                title: "LIGHTWEIGHT",
                description: "Cyril's thought model is composed of less than one hundred thousand parameters."
              },
              {
                icon: <Speech className="w-6 h-6" />,
                title: "EVOLVING_PERSONALITY",
                description: "As Cyril gets to know you, he will start to take on some of your own personality traits."
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="space-y-4 p-6 rounded-lg bg-[#0D0D15]/50 backdrop-blur-sm border border-[#BE95FF]/10 hover:border-[#BE95FF]/20 transition-colors duration-300"
              >
                <div className="text-[#FF7C00]">{feature.icon}</div>
                <h3 className="text-lg tracking-[0.15em] md:tracking-[0.2em] font-light text-[#BE95FF]">
                  {feature.title}
                </h3>
                <p className="text-gray-300 tracking-wide">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TimelineSection />

      <section id="lab" className="flex items-center justify-center relative pt-16 md:pt-32 px-4 md:pb-48 pb-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,124,0,0.1)_0%,transparent_60%)]" />

        <div className="flex flex-col items-center space-y-4 md:space-y-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto text-center space-y-8 md:space-y-12"
          >
            <h2 className="text-xl md:text-2xl tracking-[0.2em] md:tracking-[0.3em] font-light text-[#BE95FF]">
              CYRIL_LAB
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto tracking-wider leading-relaxed">
              Are you ready to try for yourself?
            </p>
          </motion.div>

          <a
            href="/session"
            className="px-8 md:px-12 py-4 bg-transparent border border-[#FF7C00] hover:bg-[#FF7C00]/10 
        transition-colors duration-300 text-[#FF7C00] tracking-[0.15em] md:tracking-[0.2em] text-sm text-center inline-block z-10"
          >
            ENTER_LAB
          </a>
        </div>
      </section>

      <Footer scrolled={scrolled} />
    </main>
  );
}