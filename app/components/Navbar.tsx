"use client"
import React from 'react';
import Link from 'next/link';
import { Book } from 'lucide-react';
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

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8">
                            <NavLink href="/journal">
                                <div className="flex items-center px-6 py-2 bg-gradient-to-r from-[#b35cff]/10 to-[#ffad4a]/10 border border-[#b35cff]/20 rounded-full hover:from-[#b35cff]/20 hover:to-[#ffad4a]/20 transition-all duration-300">
                                    <Book className="w-5 h-5 mr-3 text-[#b35cff]" />
                                    <span className="text-base font-semibold bg-gradient-to-r from-[#b35cff] to-[#ffad4a] bg-clip-text text-transparent">
                                        Feed Cyril
                                    </span>
                                </div>
                            </NavLink>
                        </div>
                    </div>

                    <div className="md:hidden">
                        <Link
                            href="/journal"
                            className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-[#b35cff]/10 to-[#ffad4a]/10 border border-[#b35cff]/20"
                        >
                            <Book className="h-6 w-6 text-[#b35cff]" />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({
    href,
    children,
}) => {
    return (
        <Link
            href={href}
            className="transition-all duration-200"
        >
            {children}
        </Link>
    );
};

export default Navbar;