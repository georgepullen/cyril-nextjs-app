import React from 'react';
import { motion } from 'framer-motion';
import LogoAndTitle from '../../components/LogoAndTitle';

type Props = { sessionNumber: number };

export default function SessionHeader({ sessionNumber }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="h-[80%] flex flex-col justify-center items-center"
    >
      <LogoAndTitle />
        <h1 className="xl:text-4xl text-2xl font-bold mb-4 mt-8">
        Session <span className="leading-none text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700">{sessionNumber}</span>
        </h1>
    </motion.div>
  );
}
