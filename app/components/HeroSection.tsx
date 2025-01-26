import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
    const { session } = useAuth();

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#b35cff] opacity-[0.15] rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#ffad4a] opacity-[0.15] rounded-full blur-[100px]" />
            </div>

            {/* Neural Network Animation Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(179,92,255,0.1)_0%,transparent_100%)] opacity-50" />

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
                        <span className="bg-gradient-to-r from-[#b35cff] via-white to-[#ffad4a] bg-clip-text text-transparent">
                            Unlock Your
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-[#ffad4a] via-white to-[#b35cff] bg-clip-text text-transparent">
                            Second Brain
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="max-w-2xl mx-auto text-xl md:text-2xl text-gray-400">
                        Your AI companion that evolves with your knowledge, launching Q3 2025.
                        Start building your memory foundation today.
                    </p>

                    {/* CTA Button */}
                    <div className="flex justify-center">
                        <Link
                            href="/journal"
                            className="group relative inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-[#b35cff]/10 to-[#ffad4a]/10 
                                    border border-[#b35cff]/20 rounded-full hover:from-[#b35cff]/20 hover:to-[#ffad4a]/20 
                                    transition-all duration-300"
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
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-sm text-gray-400">Discover More</span>
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