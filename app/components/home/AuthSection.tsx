import React, { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, Activity } from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';

const AuthSection = () => {
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

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setMessage("");
    try {
      await signInWithOtp(email);
      setIsOtpSent(true);
      setMessage("Access code sent");
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  const handleVerifyOtp = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setMessage("");
    try {
      await verifyOtp(email, otp);
      router.push("/session");
    } catch (error: any) {
      setMessage(error.message);
    }
  };

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

              {/* New Status Indicator Position */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full rounded-xl backdrop-blur-sm border border-[#BE95FF]/10 bg-[#0D0D15]/80 overflow-hidden"
              >
                <motion.div 
                  className="w-full"
                  animate={{
                    backgroundColor: isOnline ? 'rgba(190,149,255,0.03)' : 'rgba(255,0,0,0.03)',
                  }}
                >
                  <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <motion.div
                          animate={{
                            rotate: isOnline ? 360 : 0,
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        >
                          <Activity className={`w-5 h-5 ${isOnline ? 'text-[#BE95FF]' : 'text-red-400'}`} />
                        </motion.div>
                        <span className={`text-sm font-light tracking-wider ${
                          isOnline ? 'text-[#BE95FF]' : 'text-red-400'
                        }`}>
                          {isOnline ? 'SYSTEM ACTIVE' : 'SYSTEM OFFLINE'}
                        </span>
                      </div>
                      
                      <motion.div 
                        className="flex items-center space-x-2"
                        animate={{
                          opacity: isOnline ? [1, 0.5, 1] : 1
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className={`h-1 w-8 rounded-full ${
                              isOnline 
                                ? 'bg-gradient-to-r from-[#BE95FF] to-[#FF7C00]' 
                                : 'bg-red-500/50'
                            }`}
                            animate={{
                              opacity: isOnline ? [0.3, 1, 0.3] : 0.3
                            }}
                            transition={{
                              duration: 1.5,
                              delay: i * 0.2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
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
          <div className="p-8 rounded-2xl backdrop-blur-sm border border-[#BE95FF]/10 bg-[#0D0D15]/80">
            <AnimatePresence mode="wait">
              {!isOtpSent ? (
                <motion.div
                  key="request"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <h3 className="text-2xl font-light">Authentication</h3>
                    <p className="text-sm text-gray-400">Enter your email to receive a six digit code</p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="relative group">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-transparent border-b border-[#BE95FF]/20 focus:border-[#FF7C00] transition-colors outline-none text-lg"
                        placeholder="Email address"
                        disabled={!isOnline}
                      />
                      <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={!isOnline}
                      className="w-full py-3 bg-[#BE95FF]/10 hover:bg-[#BE95FF]/20 border border-[#BE95FF]/20 rounded-lg text-[#BE95FF] font-light tracking-wider flex items-center justify-center space-x-2 group transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: isOnline ? 1.01 : 1 }}
                      whileTap={{ scale: isOnline ? 0.99 : 1 }}
                    >
                      <span>Send Code</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="verify"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <h3 className="text-2xl font-light">Verify Access</h3>
                    <p className="text-sm text-gray-400">Enter the code sent to your email</p>
                  </div>

                  <form onSubmit={handleVerifyOtp} className="space-y-6">
                    <div className="relative">
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full px-4 py-3 bg-transparent border-b border-[#BE95FF]/20 focus:border-[#FF7C00] transition-colors outline-none text-lg tracking-[0.5em] text-center"
                        placeholder="●●●●●●"
                        maxLength={6}
                        disabled={!isOnline}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={!isOnline}
                      className="w-full py-3 bg-[#BE95FF]/10 hover:bg-[#BE95FF]/20 border border-[#BE95FF]/20 rounded-lg text-[#BE95FF] font-light tracking-wider flex items-center justify-center space-x-2 group transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: isOnline ? 1.01 : 1 }}
                      whileTap={{ scale: isOnline ? 0.99 : 1 }}
                    >
                      <span>Verify Code</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </form>
                </motion.div>
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
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AuthSection;