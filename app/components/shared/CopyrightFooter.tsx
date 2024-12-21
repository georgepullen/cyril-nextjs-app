import React from 'react';
import Image from 'next/image';

const CopyrightFooter = () => {
  return (
    <footer className="text-white py-6 w-full max-w-lg">
      <div className="sm:px-0 px-6 flex flex-row justify-between items-center">
        <div className="text-left">
          <p className="text-sm">&copy; {new Date().getFullYear()} Cyril Evolve</p>
          <p className="text-xs text-gray-300">Created by George Pullen</p>
          <p className="text-xs">
            <a href="mailto:george@cyril.guru" className="text-blue-400 hover:underline">
              george@cyril.guru
            </a>
          </p>
        </div>

        <div className="flex space-x-4">
          <a href="https://github.com/georgepullen" target="_blank" rel="noopener noreferrer">
            <Image src="/github.svg" alt="GitHub" width={24} height={24} className="hover:opacity-80" />
          </a>
          <a href="https://uk.linkedin.com/in/george-pullen-73693027b" target="_blank" rel="noopener noreferrer">
            <Image src="/linkedin.svg" alt="LinkedIn" width={24} height={24} className="hover:opacity-80" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default CopyrightFooter;
