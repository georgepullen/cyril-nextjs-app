"use client"
import React from 'react';
import Link from 'next/link';
import { Linkedin } from 'lucide-react';
import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';

interface NavbarProps {
    scrolled: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
    const { theme } = useTheme();
    
    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            scrolled 
                ? theme === 'dark'
                    ? 'bg-[#0D0D15]/80 backdrop-blur-md border-b border-[#b35cff]/20'
                    : 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100'
                : theme === 'dark'
                    ? 'bg-transparent'
                    : 'bg-gradient-to-b from-white/80 to-white/40 backdrop-blur-sm border-b border-white/[0.15]'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center group">
                            <div className={`rounded-lg transition-colors duration-200 ${
                                theme === 'light' ? 'bg-white/40 backdrop-blur-sm' : ''
                            }`}>
                                <Image
                                    src="/logo.svg"
                                    alt="Cyril Logo"
                                    width={32}
                                    height={32}
                                    className="h-8 w-auto"
                                />
                            </div>
                            <span className={`ml-2 font-bold text-lg transition-colors duration-200
                                ${theme === 'dark' 
                                    ? 'text-white group-hover:text-[#b35cff]' 
                                    : 'text-gray-800 group-hover:text-[#b35cff]'}`}>
                                cyril.guru
                            </span>
                        </Link>
                    </div>

                    {/* Right Side Items */}
                    <div className="flex items-center space-x-6">
                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {/* Divider */}
                        <div className={`h-5 w-px ${
                            theme === 'dark'
                                ? 'bg-gradient-to-b from-[#b35cff]/20 to-[#ffad4a]/20'
                                : 'bg-gray-200/70'
                        }`} />

                        {/* Creator Credit */}
                        <div className="flex items-center space-x-3">
                            <span className={`text-sm font-medium transition-colors duration-200 ${
                                theme === 'dark' 
                                    ? 'text-gray-400 hover:text-gray-300' 
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}>
                                by George Pullen
                            </span>
                            <Link
                                href="https://www.linkedin.com/in/george-pullen-73693027b/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`p-2 rounded-lg transition-all duration-200
                                    ${theme === 'dark'
                                        ? 'hover:bg-[#b35cff]/10 text-[#b35cff]'
                                        : 'hover:bg-white/60 text-[#9340d3] hover:text-[#b35cff]'
                                    }`}
                            >
                                <Linkedin className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;