import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Offline from './Offline';
import SendOtp from './SendOtp';
import VerifyOtp from './VerifyOtp';

const AccessSection = () => {
  const { signInWithOtp, verifyOtp, email: contextEmail } = useAuth();
  const [email, setEmail] = useState<string>(contextEmail || "");
  const [otp, setOtp] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_STATUS_API!);
        const data = await response.json();
        setIsOnline(data.status === "online");
      } catch (error) {
        console.error(error);
        setIsOnline(false);
      }
    };

    checkServerStatus();
    const interval = setInterval(checkServerStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="access" className="min-h-screen relative overflow-hidden flex items-center justify-center px-4">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(190,149,255,0.03)_1px,transparent_1px),linear-gradient(0deg,rgba(190,149,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(190,149,255,0.1)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,124,0,0.05)_0%,transparent_60%)]" />
      </div>

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-light tracking-wider">
                Cyril
                <br />
                <span className="bg-gradient-to-r from-[#BE95FF] to-[#FF7C00] text-transparent bg-clip-text">
                  Access Portal
                </span>
              </h2>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              <p className="text-gray-300 text-lg leading-relaxed">
                Cyril is currently in an open testing phase with occasional periods of availability.
              </p>
              
              <div className="flex flex-col space-y-2">
                <div className="text-sm text-[#BE95FF]">Direct inquiries</div>
                <div className="font-mono text-gray-400">george@cyril.guru</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <AnimatePresence mode="wait">
            {!isOnline ? (
                <Offline />
            ) : (
              <AnimatePresence mode="wait">
                {!isOtpSent ? (
                  <SendOtp setIsOtpSent={setIsOtpSent} signInWithOtp={signInWithOtp} setMessage={setMessage} setEmail={setEmail} email={email} />
                ) : (
                  <VerifyOtp setMessage={setMessage} router={router} verifyOtp={verifyOtp} email={email} setOtp={setOtp} otp={otp} />
                )}
              </AnimatePresence>
            )}
          </AnimatePresence>

          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-sm text-center text-[#BE95FF]"
            >
              {message}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default AccessSection;