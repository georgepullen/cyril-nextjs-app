import React from 'react';
import { motion } from 'framer-motion';
import { Feather, Activity, Speech, Waypoints } from 'lucide-react';

export const OverviewSection = () => {
    return (
        <section id="overview" className="min-h-screen py-32 relative px-4 md:px-6">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto"
            >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
                    <div className="md:col-span-5 space-y-8">
                        <h2 className="text-xl md:text-2xl tracking-[0.2em] md:tracking-[0.3em] font-light text-[#BE95FF]">
                            OVERVIEW
                        </h2>
                        <p className="text-gray-300 tracking-wider leading-relaxed">
                            Cyril is an evolving AI system that attempts to internalise information rather than retrieving it.
                        </p>
                    </div>

                    <div className="md:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-[1fr]">
                        {[
                            {
                                icon: <Waypoints className="w-6 h-6" />,
                                title: "SMALL_CONCEPT_MODEL",
                                description: "Cyril is an evolving derivative of Meta AI's Large Concept Model."
                            },
                            {
                                icon: <Activity className="w-6 h-6" />,
                                title: "ACTIVE_PARAMETERS",
                                description: "Cyril has the ability to actively manipulate his own model parameters during your conversation."
                            },
                            {
                                icon: <Feather className="w-6 h-6" />,
                                title: "LIGHTWEIGHT",
                                description: "Cyril's thought model is composed of less than one hundred thousand parameters."
                            },
                            {
                                icon: <Speech className="w-6 h-6" />,
                                title: "EVOLVING_PERSONALITY",
                                description: "As Cyril gets to know you, he will start to take on some of your own personality traits."
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                className="relative group h-full"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-[#BE95FF]/20 to-[#FF7C00]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                                <div className="space-y-4 p-6 rounded-lg bg-[#0D0D15]/50 backdrop-blur-sm border border-[#BE95FF]/10 group-hover:border-[#BE95FF]/20 transition-colors duration-300 relative z-10 h-full">
                                    <div className="text-[#FF7C00] group-hover:scale-105 transition-transform duration-300">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-lg tracking-[0.15em] md:tracking-[0.2em] font-light text-[#BE95FF] break-words">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-300 tracking-wide">{feature.description}</p>
                                </div>
                            </motion.div>

                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};