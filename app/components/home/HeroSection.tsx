import { motion, AnimatePresence } from "framer-motion"

interface HeroSectionProps {
    isLoaded: any
}

const phrases = [
    { text: "ACTIVE", delay: 0 },
    { text: "PARAMETER", delay: 0.4 },
    { text: "EVOLUTION", delay: 0.8 }
];

export const HeroSection: React.FC<HeroSectionProps> = ({ isLoaded }) => {
    return (
        <section className="h-screen flex flex-col items-center justify-center relative px-4" >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(190,149,255,0.15)_0%,transparent_70%)] animate-pulse" />

            <AnimatePresence>
                {isLoaded && (
                    <div className="space-y-4 md:space-y-6 text-center relative w-full">
                        {phrases.map((phrase) => (
                            <motion.div
                                key={phrase.text}
                                initial={{ y: 40, opacity: 0 }}
                                animate={{
                                    y: 0,
                                    opacity: 1,
                                    transition: {
                                        duration: 1.2,
                                        delay: phrase.delay,
                                        ease: [0.25, 0.1, 0.25, 1]
                                    }
                                }}
                                className="relative"
                            >
                                <span className="text-4xl sm:text-5xl md:text-7xl xl:text-9xl font-light tracking-[0.15em] md:tracking-[0.2em] relative">
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: phrase.delay + 0.5 }}
                                        className="bg-gradient-to-r from-[#BE95FF] via-white to-[#FF7C00] text-transparent bg-clip-text"
                                    >
                                        {phrase.text}
                                    </motion.span>
                                </span>
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>
        </section >
    )
}