import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, LineChart, Rocket } from 'lucide-react';

const TimelineSection = () => {
  const milestones = [
    {
      date: "MARCH 2025",
      title: "CONVERSATION",
      description: "Initial deployment of Cyril's conversational intelligence system, enabling direct human-AI parameter evolution",
      icon: <MessageSquare className="w-6 h-6" />
    },
    {
      date: "MAY 2025",
      title: "FINANCIAL_ANALYSIS",
      description: "Integration of financial modelling features, allowing Cyril to process and analyse market data",
      icon: <LineChart className="w-6 h-6" />
    },
    {
      date: "TBC",
      title: "LOCATION_AWARE",
      description: "Location-aware features will allow Cyril to assist with navigation and discovery",
      icon: <Rocket className="w-6 h-6" />
    }
  ];

  return (
    <section id="timeline" className="min-h-screen py-16 md:py-32 relative px-4 md:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(190,149,255,0.1)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,124,0,0.05)_0%,transparent_60%)]" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="space-y-16"
        >
          <div className="text-center space-y-6">
            <h2 className="text-xl md:text-2xl tracking-[0.2em] md:tracking-[0.3em] font-light text-[#BE95FF]">
              TIMELINE
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto tracking-wider leading-relaxed">
              Planned features and their expected arrival dates.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#BE95FF]/20 via-[#FF7C00]/20 to-transparent" />

            <div className="space-y-12 relative">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row gap-8 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="flex-1" />
                  <div className="relative flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-[#0D0D15] border border-[#BE95FF] relative z-10">
                      <div className="absolute inset-1 text-[#FF7C00]">
                        {milestone.icon}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="p-6 rounded-lg bg-[#0D0D15]/50 backdrop-blur-sm border border-[#BE95FF]/10 hover:border-[#BE95FF]/20 transition-colors duration-300 space-y-4">
                      <div className="text-[#FF7C00] tracking-[0.15em] text-sm">
                        {milestone.date}
                      </div>
                      <h3 className="text-lg tracking-[0.15em] md:tracking-[0.2em] font-light text-[#BE95FF]">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-300 tracking-wide text-sm">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TimelineSection;