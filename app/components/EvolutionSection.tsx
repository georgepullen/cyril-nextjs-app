'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { stages } from './stages';
import { useTheme } from '../contexts/ThemeContext';

const EvolutionSection: React.FC = () => {
  const { theme } = useTheme();

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Section Title */}
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#b35cff] to-[#ffad4a] bg-clip-text text-transparent"
        >
          Evolution Timeline
        </motion.h2>
      </div>

      {/* Desktop Timeline */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5"
             style={{ background: 'var(--gradient-overlay)' }} />
        
        <div className="grid grid-cols-3 gap-8">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative pt-16 h-full group"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stage.gradient} flex items-center justify-center
                               shadow-[0_0_20px_rgba(179,92,255,0.3)] transition-all duration-300
                               group-hover:shadow-[0_0_30px_rgba(179,92,255,0.5)]`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="relative">
                  {/* Glow Effect Container */}
                  <div className="absolute -inset-[1px] rounded-lg blur-sm transition-all duration-300"
                       style={{ 
                         background: 'var(--gradient-overlay)',
                         opacity: theme === 'dark' ? 0.2 : 0.1
                       }} />
                  
                  {/* Card Content */}
                  <div className={`relative rounded-lg p-6 h-full flex flex-col
                                transition-transform duration-300 border
                                group-hover:translate-y-[-2px]`}
                       style={{ 
                         background: 'var(--card-background)',
                         borderColor: 'var(--card-border)'
                       }}>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-[#b35cff] to-[#ffad4a] bg-clip-text text-transparent mb-2">
                      {stage.title}
                    </h3>
                    <div className="text-sm text-[#b35cff] mb-3">{stage.date}</div>
                    <p className="text-sm flex-grow" style={{ color: 'var(--text-secondary)' }}>
                      {stage.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile Timeline */}
      <div className="md:hidden max-w-md mx-auto px-4 space-y-8">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          return (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative pl-8 border-l-2 group"
              style={{ borderColor: 'var(--card-border)' }}
            >
              <div className="absolute left-0 top-0 -translate-x-1/2">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${stage.gradient} flex items-center justify-center
                             shadow-[0_0_15px_rgba(179,92,255,0.3)] transition-all duration-300
                             group-hover:shadow-[0_0_25px_rgba(179,92,255,0.5)]`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="relative">
                {/* Glow Effect Container */}
                <div className="absolute -inset-[1px] rounded-lg blur-sm transition-all duration-300"
                     style={{ 
                       background: 'var(--gradient-overlay)',
                       opacity: theme === 'dark' ? 0.2 : 0.1
                     }} />
                
                {/* Card Content */}
                <div className={`relative rounded-lg p-6 border transition-transform duration-300
                              group-hover:translate-y-[-2px]`}
                     style={{ 
                       background: 'var(--card-background)',
                       borderColor: 'var(--card-border)'
                     }}>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-[#b35cff] to-[#ffad4a] bg-clip-text text-transparent mb-2">
                    {stage.title}
                  </h3>
                  <div className="text-sm text-[#b35cff] mb-3">{stage.date}</div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {stage.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default EvolutionSection; 