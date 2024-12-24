'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface MessageProps {
  message: {
    role: 'user' | 'ai' | 'error' | 'evolve' | 'typing';
    content: string;
  };
  onNewSession: () => void;
}

const MessageItem: React.FC<MessageProps> = ({ message, onNewSession }) => {
  const isTyping = message.role === 'typing';
  const isError = message.role === 'error';
  const isEvolve = message.role === 'evolve';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full flex ${message.role !== 'user' ? 'pr-[25%] justify-start' : 'pl-[25%] justify-end'}`}
    >
      <div
        className={`flex items-center gap-4 w-full max-w-max ${message.role !== 'user' ? 'flex-row' : 'flex-row-reverse'
          }`}
      >
        <div
          className={`flex flex-col px-4 py-4 rounded-lg shadow-md sm:text-base text-sm font-medium text-white whitespace-pre-line w-full 
            ${isError
              ? 'bg-gray-800 text-red-500'
              : isEvolve
                ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                : message.role === 'ai'
                  ? 'bg-gray-800'
                  : isTyping
                    ? 'bg-gray-800'
                    : 'bg-gradient-to-r from-blue-900 to-blue-800'
            }`}
        >
          {isTyping ? (
            <div className="flex gap-1 items-center">
              <motion.span
                className="h-2 w-2 bg-white rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
              />
              <motion.span
                className="h-2 w-2 bg-white rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1, delay: 0.2, ease: 'easeInOut' }}
              />
              <motion.span
                className="h-2 w-2 bg-white rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1, delay: 0.4, ease: 'easeInOut' }}
              />
            </div>
          ) : (
            message.content
          )}
          {isEvolve && (
            <motion.button
              whileHover={{ scale: 1.05, opacity: 1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              onClick={onNewSession}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="mt-4 relative font-extrabold px-6 rounded-lg flex flex-row items-center sm:gap-2 gap-2 bg-slate-900 w-full justify-center py-2 overflow-hidden max-w-max"
            >
              <Image
                src="/lab.svg"
                alt="Enter"
                width={40}
                height={40}
                className="h-8 w-auto"
              />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-700">Evolve</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-50 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 w-full h-full"></div>
              </div>
            </motion.button>
          )}
          {isError && (
            <>
              <p className="text-gray-400">Cyril is offline at the moment.<br></br>Please contact <a href="mailto:george@cyril.guru" className="text-blue-400 hover:underline">george@cyril.guru</a> to arrange a period of guaranteed uptime.</p>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageItem;
