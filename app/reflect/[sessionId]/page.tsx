"use client";

import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
import { getMessagesForSession, getSessionHistory } from '../../utils/supabaseUtils';
import BackgroundWrapper from '@/app/components/BackgroundWrapper';
import Image from 'next/image';
import LogoAndTitle from '@/app/components/LogoAndTitle';
import { motion } from 'framer-motion';


function SessionPage({ params }: { params: { sessionId: string } }) {
  const { user } = useUser();
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
      }
    };

    fetchMessages();
  }, [sessionId]);

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const email = user?.email ?? '';
        const sessionHistory = await getSessionHistory(email);
    
        const session = sessionHistory.find(
          (session) => session.session_id === sessionId
        );
    
        if (session) {
          setSessionDetails({
            session_number: session.session_number,
            created_at: session.created_at,
          });
        } else {
          setError('Session details not found.');
        }
      } catch (err) {
        console.error('Error fetching session details:', err);
        setError('Failed to fetch session details.');
      }
    };    

    fetchSessionDetails();
  }, [sessionId]);

  const copyMessagesToClipboard = () => {
    const chatLogs = messages
      .map((msg) => `${msg.name}: ${msg.content}`)
      .join('\n');
    navigator.clipboard.writeText(chatLogs).then(() => {
      alert('Chat logs copied to clipboard.');
    });
  };

  if (!user) {
    return <></>;
  }

  return (
    <BackgroundWrapper overflow="scroll">
      <div className="w-full h-full">
        <div className="max-w-4xl 2xl:p-0 p-8 sm:pt-[5rem] mx-auto w-full sm:h-[15rem] flex flex-col items-start justify-center">
          <LogoAndTitle />
        </div>
        <div className="w-full sm:py-10 px-6 overflow-scroll">
          <div className="max-w-4xl mx-auto sm:p-6">
            <header className="flex justify-between items-center mb-6">
              <div className="flex flex-col">
                <motion.h1
                  className="sm:text-lg text-sm text-gray-200 font-bold"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  Session {sessionDetails.session_number}
                </motion.h1>
                <motion.h2
                  className="sm:text-lg text-gray-600 text-sm font-semibold"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                >
                  {user.name}
                </motion.h2>
              </div>
              <a href="/reflect" className="text-blue-600 font-bold sm:text-lg text-sm sm:max-w-max max-w-[5rem] hover:underline">
                &larr; Back to Sessions
              </a>
            </header>


            {loading ? (
              <></>
            ) : error ? (
              <p className="text-center text-red-600">{error}</p>
            ) : messages.length === 0 ? (
              <p className="text-center text-gray-600">No messages found for this session.</p>
            ) : (
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <button
                  onClick={copyMessagesToClipboard}
                  className="absolute top-0 right-0 p-4 opacity-60"
                  aria-label="Copy All"
                >
                  <Image
                    src="/copy.svg"
                    alt="Copy Icon"
                    width={18}
                    height={18}
                  />
                </button>

                <motion.div
                  className="overflow-auto mt-6 p-4 bg-black border-2 border-gray-800 rounded-lg text-sm"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      className={`mb-4 ${msg.role === 'ai'
                        ? 'text-blue-800 bg-blue-50 border-l-4 border-blue-500 pl-3'
                        : 'text-gray-800'
                        }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * messages.indexOf(msg) }}
                    >
                      <span className="font-mono font-semibold">{msg.name}:</span>{' '}
                      <span className="font-mono">{msg.content}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  );
}

export default withPageAuthRequired(SessionPage);
