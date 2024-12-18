"use client"
import { formatDistanceToNow, format } from 'date-fns';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { fetchUserSessionsAndMessages } from '../utils/supabaseUtils';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import BackgroundWrapper from '../components/BackgroundWrapper';
import LogoAndTitle from '../components/LogoAndTitle';
import Image from 'next/image';

export default withPageAuthRequired(function Reflect({ user }: { user: any }) {
  const [sessionHistory, setSessionHistory] = useState<any[]>([]);

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const data = await fetchUserSessionsAndMessages(user.email);

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
  }, [user.email]);

  return (
    <>
      <BackgroundWrapper>
        <div className="sm:p-16 w-full h-dvh overflow-scroll">
          <div className="w-full max-w-4xl sm:p-0 p-8 sm:h-auto h-full flex items-start flex-col justify-center">
            <LogoAndTitle />
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="font-semibold text-left 2xl:text-3xl sm:text-2xl text-xl mt-8"
            >
              Welcome, {user.name}.
            </motion.h2>
            <>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.2 }}
                className="mt-4"
              >
                You have completed <span className="font-bold leading-none text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700 font-extrabold">{sessionHistory.length}</span> {sessionHistory.length === 1 ? 'session' : 'sessions'}.
              </motion.h3>
              <a href="/session">
                <motion.button
                  whileHover={{ scale: 1.05, opacity: 1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative font-extrabold p-2 rounded-lg flex flex-row items-center sm:gap-2 gap-2 bg-slate-900 w-full justify-center py-2 border-blue-500 border-2 overflow-hidden max-w-max sm:mt-6 mt-4"
                >
                  <Image
                    src="/lab.svg"
                    alt="Enter"
                    width={40}
                    height={40}
                    className="h-8 w-10"
                  />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700">Enter Lab</span>
                </motion.button>
              </a>
            </>
          </div>
          <motion.div
            className="max-w-4xl w-full sm:mt-8 sm:h-[50%] h-full max-h-max sm:px-0 px-8 sm:mt-2 mt-8 sm:border-t-4 sm:border-gray-700 py-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessionHistory.map((session, index) => (
                <motion.div
                  key={session.session_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="p-6 rounded-lg shadow-md bg-black hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-lg font-bold text-white">
                    Session {session.session_number}
                  </h3>
                  <p className="text-sm text-gray-400 mt-2 font-bold">
                    {formatDistanceToNow(new Date(session.created_at), { addSuffix: true })}
                  </p>
                  <a
                    href={`/reflect/${session.session_id}`}
                    className="mt-4 inline-block text-blue-400 hover:text-blue-600 transition-colors text-sm"
                  >
                    <span className="font-bold leading-none text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700 font-bold">View Transcript &rarr;</span>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </BackgroundWrapper>
    </>
  );
});
