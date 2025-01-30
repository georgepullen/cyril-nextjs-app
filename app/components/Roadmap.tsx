import React from 'react';
import { motion } from 'framer-motion';
import { Brain, BookText, TrendingUp, Lock, Zap, Users } from 'lucide-react';

const RoadmapSection: React.FC = () => {
    const milestones = [
        {
            title: "Cyrillectual Launch",
            phase: "Phase 1",
            date: "Q2 2024",
            description: "Launch of our advanced knowledge management platform with AI-powered insights.",
            features: [
                "Neural processing engine",
                "Automated categorization",
                "Real-time collaboration"
            ],
            details: [
                "Multi-language support",
                "Custom knowledge frameworks",
                "Intelligent search system",
                "Advanced tagging algorithms"
            ],
            icon: BookText,
            status: "current"
        },
        {
            title: "Cyrillionaire Release",
            phase: "Phase 2",
            date: "Q3 2024",
            description: "Introduction of our AI-driven market analysis and investment intelligence platform.",
            features: [
                "Market data integration",
                "Predictive analytics",
                "Risk assessment"
            ],
            details: [
                "Multi-market analysis",
                "Portfolio optimization",
                "Automated strategies",
                "Sentiment analysis"
            ],
            icon: TrendingUp,
            status: "upcoming"
        },
        {
            title: "Cyrebrum Integration",
            phase: "Phase 3",
            date: "Q4 2024",
            description: "Complete cognitive enhancement platform with decision intelligence capabilities.",
            features: [
                "Universal sync system",
                "Decision support AI",
                "Knowledge visualization"
            ],
            details: [
                "Unified data platform",
                "Advanced analytics",
                "Insight engine",
                "Cross-platform API"
            ],
            icon: Brain,
            status: "upcoming"
        }
    ];

    return (
        <section className="relative py-32 overflow-hidden bg-[#080B14]">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
                <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] rounded-full"
                     style={{ 
                         background: 'radial-gradient(circle at center, var(--accent-primary) 0%, transparent 70%)',
                         opacity: '0.03',
                         filter: 'var(--blur-md)'
                     }} />
                <div className="absolute bottom-1/4 left-1/4 w-[800px] h-[800px] rounded-full"
                     style={{ 
                         background: 'radial-gradient(circle at center, var(--accent-secondary) 0%, transparent 70%)',
                         opacity: '0.03',
                         filter: 'var(--blur-md)'
                     }} />
            </div>

            {/* Section Title */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative text-center mb-20"
            >
                <div className="badge inline-block mb-4">Implementation Timeline</div>
                <h2 className="text-4xl md:text-5xl font-semibold text-gradient mb-6">
                    Development Roadmap
                </h2>
                <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                    Our strategic approach to delivering next-generation cognitive enhancement solutions
                </p>
            </motion.div>

            {/* Timeline Grid */}
            <div className="section-container">
                <div className="grid gap-12">
                    {milestones.map((milestone, index) => {
                        const Icon = milestone.icon;
                        return (
                            <motion.div
                                key={milestone.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="card p-8">
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-lg bg-gradient-subtle
                                                          flex items-center justify-center
                                                          transition-all duration-300 group-hover:shadow-md">
                                                <Icon className="w-8 h-8" style={{ color: 'var(--accent-primary)' }} />
                                            </div>
                                            <div>
                                                <h3 className="text-3xl font-semibold text-gradient">
                                                    {milestone.title}
                                                </h3>
                                                <div className="flex items-center gap-3 mt-2">
                                                    <span className="text-sm font-medium" style={{ color: 'var(--accent-primary)' }}>
                                                        {milestone.phase}
                                                    </span>
                                                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--border-medium)' }} />
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full" style={{ 
                                                            background: milestone.status === 'current' ? 'var(--accent-primary)' :
                                                                       milestone.status === 'upcoming' ? 'var(--accent-secondary)' :
                                                                       'var(--text-tertiary)'
                                                        }} />
                                                        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                                            {milestone.date}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div>
                                            <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Overview</h4>
                                            <p className="text-base mb-6" style={{ color: 'var(--text-secondary)' }}>
                                                {milestone.description}
                                            </p>
                                            <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Core Features</h4>
                                            <ul className="space-y-3">
                                                {milestone.features.map((feature, idx) => (
                                                    <li key={idx} className="flex items-center gap-3 text-sm">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-gradient" />
                                                        <span style={{ color: 'var(--text-secondary)' }}>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Technical Details</h4>
                                            <ul className="space-y-3">
                                                {milestone.details.map((detail, idx) => (
                                                    <li key={idx} className="flex items-center gap-3 text-sm">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-gradient" />
                                                        <span style={{ color: 'var(--text-secondary)' }}>{detail}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
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