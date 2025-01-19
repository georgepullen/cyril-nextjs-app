import { BookText, Brain, LineChart } from "lucide-react";

interface Integration {
    name: string;
    tagline: string;
    description: string;
    features: string[];
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    releaseDate: string;
    gradient: string;
    delay: number;
    position: 'left' | 'right' | 'center';
}

export const integrations: Integration[] = [
    {
        name: 'Cyrillectual',
        tagline: 'Remember More, Revise Less',
        description: 'Retention-optimized note-taking platform that evolves with your knowledge.',
        features: ['Retention Prediction', 'Guided Review'],
        icon: BookText,
        releaseDate: 'January 28, 2025',
        gradient: 'from-[#BE95FF] via-[#FF7C00] to-[#BE95FF]',
        delay: 0.6,
        position: 'right',
    },
    {
        name: 'Cyrebrum',
        tagline: 'Your Second Brain',
        description: 'Links Cyril integrations to guide your cognitive tasks.',
        features: ['Neural Memories', 'Personality Mirroring'],
        icon: Brain,
        releaseDate: 'March 11, 2025',
        gradient: 'from-[#BE95FF] via-[#9A67FF] to-[#BE95FF]',
        delay: 0.2,
        position: 'left',
    },
    {
        name: 'Cyrillionaire',
        tagline: 'Niche Market Insights',
        description: 'Real-time financial intelligence to keep you well-informed and ahead of the game.',
        features: ['Predictive Analytics', 'Real-time Market Scanning', 'Risk Assessment'],
        icon: LineChart,
        releaseDate: 'August 12, 2025',
        gradient: 'from-[#FF7C00] via-[#FF9D4D] to-[#FF7C00]',
        delay: 0.4,
        position: 'center',
    },
];