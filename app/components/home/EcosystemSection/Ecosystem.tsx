import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { integrations } from './Integrations';

const EcosystemSection: React.FC = () => {
    const [activeCard, setActiveCard] = useState<number | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    return (
        <section id="ecosystem" className="relative py-32 overflow-hidden min-h-screen flex items-center">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ background: 'linear-gradient(135deg, rgba(13,13,21,0.95) 0%, rgba(0, 0, 0, 0.98) 100%)' }}
            />

            <div className="max-w-7xl mx-auto px-4 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="inline-block mb-4"
                    >
                        <div className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-2">
                            Vision for 2025
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wider">
                            Cyril
                            <span className="bg-gradient-to-r from-[#BE95FF] to-[#FF7C00] text-transparent bg-clip-text">
                                {' '}Ecosystem
                            </span>
                        </h2>
                    </motion.div>
                    <motion.p
                        className="text-gray-400 max-w-2xl mx-auto text-lg"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        A suite of evolving AI solutions.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {integrations.map((integration, index) => {
                        const Icon = integration.icon;
                        return (
                            <motion.div
                                key={integration.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: integration.delay }}
                                className="relative group h-full"
                                onHoverStart={() => setActiveCard(index)}
                                onHoverEnd={() => setActiveCard(null)}
                            >
                                <div
                                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-xl bg-gradient-to-br ${integration.gradient}`}
                                />
                                <motion.div
                                    className="relative h-full backdrop-blur-sm border border-[#BE95FF]/10 rounded-xl p-8 bg-[#0D0D15]/90 group-hover:bg-[#0D0D15]/70 transition-all duration-500 flex flex-col"
                                    whileHover={{ y: -5 }}
                                >
                                    <motion.div
                                        className={`w-16 h-16 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br ${integration.gradient}`}
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        <Icon className="w-8 h-8 text-white" />
                                    </motion.div>

                                    <div className="flex flex-col flex-grow">
                                        <div className="mb-4">
                                            <h3 className="text-2xl font-light mb-1 text-white">
                                                {integration.name}
                                            </h3>
                                            <p className="text-sm text-gray-400">
                                                {integration.tagline}
                                            </p>
                                        </div>

                                        <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                            {integration.description}
                                        </p>

                                        <ul className="space-y-2 mb-6">
                                            {integration.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-center text-sm text-gray-400">
                                                    <ArrowRight className="w-4 h-4 mr-2 text-[#BE95FF]" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-auto">
                                            <div className="flex items-center space-x-3">
                                                <div className="relative">
                                                    <div className="w-3 h-3 rounded-full bg-[#BE95FF]/20">
                                                        <div className="absolute inset-0 rounded-full bg-[#BE95FF] animate-ping" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-gray-400">Release Date</div>
                                                    <div className="text-sm font-medium text-[#BE95FF]">
                                                        {integration.releaseDate}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {activeCard === index && (
                                        <motion.div
                                            className="absolute inset-0 rounded-xl"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#BE95FF]/20 to-transparent" />
                                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF7C00]/20 to-transparent" />
                                        </motion.div>
                                    )}
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default EcosystemSection;