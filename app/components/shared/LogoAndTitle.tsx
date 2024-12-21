'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function LogoAndTitle() {
  return (
    <div className="flex justify-start items-center w-full">
      <motion.h1
        className="font-bold 2xl:text-9xl xl:text-[6.5rem] text-7xl flex items-center gap-4"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Image
          src="/logo.svg"
          alt="Logo"
          width={128}
          height={128}
          className="2xl:h-26 xl:h-24 sm:h-16 h-10 w-auto"
          priority={true}
        />
        Cyril
      </motion.h1>
    </div>
  );
}
