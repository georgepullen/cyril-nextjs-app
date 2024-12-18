// hooks/useLoadingState.ts
import { useState } from 'react';

export const useLoadingState = () => {
  const [loading, setLoading] = useState(false);
  const [evolving, setEvolving] = useState(false);

  return { loading, setLoading, evolving, setEvolving };
};
