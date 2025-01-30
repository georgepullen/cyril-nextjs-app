'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface LoadingScreenProps {
    children: React.ReactNode;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const { session } = useAuth();

    useEffect(() => {
        // Wait for auth to initialize and add slight delay
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 100);

        return () => clearTimeout(timer);
    }, [session]);

    if (isLoading) {
        return (
            <div className="fixed inset-0 w-screen h-screen bg-[#0D0D15] z-[100] flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 relative">
                        <div className="absolute inset-0 rounded-full border-2 border-gray-600/30" />
                        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#b35cff] animate-[spin_0.8s_linear_infinite]" />
                    </div>
                    <div className="mt-6">
                        <span className="text-sm text-gray-400 tracking-wider font-light">Loading Cyril...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            {children}
        </div>
    );
};

export default LoadingScreen; 