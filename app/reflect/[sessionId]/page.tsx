"use client";

import { useEffect, useState } from 'react';
import { getMessagesForSession, getSessionHistory } from '../../utils/supabaseUtils';
import BackgroundWrapper from '@/app/components/shared/BackgroundWrapper';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/utils/supabaseClient';


function ReflectOnSessionPage({ params }: { params: { sessionId: string } }) {
  const { session, email } = useAuth();

  const { sessionId } = params;
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionDetails, setSessionDetails] = useState<{
    session_number: number;
    created_at: string;
  }>({
    session_number: 0,
    created_at: ""
  });

  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      console.log("called");
      const { data } = await supabase.auth.getSession();
      console.log(data.session);
      if (!data.session) {
        router.push('/login');
      }
    };

    checkSession();
  }, [router]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessagesForSession(sessionId);
        if (data) setMessages(data);
        else setMessages([]);
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError('Failed to load messages for this session. Please try again later.');
      } finally {
        setLoading(false);
        console.log("Setting loading to false")
      }
    };

    fetchMessages();
  }, [sessionId]);

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const sessionHistory = await getSessionHistory(email as string);

        const session = sessionHistory.find(
          (session) => session.session_id === sessionId
        );

        if (session) {
          setError(null)
          setSessionDetails({
            session_number: session.session_number,
            created_at: session.created_at,
          });
        } else {
          setError('Session details not found.');
          console.log("i set error here")
        }
      } catch (err) {
        console.error('Error fetching session details:', err);
        setError('Failed to fetch session details.');
      }
    };

    fetchSessionDetails();
  }, [sessionId, session, email]);

  const copyMessagesToClipboard = () => {
    const chatLogs = messages
      .map((msg) => `${msg.name}: ${msg.content}`)
      .join('\n');
    navigator.clipboard.writeText(chatLogs).then(() => {
      alert('Chat logs copied to clipboard.');
    });
  };

  return (
    <>
      <BackgroundWrapper>
        <div className="h-dvh flex flex-col items-center p-4 md:p-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl shadow-md rounded-md p-6 space-y-4"
          >
            <h1 className="text-2xl font-bold text-white">Session {sessionDetails.session_number}</h1>

            <div className="flex justify-between items-center">
              <a href="/reflect" className="text-blue-500 hover:underline">&larr; Reflection Room</a>
              <button
                onClick={copyMessagesToClipboard}
                className="flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900"
              >
                <Image src="/copy.svg" alt="Copy" width={16} height={16} />
                <span className="text-gray-300">Copy Transcript</span>
              </button>
            </div>

            <div className="bg-slate-900 opacity-80 border border-slate-700 rounded-md p-4 overflow-auto">
              {loading ? (
                <p className="text-gray-500">Loading messages...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <div className="space-y-2">
                  {messages.map((msg, index) => (
                    <div key={index} className="text-sm font-mono">
                      <span className="font-bold">
                        {msg.role === 'ai' ? 'Cyril' : 'Human'}:
                      </span>{' '}
                      <span>{msg.content}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </BackgroundWrapper>
    </>
  );
}

export default ReflectOnSessionPage;
