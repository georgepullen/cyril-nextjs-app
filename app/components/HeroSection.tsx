'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Brain, BookText, TrendingUp, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const solutions = [
        {
            name: 'Cyrillectual',
            tagline: 'Knowledge Management',
            description: 'Transform your note-taking with Cyril.',
            features: [
                'Questions generated based on your notes',
                'Exam board specific feedback',
                'Ambient learning to increase retention'
            ],
            icon: BookText,
            delay: 0.3
        },
        {
            name: 'Cyrillionaire',
            tagline: 'Advanced Market Intelligence',
            description: 'Cyril will provide market analysis for better informed investment decisions.',
            features: [
                'Real-time market analysis',
                'Predictive market modeling',
                'Risk assessment'
            ],
            icon: TrendingUp,
            delay: 0.4
        },
        {
            name: 'Cyrebrum',
            tagline: 'Your second brain',
            description: 'The heart of the Cyril ecosystem.',
            features: [
                'Integration with other solutions',
                'Adaptive learning',
                'Neural evolution'
            
            ],
            icon: Brain,
            delay: 0.5
        }
    ];

    return (
        <>
            {/* Full-height Hero Section */}
            <section className="relative h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
                {/* Subtle Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.3]" />
                    <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] rounded-full"
                         style={{ 
                             background: 'radial-gradient(circle at center, var(--accent-primary) 0%, transparent 70%)',
                             opacity: '0.05',
                             filter: isMobile ? 'var(--blur-sm)' : 'var(--blur-md)'
                         }} />
                    <div className="absolute -bottom-1/4 -left-1/4 w-[1000px] h-[1000px] rounded-full"
                         style={{ 
                             background: 'radial-gradient(circle at center, var(--accent-secondary) 0%, transparent 70%)',
                             opacity: '0.05',
                             filter: isMobile ? 'var(--blur-sm)' : 'var(--blur-md)'
                         }} />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.1]">
                            <span className="text-gradient">
                                Your Mind,
                            </span>
                            <br />
                            <span className="text-gradient">
                                Amplified
                            </span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-xl sm:text-2xl md:text-3xl" style={{ color: 'var(--text-secondary)' }}>
                            Cognitive enhancement through artificial intelligence
                        </p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Link href="/journal" className="button-primary inline-flex items-center gap-3">
                                Begin Your Journey
                                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                            <Link href="#solutions" className="button-secondary inline-flex items-center gap-3">
                                Explore Solutions
                                <ChevronRight className="w-5 h-5" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Solutions Section */}
            <section id="solutions" className="relative py-32 overflow-hidden">
                <div className="section-container">
                    {/* Section Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <div className="badge inline-block mb-4">Our Solutions</div>
                        <h2 className="text-4xl md:text-5xl font-semibold text-gradient mb-6">
                            Intelligent Solutions for Modern Minds
                        </h2>
                        <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                            Harness the power of artificial intelligence to enhance your cognitive capabilities
                        </p>
                    </motion.div>

                    {/* Solutions Grid */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {solutions.map((solution, index) => {
                            const Icon = solution.icon;
                            return (
                                <motion.div
                                    key={solution.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                    className="group"
                                >
                                    <div className="card p-8">
                                        <div className="w-14 h-14 rounded-lg bg-gradient-subtle
                                                      flex items-center justify-center mb-6
                                                      transition-all duration-300 group-hover:shadow-md">
                                            <Icon className="w-7 h-7" style={{ color: 'var(--accent-primary)' }} />
                                        </div>
                                        <h3 className="text-2xl font-semibold text-gradient mb-2">
                                            {solution.name}
                                        </h3>
                                        <p className="text-base font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                                            {solution.tagline}
                                        </p>
                                        <p className="text-base mb-6" style={{ color: 'var(--text-secondary)' }}>
                                            {solution.description}
                                        </p>
                                        <ul className="space-y-3">
                                            {solution.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-2">
                                                    <ChevronRight className="w-5 h-5 mt-0.5" style={{ color: 'var(--accent-primary)' }} />
                                                    <span style={{ color: 'var(--text-secondary)' }}>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}

export default HeroSection; 