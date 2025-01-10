import React from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from './MagneticButton';

interface LabSectionProps {
    setCursorVariant: any
}

export const LabSection: React.FC<LabSectionProps> = ({ setCursorVariant }) => {
    return (
      <section id="lab" className="min-h-screen flex items-center justify-center relative pt-32 pb-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,124,0,0.1)_0%,transparent_60%)]" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center space-y-8 md:space-y-12 px-4"
        >
          <div className="text-center max-w-2xl">
            <h2 className="text-xl md:text-2xl tracking-[0.2em] md:tracking-[0.3em] font-light text-[#BE95FF] mb-6">
              CYRIL_LAB
            </h2>
            <p className="text-gray-300 tracking-wider leading-relaxed">
              Are you ready to try for yourself?
            </p>
          </div>

          <MagneticButton className="">
            <a
              href="/session"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              className="relative px-8 md:px-12 py-4 bg-transparent overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#BE95FF]/20 to-[#FF7C00]/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <span className="relative z-10 text-[#FF7C00] tracking-[0.15em] md:tracking-[0.2em] text-sm">
                ENTER_LAB
              </span>
              <span className="absolute inset-0 border border-[#FF7C00] group-hover:border-[#BE95FF] transition-colors duration-300" />
            </a>
          </MagneticButton>
        </motion.div>
      </section>
  );
};