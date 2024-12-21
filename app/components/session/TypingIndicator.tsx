'use client';
import React from 'react';
import MessageItem from './MessageItem';

const TypingIndicator: React.FC = () => {
  const exampleMessage = {
    role: 'typing' as const,
    content: '',
  };

  const handleNewSession = () => {
    console.log('New session started');
  };

  return (
    <MessageItem message={exampleMessage} onNewSession={handleNewSession} />
  );
};

export default TypingIndicator;
