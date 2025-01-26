import React, { ReactNode } from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';

const Footer = () => {
    const fadeInUp = {
        initial: { y: 20, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        transition: { duration: 0.5 }
    };

    return (
        <footer className="relative bg-[#0D0D15]/80 backdrop-blur-md border-t border-[#b35cff]/10 pt-12 pb-8 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#b35cff]/10 rounded-full blur-3xl -z-10" />
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ffad4a]/10 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-4">
                <motion.div {...fadeInUp} className="flex flex-col items-center text-center space-y-6 mb-12">
                    <h3 className="text-2xl font-bold text-white">CYRIL</h3>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-lg">
                        Created by George Pullen.
                    </p>
                    <div className="flex space-x-4">
                        <IconWrapper href="mailto:george@cyril.guru" aria-label="Email">
                            <Mail className="w-5 h-5 text-gray-400 hover:text-[#b35cff]" />
                        </IconWrapper>
                        <IconWrapper href="https://github.com/georgepullen" aria-label="GitHub">
                            <Github className="w-5 h-5 text-gray-400 hover:text-[#BE95FF]" />
                        </IconWrapper>
                        <IconWrapper href="https://www.linkedin.com/in/george-pullen-73693027b/" aria-label="LinkedIn">
                            <Linkedin className="w-5 h-5 text-gray-400 hover:text-[#BE95FF]" />
                        </IconWrapper>
                    </div>
                </motion.div>

                <motion.div
                    {...fadeInUp}
                    className="border-t border-[#b35cff]/10 pt-8 flex flex-col md:flex-row justify-between items-center"
                >
                    <p className="text-gray-400 text-sm mb-4 md:mb-0">
                        © {new Date().getFullYear()} CYRIL GURU
                    </p>
                    <div className="flex space-x-6 text-gray-400 text-sm">
                        <a href="/privacy" className="hover:text-[#b35cff] transition-colors">Privacy</a>
                        <a href="/terms" className="hover:text-[#b35cff] transition-colors">Terms</a>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

type IconWrapperProps = {
    children: ReactNode;
    href: string;
} & HTMLMotionProps<"a">;

const IconWrapper: React.FC<IconWrapperProps> = ({ children, href, ...props }) => (
    <motion.a
        href={href}
        className="p-2 bg-white/5 rounded-full hover:bg-[#b35cff]/20 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
    >
        {children}
    </motion.a>
);

export default Footer;