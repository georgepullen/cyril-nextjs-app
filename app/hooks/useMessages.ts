"use client"
import { useState } from 'react';
import { getLatestMessage, insertMessage } from '../utils/supabaseUtils';

export const useMessages = (sessionId: string | null, email: any) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [evolving, setEvolving] = useState(false);
  const [loading, setLoading] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_CHAT_API;

  const sendMessage = async (input: string) => {
    if (!input.trim() || !sessionId) return;

    const userMessage = {
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      await insertMessage({ sessionId, email: email, role: 'user', content: input });

      const response = await fetch(apiUrl as string, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });

      if (!response.ok) throw new Error('Failed to get a response from the server.');

      const data = await response.json();

      if (data.session_at_capacity) {
        const evolveMessage = {
          role: 'evolve',
          content: 'Your session with Cyril has concluded. Please click "evolve" to begin another.',
        };
        setEvolving(true);
        setMessages((prev) => [...prev, evolveMessage]);
      } else {
        const latestMessage = await getLatestMessage(sessionId, 'ai');
        const aiMessage = {
          role: 'ai',
          content: latestMessage.content,
        };
        await insertMessage({ sessionId, email: email, role: 'ai', content: latestMessage.content! });
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'error', content: (error as Error).message || 'An unknown error occurred', name: 'Error', picture: '/error.svg' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const resetMessages = () => setMessages([]);

  return { messages, setMessages, sendMessage, evolving, setEvolving, loading, setLoading, resetMessages };
};
