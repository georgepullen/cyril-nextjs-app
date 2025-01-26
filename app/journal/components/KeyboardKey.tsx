import React from 'react';

interface KeyboardKeyProps {
  children: React.ReactNode;
}

const KeyboardKey: React.FC<KeyboardKeyProps> = ({ children }) => (
  <span className="inline-flex items-center justify-center px-2 h-6 text-xs font-medium 
                   bg-[#1E1E2E] text-gray-300 rounded border border-[#b35cff]/10 min-w-[24px]
                   shadow-sm">
    {children}
  </span>
);

export default KeyboardKey; 