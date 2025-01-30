'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    
    const navigation = {
        product: [
            { name: 'Journal', href: '/journal' },
            { name: 'Solutions', href: '#solutions' },
            { name: 'Roadmap', href: '#roadmap' },
        ],
        company: [
            { name: 'About', href: '#' },
            { name: 'Privacy', href: '#' },
            { name: 'Terms', href: '#' },
        ],
        social: [
            {
                name: 'LinkedIn',
                href: 'https://www.linkedin.com/in/george-pullen-73693027b/',
                icon: Linkedin
            },
            {
                name: 'GitHub',
                href: 'https://github.com/georgepullen',
                icon: Github
            },
            {
                name: 'Twitter',
                href: 'https://twitter.com/georgepullen',
                icon: Twitter
            },
        ],
    };

    return (
        <footer className="relative mt-32 bg-[#080B14]">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
            </div>

            <div className="relative pt-16 pb-12">
                <div className="section-container">
                    <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                        {/* Brand Section */}
                        <div className="space-y-8">
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
                                <span className="ml-3 text-lg font-semibold tracking-tight transition-colors duration-200" 
                                      style={{ color: 'var(--text-primary)' }}>
                                    cyril.guru
                                </span>
                            </Link>
                            <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
                                Advancing human potential through artificial intelligence and cognitive enhancement.
                            </p>
                            <div className="flex space-x-4">
                                {navigation.social.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-lg transition-all duration-200 
                                                     bg-gradient-subtle hover:bg-gradient-primary 
                                                     group"
                                            aria-label={item.name}
                                        >
                                            <Icon className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                            <div>
                                <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                                    Product
                                </h3>
                                <ul className="mt-4 space-y-3">
                                    {navigation.product.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="nav-link text-sm">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                                    Company
                                </h3>
                                <ul className="mt-4 space-y-3">
                                    {navigation.company.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="nav-link text-sm">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 pt-8 border-t" style={{ borderColor: 'var(--border-light)' }}>
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                &copy; {currentYear} Cyril. All rights reserved.
                            </p>
                            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                Designed & Developed by{' '}
                                <Link
                                    href="https://www.linkedin.com/in/george-pullen-73693027b/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gradient hover:opacity-80 transition-opacity"
                                >
                                    George Pullen
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;