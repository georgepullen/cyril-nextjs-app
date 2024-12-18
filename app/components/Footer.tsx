'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Footer() {
  return (
    <motion.footer
      className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm sm:p-8 p-4 font-bold"
    >
      <h2 className="text-center sm:text-left">Created by George Pullen</h2>
      <div className="hidden sm:block h-8 border-l border-gray-300 mx-4"></div>
      <div className="flex gap-6">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://uk.linkedin.com/in/george-pullen-73693027b"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/linkedin.svg"
            alt="LinkedIn icon"
            width={16}
            height={16}
          />
          LinkedIn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/georgepullen"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/github.svg"
            alt="GitHub icon"
            width={16}
            height={16}
          />
          GitHub
        </a>
      </div>
    </motion.footer>
  );
}
