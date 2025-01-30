"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Linkedin, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const checkScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        checkScroll();
        window.addEventListener('scroll', checkScroll, { passive: true });
        return () => window.removeEventListener('scroll', checkScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out
            ${isScrolled 
                ? 'bg-black/95 backdrop-blur-md border-b border-white/5 shadow-lg py-4' 
                : 'bg-transparent py-6'}`}
        >
            <div className="section-container">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center group">
                        <div className="relative w-8 h-8">
                            <Image
                                src="/logo.svg"
                                alt="Cyril Logo"
                                width={32}
                                height={32}
                                className="transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>
                        <span className="ml-3 text-lg font-semibold tracking-tight">
                            cyril.guru
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/journal" className="text-gray-300 hover:text-white transition-colors">
                            Journal
                        </Link>
                        <Link href="#solutions" className="text-gray-300 hover:text-white transition-colors">
                            Solutions
                        </Link>
                        <Link href="#roadmap" className="text-gray-300 hover:text-white transition-colors">
                            Roadmap
                        </Link>
                        <div className="h-4 w-px bg-gradient-subtle" />
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-300">
                                by George Pullen
                            </span>
                            <Link
                                href="https://www.linkedin.com/in/george-pullen-73693027b/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg transition-all duration-200 
                                         hover:bg-gradient-primary group"
                                style={{ background: 'var(--gradient-subtle)' }}
                            >
                                <Linkedin className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="p-2 md:hidden rounded-lg"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                        style={{ background: 'var(--gradient-subtle)' }}
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                        ) : (
                            <Menu className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="bg-black/95 backdrop-blur-md border-t border-white/5 md:hidden py-4 px-4 mt-4"
                    >
                        <div className="flex flex-col space-y-4">
                            <Link href="/journal" 
                                  className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
                                  onClick={() => setIsMobileMenuOpen(false)}>
                                Journal
                            </Link>
                            <Link href="#solutions" 
                                  className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
                                  onClick={() => setIsMobileMenuOpen(false)}>
                                Solutions
                            </Link>
                            <Link href="#roadmap" 
                                  className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
                                  onClick={() => setIsMobileMenuOpen(false)}>
                                Roadmap
                            </Link>
                            <div className="h-px bg-white/5 my-2" />
                            <div className="flex items-center justify-between px-4 py-2">
                                <span className="text-sm text-gray-300">
                                    by George Pullen
                                </span>
                                <Link
                                    href="https://www.linkedin.com/in/george-pullen-73693027b/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg transition-all duration-200 
                                             hover:bg-gradient-primary"
                                    style={{ background: 'var(--gradient-subtle)' }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Linkedin className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;