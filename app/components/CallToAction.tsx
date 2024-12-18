'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function CallToAction() {
  return (
    <div className="flex flex-row gap-4 w-full justify-center">
      {/* Enter Lab Button */}
      <a className="w-full" href="/session">
        <motion.button
          whileHover={{ scale: 1.05, opacity: 1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: -50 }} // initial animation
          animate={{ opacity: 1, y: 0 }} // end state
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="relative font-extrabold p-2 rounded-lg flex flex-row items-center sm:gap-2 gap-2 bg-slate-900 w-full justify-center py-2 border-blue-500 border-2 overflow-hidden  h-full"
        >
          <Image
            src="/lab.svg"
            alt="Enter"
            width={40}
            height={40}
            className="h-8 w-10"
          />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700">Try Demo</span>
        </motion.button>
      </a>

      {/* Past Sessions Button */}
      <a className="w-full" href="/reflect">
        <motion.button
          whileHover={{ scale: 1.05, opacity: 1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: -50 }} // initial animation
          animate={{ opacity: 1, y: 0 }} // end state
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="relative font-extrabold p-2 rounded-lg flex flex-row items-center sm:gap-2 gap-2 bg-slate-900 w-full justify-center overflow-hidden opacity-70 h-full"
        >
          <Image
            src="/history.svg"
            alt="Enter"
            width={40}
            height={40}
            className="h-8 w-10 opacity-70"
          />
          Reflect
        </motion.button>
      </a>
    </div>
  );
}
