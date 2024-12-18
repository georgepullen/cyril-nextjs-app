// hooks/useErrorHandling.ts
import { useState } from 'react';

export const useErrorHandling = () => {
  const [error, setError] = useState<string | null>(null);

  const resetError = () => setError(null);

  return { error, setError, resetError };
};
