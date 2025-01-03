'use client';
import { motion } from 'framer-motion';

export default function SubTitle() {
  return (
    <>
      <motion.h2
        className="font-semibold text-left 2xl:text-3xl sm:text-2xl text-xl w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
      >
        Teaching LLMs to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700">Adapt</span> Their <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700">Speech Style</span> Overtime
      </motion.h2>
    </>
  );
}
