import { useState, useEffect } from 'react';
import { getSession, getMessagesForSession, incrementSession } from '../utils/supabaseUtils';

export const useSession = (email: any) => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionNumber, setSessionNumber] = useState<number | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function initializeSession() {
      try {
        setError(null);
        const { id, session_number } = await getSession(email);
        if (!id) return null;

        setSessionId(id);
        setSessionNumber(session_number);

        const sessionMessages = await getMessagesForSession(id);
        setMessages(sessionMessages);
      } catch (error) {
        console.error('Error initializing session:', error);
        setError('Failed to initialize session.');
      }
    }

    initializeSession();
  }, [email, sessionId]);

  const incrementSessionId = async () => {
    try {
      setError(null);
      const updatedSession = await incrementSession(email);
      if (!updatedSession || !updatedSession.id) throw new Error('Failed to increment session.');
      setSessionId(updatedSession.id);
      setMessages([]);
      return updatedSession.id;
    } catch (error) {
      console.error('Error incrementing session:', error);
      setError('Failed to start a new session. Please try again later.');
      return null;
    }
  };

  return { sessionId, sessionNumber, messages, setMessages, error, setError, incrementSessionId };
};
