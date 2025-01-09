import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';

interface FooterProps {
  scrolled: boolean;
}

const Footer: React.FC<FooterProps> = ({ scrolled }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 py-4 px-4">
      <div className={`absolute inset-0 ${scrolled ? 'bg-[#0D0D15]/80 backdrop-blur-sm' : 'bg-transparent'}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D15] to-transparent" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto flex flex-row justify-between items-center relative z-10"
      >
        <div className="flex flex-col items-start">
          <div className="text-xs tracking-[0.2em] text-gray-400">
            CREATED_BY
          </div>
          <div className="text-sm tracking-[0.3em] text-[#BE95FF] font-light">
            GEORGE PULLEN
          </div>
        </div>
        
        <div className="flex space-x-6">
          <a 
            href="https://github.com/georgepullen" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#FF7C00] transition-colors duration-300"
          >
            <Github className="w-5 h-5" />
          </a>
          <a 
            href="https://uk.linkedin.com/in/george-pullen-73693027b" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#FF7C00] transition-colors duration-300"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;