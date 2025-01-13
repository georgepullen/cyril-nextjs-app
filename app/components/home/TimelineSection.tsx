import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Rocket, TestTube, MapPin } from 'lucide-react';

const TimelineSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activePhase, setActivePhase] = useState(0);

  const timeline = [
    {
      year: "2025 Q1",
      phase: "Phase One",
      icon: MapPin,
      title: "Architecture Deployment",
      description: "Initial deployment of model with conversational abilities. Service will have limited uptime.",
      achievement: "Milestone: 50 unique users",
      tech: ["LCM Framework", "Evolving Parameters"]
    },
    {
      year: "2025 Q3",
      phase: "Phase Two",
      icon: TestTube,
      title: "Market Analysis",
      description: "Integration of real-time market analysis features. Increased uptime.",
      achievement: "Milestone: 50% uptime",
      tech: ["Real-time Processing"]
    },
    {
      year: "2026 Q2",
      phase: "Phase Three",
      icon: Rocket,
      title: "Automated Trading",
      description: "Launch of automated trading capabilities with preemptive risk management.",
      tech: ["Automated Trading", "Risk Management"]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const progress = scrollYProgress.get();
      const index = Math.min(
        Math.floor(progress * timeline.length),
        timeline.length - 1
      );
      setActivePhase(index);
    };

    scrollYProgress.onChange(handleScroll);
    return () => scrollYProgress.clearListeners();
  }, [scrollYProgress, timeline.length]);

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="relative min-h-screen py-20 px-4 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(190,149,255,0.03)_1px,transparent_1px),linear-gradient(0deg,rgba(190,149,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-light mb-16 tracking-wider text-center"
        >
          Development <span className="bg-gradient-to-r from-[#BE95FF] to-[#FF7C00] text-transparent bg-clip-text">Timeline</span>
        </motion.h2>

        <div className="relative">
          <div className="absolute left-[15px] md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#BE95FF]/20 via-[#FF7C00]/20 to-[#BE95FF]/20" />
          
          <motion.div
            className="absolute left-[15px] md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#BE95FF] via-[#FF7C00] to-[#BE95FF] origin-top"
            style={{ scaleY: springProgress }}
          />

          {timeline.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="relative mb-16">
                <div className={`flex items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8`}>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={`absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full 
                      ${activePhase >= index ? 'bg-gradient-to-r from-[#BE95FF] to-[#FF7C00]' : 'bg-[#1A1A2E] border border-[#BE95FF]/30'}
                      flex items-center justify-center z-10`}
                  >
                    <Icon className={`w-4 h-4 ${activePhase >= index ? 'text-white' : 'text-[#BE95FF]/50'}`} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}
                  >
                    <div className={`p-6 rounded-lg backdrop-blur-sm border 
                      ${activePhase >= index ? 'border-[#BE95FF] bg-[#BE95FF]/5' : 'border-[#BE95FF]/10 bg-[#0D0D15]/50'}`}
                    >
                      <div className="text-sm text-[#FF7C00] font-mono mb-1">{item.year}</div>
                      <div className="text-xs tracking-[0.2em] text-gray-400 mb-2">{item.phase}</div>
                      <h3 className="text-xl font-light text-white mb-3">{item.title}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed mb-4">{item.description}</p>
                      <div className="text-sm text-[#BE95FF] mb-4">{item.achievement}</div>
                      <div className="flex flex-wrap gap-2">
                        {item.tech.map((tech, i) => (
                          <span key={i} className="px-2 py-1 text-xs rounded-full border border-[#BE95FF]/20 bg-[#BE95FF]/5 text-[#BE95FF]">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;