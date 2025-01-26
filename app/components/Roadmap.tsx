import React from 'react';
import { motion } from 'framer-motion';
import { stages } from './stages';

const RoadmapSection: React.FC = () => {
    return (
        <section className="relative py-20 min-h-screen flex items-center">
            <div className="absolute inset-0">
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#b35cff] opacity-[0.15] rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-[#ffad4a] opacity-[0.15] rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-[#b35cff] via-white to-[#ffad4a] bg-clip-text text-transparent mb-6">
                        The Cyril Experiment
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Your second brain - managing your knowledge, and helping you make the best decisions possible.
                    </p>
                </motion.div>

                {/* Desktop Timeline */}
                <div className="hidden md:block relative">
                    {/* Connection Line */}
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-[#b35cff]/20 via-[#9747FF]/20 to-[#7B3FE4]/20" />
                    
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
                                    className="relative pt-16 h-full"
                                >
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2">
                                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stage.gradient} flex items-center justify-center`}>
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                    <div className="bg-[#1A1A2E] rounded-lg p-6 border border-[#b35cff]/10 h-full flex flex-col">
                                        <h3 className="text-xl font-bold bg-gradient-to-r from-[#b35cff] to-[#ffad4a] bg-clip-text text-transparent mb-2">
                                            {stage.title}
                                        </h3>
                                        <div className="text-sm text-[#b35cff] mb-3">{stage.date}</div>
                                        <p className="text-gray-400 text-sm flex-grow">
                                            {stage.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile Timeline */}
                <div className="md:hidden space-y-8">
                    {stages.map((stage, index) => {
                        const Icon = stage.icon;
                        return (
                            <motion.div
                                key={stage.title}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="relative pl-8 border-l-2 border-[#b35cff]/20"
                            >
                                <div className="absolute left-0 top-0 -translate-x-1/2">
                                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${stage.gradient} flex items-center justify-center`}>
                                        <Icon className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                                <div className="bg-[#1A1A2E] rounded-lg p-6 border border-[#b35cff]/10">
                                    <h3 className="text-xl font-bold bg-gradient-to-r from-[#b35cff] to-[#ffad4a] bg-clip-text text-transparent mb-2">
                                        {stage.title}
                                    </h3>
                                    <div className="text-sm text-[#b35cff] mb-3">{stage.date}</div>
                                    <p className="text-gray-400 text-sm">
                                        {stage.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default RoadmapSection; 