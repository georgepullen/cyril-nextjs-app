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
  setIsTyping: (typing: boolean) => void;
}

const InputFooter: React.FC<InputFooterProps> = ({
  onSend,
  input,
  setInput,
  disabled,
  setIsTyping,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [disabled]);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 0, scale: 1 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sm:p-4 p-2 rounded-lg w-full m-auto focus:outline-none sm:h-[13%] h-auto"
    >
      <div className="flex w-full sm:gap-4 gap-1">
        <a href="/reflect">
          <motion.button
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            className="rounded-lg font-semibold transition-all duration-300 focus:outline-none sm:text-xl text-white h-full"
          >
            <Image
              src="/history.svg"
              alt="Enter"
              width={40}
              height={40}
              className="sm:h-8 h-8 w-auto"
              priority={true}
            />
          </motion.button>
        </a>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter your message here..."
          className="flex-1 px-4 sm:text-xl text-lg py-2 rounded-lg border border-gray-800 bg-slate-900 text-white focus:outline-none focus:ring-blue-500 focus:ring-1 sm:mx-0 mx-2 opacity-80"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setIsTyping(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !disabled) {
              onSend(input);
              setIsTyping(false);
            }
          }}
          onBlur={() => setIsTyping(false)}
          disabled={disabled}
        />
        <motion.button
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          onClick={() => {
            if (!disabled) {
              onSend(input);
              setIsTyping(false);
            }
          }}
          className="rounded-lg font-semibold transition-all duration-300 focus:outline-none sm:text-xl text-white"
          disabled={disabled}
        >
          <Image
            src="/send.svg"
            alt="Send"
            width={40}
            height={40}
            className="sm:h-8 h-7 w-auto"
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
