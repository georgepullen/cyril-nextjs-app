'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
    const { session } = useAuth();
    const { theme } = useTheme();

    return (
        <section className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                {/* Purple Gradient */}
                <div className={`absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[120px] 
                               transition-opacity duration-700 mix-blend-${theme === 'dark' ? 'normal' : 'multiply'}`}
                     style={{ 
                         background: theme === 'dark' 
                             ? 'var(--purple-primary)'
                             : 'radial-gradient(circle at center, #b35cff 0%, #9333ea 50%, #4f46e5 100%)',
                         opacity: theme === 'dark' ? '0.15' : '0.25'
                     }} />
                {/* Orange Gradient */}
                <div className={`absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] rounded-full blur-[130px] 
                               transition-opacity duration-700 mix-blend-${theme === 'dark' ? 'normal' : 'multiply'}`}
                     style={{ 
                         background: theme === 'dark'
                             ? 'var(--orange-primary)'
                             : 'radial-gradient(circle at center, #ffad4a 0%, #f97316 50%, #ef4444 100%)',
                         opacity: theme === 'dark' ? '0.15' : '0.2'
                     }} />
                {/* Additional Light Theme Accent */}
                {theme === 'light' && (
                    <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full blur-[100px] 
                                  mix-blend-multiply opacity-30"
                         style={{ 
                             background: 'radial-gradient(circle at center, #8b5cf6 0%, #6366f1 100%)'
                         }} />
                )}
            </div>

            {/* Neural Network Animation Background */}
            <div className="absolute inset-0"
                 style={{ 
                     background: theme === 'dark'
                         ? 'radial-gradient(circle at center, var(--purple-primary) 0%, transparent 100%)'
                         : 'radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
                     opacity: theme === 'dark' ? '0.1' : '0.4'
                 }} />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-12"
                >
                    {/* Main Title */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                        <span className="bg-gradient-to-r from-[#b35cff] via-[#b35cff] to-[#ffad4a] bg-clip-text text-transparent">
                            Forget
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-[#ffad4a] via-[#ffad4a] to-[#b35cff] bg-clip-text text-transparent">
                            Forgetting
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className={`max-w-2xl mx-auto text-xl md:text-2xl transition-colors duration-200
                                ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Use the Cyril Journal to take your notes. You'll never forget anything again.
                    </p>

                    {/* CTA Button */}
                    <div className="flex justify-center">
                        <Link
                            href="/journal"
                            className={`group relative inline-flex items-center gap-4 px-8 py-4 rounded-full 
                                    transition-all duration-300 ${
                                theme === 'dark'
                                    ? 'bg-gradient-to-r from-[#b35cff]/10 to-[#ffad4a]/10 border border-[#b35cff]/20 hover:from-[#b35cff]/20 hover:to-[#ffad4a]/20'
                                    : 'bg-white/80 backdrop-blur-sm border border-purple-200 shadow-lg shadow-purple-500/10 hover:bg-white/90 hover:border-purple-300 hover:shadow-purple-500/20'
                            }`}
                        >
                            <span className="text-lg font-semibold bg-gradient-to-r from-[#b35cff] to-[#ffad4a] bg-clip-text text-transparent">
                                {session ? 'Access Your Journal' : 'Begin Your Journey'}
                            </span>
                            <ArrowRight className="w-5 h-5 text-[#b35cff] transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-[2dvh] left-1/2 transform -translate-x-1/2"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className={`text-sm transition-colors duration-200
                                  ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Discover More
                    </span>
                    <motion.div
                        animate={{
                            y: [0, 10, 0],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                        className="w-1 h-8 rounded-full bg-gradient-to-b from-[#b35cff] to-[#ffad4a]"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default HeroSection; 