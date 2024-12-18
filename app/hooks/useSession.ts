// hooks/useSession.ts
import { useState, useEffect } from 'react';
import { ensureUserExists, getSessionId, getMessagesForSession, incrementSession } from '../utils/supabaseUtils';

export const useSession = (user: any) => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function initializeSession() {
      try {
        setError(null);
        const userData = await ensureUserExists(user.email, user.name, user.picture);
        if (!userData) throw new Error('Failed to ensure user exists.');

        const id = await getSessionId(user.email, user.name, user.picture);
        if (!id) throw new Error('No session ID found for the user.');
        setSessionId(id);

        const sessionMessages = await getMessagesForSession(id);
        setMessages(sessionMessages);
      } catch (error) {
        console.error('Error initializing session:', error);
        setError('Failed to initialize session. Please try again later.');
      }
    }

    initializeSession();
  }, [user.email]);

  const incrementSessionId = async () => {
    try {
      setError(null);
      const updatedUser = await incrementSession(user.email);
      if (!updatedUser || !updatedUser.session_id) throw new Error('Failed to increment session.');
      setSessionId(updatedUser.session_id);
      setMessages([]);
      return updatedUser.session_id;
    } catch (error) {
      console.error('Error incrementing session:', error);
      setError('Failed to start a new session. Please try again later.');
      return null;
    }
  };

  return { sessionId, messages, setMessages, error, setError, incrementSessionId };
};
