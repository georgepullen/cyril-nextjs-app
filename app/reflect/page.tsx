"use client"
import { formatDistanceToNow } from 'date-fns';
import { fetchUserSessionsAndMessages } from '../utils/supabaseUtils';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import BackgroundWrapper from '../components/shared/BackgroundWrapper';
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from 'next/navigation';
import { supabase } from '../utils/supabaseClient';

export default function Reflect() {
  const [sessionHistory, setSessionHistory] = useState<any[]>([]);
  const { email } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push('/login');
      }
    };

    checkSession();
  }, [router]);

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const data = await fetchUserSessionsAndMessages(email as string);

        if (data) {
          setSessionHistory(data.sessionHistory);
        } else {
          setSessionHistory([]);
        }
      } catch (err) {
        console.error('Error loading sessions:', err);
      }
    };

    loadSessions();
  }, [email]);

  const sessionVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
  };

  return (
    <>
      <BackgroundWrapper>
        <div className="h-dvh p-4 w-full md:max-w-max">
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold">Reflection Room</h1>
            <p className="text-gray-200">
              {sessionHistory.length - 1 === -1 ? (
                <>
                  You have not started any sessions.{" "}
                  <a
                    href="/session"
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    Start a session
                  </a>.
                </>
              ) : (
                <>
                  You have{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700 font-bold">
                    {sessionHistory.length - 1}{" "}
                    {sessionHistory.length - 1 === 1 ? "session" : "sessions"}
                  </span>{" "}
                  to reflect on.
                </>
              )}
            </p>
          </motion.div>

          <div className="overflow-auto max-h-[calc(100vh-6rem)] pb-4 w-full">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1, delay:0.5 } },
              }}
            >
              {sessionHistory.map((session, index) => {
                const isLastSession = index === sessionHistory.length - 1;

                return (
                  <motion.a
                    key={index}
                    href={isLastSession ? '/session' : `/reflect/${session.session_id}`}
                    className="block"
                    variants={sessionVariant}
                  >
                    <motion.div
                      className={`p-4 bg-slate-900 rounded-lg opacity-80 shadow duration-300 ${isLastSession ? 'border border-blue-500' : ''}`}
                    >
                      <h3 className={`text-lg font-semibold ${isLastSession ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700' : 'text-white'}`}>
                        {isLastSession ? `Continue Session ${index + 1}` : `Session ${index + 1}`}
                      </h3>
                      <p className="text-sm text-gray-300">
                        {isLastSession ? `Started ${formatDistanceToNow(new Date(session.created_at), { addSuffix: true })}` : `Finished ${formatDistanceToNow(new Date(session.finished_at), { addSuffix: true })}`}
                      </p>
                    </motion.div>
                  </motion.a>
                );
              })}
            </motion.div>
          </div>
        </div>
      </BackgroundWrapper>
    </>
  );
}
