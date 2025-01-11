import React, { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { Brain, Cpu, Network } from 'lucide-react';
import NeuralVisualization from './NeuralVisualisation';

interface HeroProps {
    isLoaded: boolean;
}

const HeroSection: React.FC<HeroProps> = ({ isLoaded }) => {
    const [activeFeature, setActiveFeature] = useState(0);
    const [statusMessage, setStatusMessage] = useState('');
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const features = [
        { icon: Brain, label: "LATENT SPACE", value: "SONAR", subtext: "LCM Inspired - Meta AI" },
        { icon: Cpu, label: "EVOLVING PARAMETERS", value: "100K", subtext: "For Real-time Evolution" },
        { icon: Network, label: "KNOWLEDGE LIMIT", value: "1K", subtext: "Contextual Connections" },
    ];

    const statusMessages = [
        "Cyril is evolving",
        "Cyril is researching",
        "Cyril is predicting",
    ];

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setStatusMessage(statusMessages[index]);
            index = (index + 1) % statusMessages.length;
        }, 2000);

        return () => clearInterval(interval);
    }, [statusMessages]);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % features.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [features.length]);

    const handleMouseMove = (event: React.MouseEvent) => {
        const { currentTarget, clientX, clientY } = event;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left - width / 2);
        mouseY.set(clientY - top - height / 2);
    };

    return (
        <section
            id="overview"
            className="relative min-h-screen flex items-center pt-16 lg:pt-20 px-4 overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(190,149,255,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(190,149,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(190,149,255,0.1)_0%,transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,124,0,0.05)_0%,transparent_60%)]" />
            </div>

            <div className="max-w-6xl mx-auto w-full relative pb-8 lg:pb-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -50 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="space-y-6 lg:space-y-8"
                    >
                        <div className="space-y-4">
                            <motion.h1
                                className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wider"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 1 }}
                            >
                                Exploring
                                <br />
                                <span className="bg-gradient-to-r from-[#BE95FF] to-[#FF7C00] text-transparent bg-clip-text">
                                    Evolving Parameters
                                </span>
                            </motion.h1>

                            <motion.div
                                className="h-6 text-sm text-gray-400 font-mono"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 1.2 }}
                            >
                                &gt; {statusMessage}
                                <motion.span
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                >
                                    _
                                </motion.span>
                            </motion.div>

                            <motion.p
                                className="text-gray-300 text-base lg:text-lg tracking-wide leading-relaxed max-w-xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 1.2 }}
                            >
                                Cyril leverages an Evolving Parameter Methodology to bring you niche market insights and investment opportunities.
                            </motion.p>
                        </div>

                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 1.5 }}
                        >
                            {features.map((feature, index) => {
                                const Icon = feature.icon;
                                return (
                                    <motion.div
                                        key={feature.label}
                                        className={`p-3 lg:p-4 rounded-lg backdrop-blur-sm border relative overflow-hidden transition-all duration-500 ${activeFeature === index
                                                ? 'border-[#BE95FF] bg-[#BE95FF]/5'
                                                : 'border-[#BE95FF]/10 bg-[#0D0D15]/50'
                                            }`}
                                        animate={{
                                            scale: activeFeature === index ? 1.05 : 1,
                                        }}
                                    >
                                        {activeFeature === index && (
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#BE95FF]/10 to-transparent"
                                                initial={{ x: '-100%' }}
                                                animate={{ x: '100%' }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            />
                                        )}
                                        <div className="flex items-center space-x-3 relative">
                                            <Icon className={`w-5 h-5 ${activeFeature === index ? 'text-[#FF7C00]' : 'text-gray-400'
                                                }`} />
                                            <div>
                                                <div className="text-xs tracking-[0.2em] text-gray-400">
                                                    {feature.label}
                                                </div>
                                                <div className="text-lg lg:text-xl font-light text-white">
                                                    {feature.value}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {feature.subtext}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 50 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="hidden lg:block"
                    >
                        <NeuralVisualization />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;