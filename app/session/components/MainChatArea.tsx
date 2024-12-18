'use client';
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import MessageItem from './MessageItem';
import TypingIndicator from './TypingIndicator';

interface MainChatAreaProps {
  messages: any[];
  loading: boolean;
  onNewSession: () => void;
}

const MainChatArea: React.FC<MainChatAreaProps> = ({ messages, loading, onNewSession }) => {
  // Create a reference to the chat container
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]); // Trigger this effect whenever messages change

  return (
    <div className="w-full max-w-5xl rounded-xl overflow-hidden flex flex-col flex-grow">
      <main
        className="p-4 space-y-4 overflow-y-auto flex-1 custom-scrollbar"
        style={{ maxHeight: 'calc(100vh - 160px)' }}
      >
        {messages.map((message, index) => (
          <MessageItem key={index} message={message} onNewSession={onNewSession} />
        ))}

        {/* Typing Indicator */}
        {loading && <TypingIndicator />}

        {/* This div will always be scrolled into view */}
        <div ref={chatEndRef} />
      </main>
    </div>
  );
};

export default MainChatArea;
