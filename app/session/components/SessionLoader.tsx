import React, { useEffect, useState } from 'react';
import SessionHeader from './SessionHeader';

type Props = {
  user: { email: string; name: string; picture: string };
  fetchSessionNumber: () => Promise<number | null>;
  onComplete: () => void;
};

export default function SessionLoader({ user, fetchSessionNumber, onComplete }: Props) {
  const [sessionNumber, setSessionNumber] = useState<number | null>(null);

  useEffect(() => {
    async function getSessionNumber() {
      const number = await fetchSessionNumber();
      setSessionNumber(number !== null ? Number(number) : null);
    }
    getSessionNumber();

    const timer = setTimeout(() => onComplete(), 2000);
    return () => clearTimeout(timer);
  }, [user, fetchSessionNumber, onComplete]);

  return sessionNumber !== null ? <SessionHeader sessionNumber={sessionNumber} /> : null;
}
