'use client';
import { motion } from 'framer-motion';
import React, { useRef, useEffect } from 'react';
import Image from 'next/image';

interface InputFooterProps {
  onSend: (input: string) => void;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  disabled: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

const InputFooter: React.FC<InputFooterProps> = ({
  onSend,
  input,
  setInput,
  disabled,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sm:p-4 p-1 flex flex-col fixed bottom-0 left-0 right-0 z-10 bg-slate-900 bg-opacity-90 rounded-lg max-w-5xl sm:w-[80%] m-auto sm:mb-4 mb-1 focus:outline-none"
    >
      <div className="flex w-full sm:gap-4 gap-1">
        <a href="/reflect">
          <motion.button
            whileHover={{ scale: 1.05, opacity: 1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="sm:px-4 sm:py-2 border-gray-600 border rounded-lg font-semibold transition-all duration-300 shadow-md focus:outline-none sm:text-xl text-white bg-gray-800 h-full"
          >
            <Image
              src="/history.svg"
              alt="Enter"
              width={40}
              height={40}
              className="sm:h-8 h-5 w-10"
            />
          </motion.button>
        </a>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter your message here..."
          className="flex-1 sm:px-4 px-2 sm:text-xl text-sm sm:py-2 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-blue-500 focus:ring-4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !disabled && onSend(input)}
          disabled={disabled}
        />
        <motion.button
          whileHover={{ scale: 1.05, opacity: 1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          onClick={() => !disabled && onSend(input)}
          className="bg-gray-800 sm:px-4 sm:py-2 border-gray-600 border rounded-lg font-semibold transition-all duration-300 shadow-md focus:outline-none sm:text-xl text-white"
          disabled={disabled}
        >
          <Image
            src="/send.svg"
            alt="Send"
            width={40}
            height={40}
            className="sm:h-8 h-5 w-10"
          />
        </motion.button>
      </div>
      <p className="text-white pt-4 sm:text-sm text-xs text-center">
        Guardrails are coming in a future update,{' '}
        <span className="font-bold leading-none text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700">
          exercise caution
        </span>{' '}
        and do not bring up sensitive topics.
      </p>
    </motion.footer>
  );
};

export default InputFooter;
