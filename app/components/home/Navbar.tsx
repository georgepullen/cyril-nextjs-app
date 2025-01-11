import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin } from 'lucide-react';

interface NavbarProps {
    scrolled: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navItems = ['overview', 'timeline', 'access'];

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
                    className="absolute inset-0 -z-10 backdrop-blur-sm"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#BE95FF]/10 to-[#FF7C00]/10" />
                </motion.div>

                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-8">
                            <motion.div
                                className="relative group"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <span className="text-2xl font-light tracking-[0.4em] bg-gradient-to-r from-[#BE95FF] to-[#FF7C00] text-transparent bg-clip-text">
                                    CYRIL
                                </span>
                                <AnimatePresence>
                                    {isHovered && (
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            exit={{ scaleX: 0 }}
                                            className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-[#BE95FF] to-[#FF7C00]"
                                        />
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            <div className="hidden lg:flex items-center space-x-2 text-xs">
                                <span className="text-gray-400 tracking-[0.2em]">CREATED_BY</span>
                                <span className="text-[#BE95FF] tracking-[0.3em] font-light">GEORGE PULLEN</span>
                            </div>
                        </div>

                        <div className="hidden lg:flex items-center space-x-8">
                            {navItems.map((item) => (
                                <motion.div
                                    key={item}
                                    className="relative"
                                    onHoverStart={() => setActiveSection(item)}
                                    onHoverEnd={() => setActiveSection('')}
                                >
                                    <motion.a
                                        href={`#${item}`}
                                        onClick={() => handleMobileNavClick(item)}
                                        className="block uppercase text-sm tracking-[0.3em] py-2 relative z-10"
                                        whileHover={{ color: '#BE95FF' }}
                                    >
                                        {item}
                                    </motion.a>
                                    <AnimatePresence>
                                        {activeSection === item && (
                                            <motion.div
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0, opacity: 0 }}
                                                className="absolute -inset-4 -z-10 rounded-lg bg-gradient-to-r from-[#BE95FF]/5 to-[#FF7C00]/5"
                                            />
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}

                            <div className="flex items-center space-x-4">
                                <motion.a
                                    href="https://github.com/georgepullen"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-[#FF7C00] transition-colors duration-300"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <Github className="w-5 h-5" />
                                </motion.a>
                                <motion.a
                                    href="https://uk.linkedin.com/in/george-pullen-73693027b"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-[#FF7C00] transition-colors duration-300"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <Linkedin className="w-5 h-5" />
                                </motion.a>
                            </div>
                        </div>

                        <button
                            className="lg:hidden p-2"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6 text-gray-600" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-600" />
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
                                            className="relative"
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            exit={{ x: -20, opacity: 0 }}
                                        >
                                            <motion.a
                                                href={`#${item}`}
                                                onClick={() => handleMobileNavClick(item)}
                                                className="block uppercase text-sm tracking-[0.3em] py-2 relative z-10"
                                                whileHover={{ color: '#BE95FF' }}
                                            >
                                                {item}
                                            </motion.a>
                                        </motion.div>
                                    ))}
                                    <div className="pt-4 flex flex-col space-y-4">
                                        <div className="flex flex-col space-y-1">
                                            <span className="text-gray-400 text-xs tracking-[0.2em]">CREATED_BY</span>
                                            <span className="text-[#BE95FF] text-sm tracking-[0.3em] font-light">GEORGE PULLEN</span>
                                        </div>
                                        <div className="flex space-x-4">
                                            <a
                                                href="https://github.com/georgepullen"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-400 hover:text-[#FF7C00] transition-colors duration-300"
                                            >
                                                <Github className="w-5 h-5" />
                                            </a>
                                            <a
                                                href="https://uk.linkedin.com/in/george-pullen-73693027b"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-400 hover:text-[#FF7C00] transition-colors duration-300"
                                            >
                                                <Linkedin className="w-5 h-5" />
                                            </a>
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