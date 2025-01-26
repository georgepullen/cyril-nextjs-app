import React, { ReactNode } from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative bg-[#0A0A12] py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-6">
                        <IconWrapper href="mailto:george@cyril.guru" aria-label="Email">
                            <Mail className="w-4 h-4 text-[#b35cff]" />
                        </IconWrapper>
                        <IconWrapper href="https://github.com/georgepullen" aria-label="GitHub">
                            <Github className="w-4 h-4 text-[#b35cff]" />
                        </IconWrapper>
                        <IconWrapper href="https://www.linkedin.com/in/george-pullen-73693027b/" aria-label="LinkedIn">
                            <Linkedin className="w-4 h-4 text-[#b35cff]" />
                        </IconWrapper>
                    </div>

                    <div className="flex items-center space-x-6">
                        <a href="/privacy" className="text-xs text-gray-500 hover:text-gray-400 transition-colors">
                            Privacy
                        </a>
                        <span className="text-gray-700">•</span>
                        <a href="/terms" className="text-xs text-gray-500 hover:text-gray-400 transition-colors">
                            Terms
                        </a>
                        <span className="text-gray-700">•</span>
                        <span className="text-xs text-gray-500">
                            © {new Date().getFullYear()} CYRIL
                        </span>
                    </div>
                </div>
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
        className="p-2 hover:bg-white/5 rounded-full transition-colors duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
    >
        {children}
    </motion.a>
);

export default Footer;