import React, { useEffect } from 'react';
import SessionHeader from './SessionHeader';

type Props = {
  sessionNumber: number;
  onComplete: () => void;
};

export default function SessionLoader({ sessionNumber, onComplete }: Props) {

  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 2000);
    return () => clearTimeout(timer);
  }, [sessionNumber, onComplete]);

  return sessionNumber !== null ? <SessionHeader sessionNumber={sessionNumber} /> : null;
}
