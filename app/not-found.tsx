"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0D0D15] text-white overflow-hidden font-mono relative flex items-center justify-center">
      {/* Background gradient effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#BE95FF] opacity-[0.15] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#FF7C00] opacity-[0.15] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 text-center px-4">
        {/* Glitch effect text */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-[#BE95FF] via-white to-[#FF7C00] bg-clip-text text-transparent relative">
            404
          </h1>
          <div className="absolute inset-0 text-8xl md:text-9xl font-bold text-[#BE95FF] opacity-30 animate-glitch-1">
            404
          </div>
          <div className="absolute inset-0 text-8xl md:text-9xl font-bold text-[#FF7C00] opacity-30 animate-glitch-2">
            404
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold mb-6"
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-gray-400 mb-12 max-w-md mx-auto"
        >
          The page youre looking for does not exist.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#BE95FF] to-[#FF7C00] text-white font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Home className="w-4 h-4" />
            Return Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-lg border border-[#BE95FF]/20 bg-white/5 text-white font-medium flex items-center gap-2 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </motion.div>
      </div>

      {/* Add animations */}
      <style jsx global>{`
        @keyframes glitch-1 {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }

        @keyframes glitch-2 {
          0% { transform: translate(0); }
          20% { transform: translate(2px, -2px); }
          40% { transform: translate(2px, 2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(-2px, 2px); }
          100% { transform: translate(0); }
        }

        .animate-glitch-1 {
          animation: glitch-1 3s infinite linear alternate-reverse;
        }

        .animate-glitch-2 {
          animation: glitch-2 3s infinite linear alternate-reverse;
        }
      `}</style>
    </main>
  );
} 