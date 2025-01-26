"use client"
import React from 'react';
import Link from 'next/link';
import { Code2 } from 'lucide-react';
import Image from 'next/image';

interface NavbarProps {
    scrolled: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            scrolled ? 'bg-[#0D0D15]/80 backdrop-blur-md' : 'bg-transparent'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/logo.svg"
                                alt="Cyril Logo"
                                width={32}
                                height={32}
                                className="h-8 w-auto"
                            />
                            <span className="ml-2 text-white font-bold text-lg">cyril.guru</span>
                        </Link>
                    </div>

                    {/* Creator Credit */}
                    <div className="hidden md:block">
                        <Link
                            href="https://www.linkedin.com/in/george-pullen-73693027b/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center space-x-2 px-3 py-1.5 rounded-full 
                                     bg-gradient-to-r from-[#b35cff]/5 to-[#ffad4a]/5
                                     hover:from-[#b35cff]/10 hover:to-[#ffad4a]/10
                                     border border-[#b35cff]/10 transition-all duration-300"
                        >
                            <Code2 className="w-4 h-4 text-[#b35cff] transition-transform duration-300 group-hover:rotate-12" />
                            <span className="text-sm font-medium bg-gradient-to-r from-[#b35cff] to-[#ffad4a] bg-clip-text text-transparent">
                                George Pullen
                            </span>
                        </Link>
                    </div>

                    {/* Mobile Creator Credit */}
                    <div className="md:hidden">
                        <Link
                            href="https://www.linkedin.com/in/george-pullen-73693027b/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-9 h-9 rounded-full
                                     bg-gradient-to-r from-[#b35cff]/5 to-[#ffad4a]/5
                                     hover:from-[#b35cff]/10 hover:to-[#ffad4a]/10
                                     border border-[#b35cff]/10"
                        >
                            <Code2 className="w-4 h-4 text-[#b35cff]" />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;