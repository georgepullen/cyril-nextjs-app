import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin } from 'lucide-react';

interface NavbarProps {
    scrolled: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
    const [isHovered, setIsHovered] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navItems = ['overview', 'ecosystem', 'gateway'];

    const handleMobileNavClick = (item: string) => {
        const element = document.getElementById(item);
        if (element) {
            const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementPosition - navbarHeight,
                behavior: 'smooth',
            });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-2' : 'py-4'}`}>
            <div className="relative">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 -z-10 backdrop-blur-md"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#BE95FF]/5 to-[#FF7C00]/5 border-b border-[#BE95FF]/10" />
                </motion.div>

                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-8">
                            <motion.div
                                className="relative group"
                                onHoverStart={() => setIsHovered('logo')}
                                onHoverEnd={() => setIsHovered('')}
                            >
                                <span className="text-3xl font-bold bg-gradient-to-r from-[#BE95FF] to-[#FF7C00] bg-clip-text text-transparent">
                                    <a href="/">CYRIL</a>
                                </span>
                                <AnimatePresence>
                                    {isHovered === 'logo' && (
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            exit={{ scaleX: 0 }}
                                            className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#BE95FF] to-[#FF7C00]"
                                        />
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            <div className="hidden lg:flex items-center space-x-2">
                                <span className="text-sm text-gray-400">Created by</span>
                                <span className="text-sm font-medium bg-gradient-to-r from-[#BE95FF] to-[#FF7C00] bg-clip-text text-transparent">
                                    George Pullen
                                </span>
                            </div>
                        </div>

                        <div className="hidden lg:flex items-center space-x-8">
                            {navItems.map((item) => (
                                <motion.div
                                    key={item}
                                    className="relative"
                                    onHoverStart={() => setIsHovered(item)}
                                    onHoverEnd={() => setIsHovered('')}
                                >
                                    <motion.a
                                        href={`#${item}`}
                                        onClick={() => handleMobileNavClick(item)}
                                        className="block px-4 py-2 text-sm font-medium capitalize relative z-10 hover:text-[#BE95FF] transition-colors"
                                    >
                                        {item}
                                    </motion.a>
                                    <AnimatePresence>
                                        {isHovered === item && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-[#BE95FF]/10 to-[#FF7C00]/10 border border-[#BE95FF]/20"
                                            />
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}

                            <div className="flex items-center space-x-4 ml-4">
                                <motion.a
                                    href="https://github.com/georgepullen"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg hover:bg-[#BE95FF]/10 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Github className="w-5 h-5 text-gray-400" />
                                </motion.a>
                                <motion.a
                                    href="https://uk.linkedin.com/in/george-pullen-73693027b"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg hover:bg-[#BE95FF]/10 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Linkedin className="w-5 h-5 text-gray-400" />
                                </motion.a>
                            </div>
                        </div>

                        <button
                            className="lg:hidden p-2 rounded-lg hover:bg-[#BE95FF]/10 transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6 text-gray-400" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-400" />
                            )}
                        </button>
                    </div>

                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="lg:hidden overflow-hidden"
                            >
                                <div className="py-4 space-y-4">
                                    {navItems.map((item) => (
                                        <motion.div
                                            key={item}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            exit={{ x: -20, opacity: 0 }}
                                            className="relative"
                                        >
                                            <motion.a
                                                href={`#${item}`}
                                                onClick={() => handleMobileNavClick(item)}
                                                className="block px-4 py-2 text-sm font-medium capitalize hover:text-[#BE95FF] transition-colors"
                                            >
                                                {item}
                                            </motion.a>
                                        </motion.div>
                                    ))}
                                    
                                    <div className="border-t border-[#BE95FF]/10 pt-4 mt-4">
                                        <div className="px-4 space-y-4">
                                            <div className="flex flex-col space-y-1">
                                                <span className="text-sm text-gray-400">Created by</span>
                                                <span className="text-sm font-medium bg-gradient-to-r from-[#BE95FF] to-[#FF7C00] bg-clip-text text-transparent">
                                                    George Pullen
                                                </span>
                                            </div>
                                            <div className="flex space-x-4">
                                                <a
                                                    href="https://github.com/georgepullen"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 rounded-lg hover:bg-[#BE95FF]/10 transition-colors"
                                                >
                                                    <Github className="w-5 h-5 text-gray-400" />
                                                </a>
                                                <a
                                                    href="https://uk.linkedin.com/in/george-pullen-73693027b"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 rounded-lg hover:bg-[#BE95FF]/10 transition-colors"
                                                >
                                                    <Linkedin className="w-5 h-5 text-gray-400" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;