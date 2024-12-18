// hooks/useInput.ts
import { useState } from 'react';

export const useInput = (inputRef: React.RefObject<HTMLInputElement>) => {
  const [input, setInput] = useState('');

  const resetInput = () => setInput('');

  return { input, setInput, inputRef, resetInput };
};
