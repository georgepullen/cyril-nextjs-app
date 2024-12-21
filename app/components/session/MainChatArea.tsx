'use client';
import React, { useEffect, useRef } from 'react';
import MessageItem from './MessageItem';
import TypingIndicator from './TypingIndicator';

interface MainChatAreaProps {
  messages: any[];
  loading: boolean;
  onNewSession: () => void;
  isTyping: boolean;
}

const MainChatArea: React.FC<MainChatAreaProps> = ({ messages, loading, onNewSession, isTyping }) => {
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isTyping && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  return (
    <div className="w-full h-full overflow-y-auto">
      <main className="space-y-4 flex-1 px-1">
        {messages.map((message, index) => (
          <MessageItem key={index} message={message} onNewSession={onNewSession} />
        ))}
        {loading && <TypingIndicator />}
        <div ref={chatEndRef} />
      </main>
    </div>
  );
};

export default MainChatArea;
