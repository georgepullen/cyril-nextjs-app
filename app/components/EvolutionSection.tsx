import React from 'react';
import { motion } from 'framer-motion';
import { BookText, Brain, Network, Mail, Map } from 'lucide-react';

const EvolutionSection: React.FC = () => {
    const features = [
        {
            icon: BookText,
            title: "Knowledge Capture",
            description: "Transform your lectures and work insights into structured memory branches within your personal Cyril Journal.",
            gradient: "from-[#b35cff] to-[#d4a5ff]"
        },
        {
            icon: Brain,
            title: "Neural Evolution",
            description: "Your notes form the foundation of Cyril's understanding, enabling personalized conversations about your knowledge domains.",
            gradient: "from-[#9747FF] to-[#b35cff]"
        },
        {
            icon: Network,
            title: "Ambient Learning",
            description: "Engage with your knowledge during commutes or quiet moments through natural conversations with Cyril.",
            gradient: "from-[#7B3FE4] to-[#9747FF]"
        }
    ];

    const integrations = [
        {
            icon: Mail,
            title: "Gmail Integration",
            description: "Seamlessly connect your email communications with Cyril for contextual understanding and intelligent responses.",
            coming: "Q4 2025"
        },
        {
            icon: Map,
            title: "Maps Integration",
            description: "Enable location-aware knowledge retrieval and contextual recommendations based on your surroundings.",
            coming: "Q1 2026"
        }
    ];

    return (
        <section className="relative py-32 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[#1A1A2E]/30" />
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#b35cff] via-white to-[#ffad4a] bg-clip-text text-transparent mb-8">
                        The Evolution of Knowledge
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Start building your knowledge base today. When Cyril awakens in Q3 2025, he will have access to all of your memories.
                    </p>
                </motion.div>

                {/* Main Features */}
                <div className="grid md:grid-cols-3 gap-8 mb-32">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="relative group h-full"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#b35cff]/20 to-[#ffad4a]/20 rounded-lg blur opacity-75 
                                              group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                                <div className="relative bg-[#1A1A2E] p-8 rounded-lg border border-[#b35cff]/10 h-full flex flex-col">
                                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                                    <p className="text-gray-400 flex-grow">{feature.description}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Future Integrations */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h3 className="text-2xl font-bold text-white mb-12">Future Integrations</h3>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {integrations.map((integration) => {
                            const Icon = integration.icon;
                            return (
                                <div
                                    key={integration.title}
                                    className="relative p-6 bg-[#1A1A2E]/50 rounded-lg border border-[#b35cff]/10 h-full"
                                >
                                    <div className="flex items-start space-x-4">
                                        <Icon className="w-8 h-8 text-[#b35cff] mt-1" />
                                        <div className="text-left flex-grow">
                                            <h4 className="text-lg font-semibold text-white mb-2">{integration.title}</h4>
                                            <p className="text-sm text-gray-400 mb-3">{integration.description}</p>
                                            <span className="text-xs text-[#ffad4a] block">Coming {integration.coming}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default EvolutionSection; 