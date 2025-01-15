import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section id="overview" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-[#BE95FF] opacity-[0.15] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-[#FF7C00] opacity-[0.15] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto text-center">

        <div className="mb-6">
          <span className="inline-block px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium rounded-full bg-gradient-to-r from-[#BE95FF]/10 to-[#FF7C00]/10 border border-[#BE95FF]/20">
            Contact george@cyril.guru for inquiries
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#BE95FF] via-white to-[#FF7C00] bg-clip-text text-transparent leading-tight">
          Personal
          <br />
          <span className="sm:ml-2">Evolving AI</span>
        </h1>

        <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-xl sm:max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
          Cyril seamlessly integrates with your cognitive workflow, enhancing your
          natural capabilities.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
          <button onClick={() => scrollToSection('gateway')} className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#BE95FF] to-[#FF7C00] rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group">
            Test Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button onClick={() => scrollToSection('ecosystem')} className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#BE95FF]/10 rounded-lg font-medium border border-[#BE95FF]/20 hover:bg-[#BE95FF]/20 transition-all">
            Explore Ecosystem
          </button>
        </div>

        <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 px-4">
          {[
            { label: "Embedding Space", value: "SONAR" },
            { label: "Evolving Parameters", value: "100K" },
            { label: "Planned Solutions", value: "3" }
          ].map((stat, index) => (
            <div key={index} className="p-3 sm:p-6 rounded-lg bg-gradient-to-r from-[#BE95FF]/5 to-[#FF7C00]/5 border border-[#BE95FF]/10">
              <div className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-[#BE95FF] to-[#FF7C00] bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-xs sm:text-base text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;