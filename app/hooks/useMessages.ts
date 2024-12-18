"use client"
import { useState } from 'react';
import { insertMessage } from '../utils/supabaseUtils';

export const useMessages = (sessionId: string | null, user: any) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [evolving, setEvolving] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (input: string) => {
    if (!input.trim() || !sessionId) return;

    const userMessage = {
      role: 'user',
      content: input,
      name: user.name,
      picture: user.picture,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      await insertMessage({ sessionId, email: user.email, role: 'user', content: input });

      
      const response = await fetch('http://localhost:5000/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input, sessionId }),
      });

      if (!response.ok) throw new Error('Failed to get a response from the server.');

      const data = await response.json();
      

      if (data.session_at_capacity) {
        console.log("This is called now")
        const evolveMessage = {
          role: 'evolve',
          content: 'Ready for Cyril to evolve?',
          name: 'Session Concluded',
          picture: '/logo.svg',
        };
        setEvolving(true);
        setMessages((prev) => [...prev, evolveMessage]);
      } else {
        const aiMessage = {
          role: 'ai',
          content: data.reply,
          name: 'CyrilAI',
          picture: '/logo.svg',
        };
        await insertMessage({ sessionId, email: user.email, role: 'ai', content: data.reply });
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
