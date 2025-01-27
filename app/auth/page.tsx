"use client"
import React, { useState, FormEvent, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Mail, Key, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';
import Image from 'next/image';
import Link from 'next/link';

const Access: React.FC = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const controls = useAnimation();
  const { signInWithOtp, verifyOtp, session, isLoading: isAuthLoading } = useAuth();

  useEffect(() => {
    if (!isAuthLoading && session) {
      router.push('/journal');
    }
  }, [session, router, isAuthLoading]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    try {
      await signInWithOtp(email);
      setIsOtpSent(true);
      setMessage("Access code sent to your email");
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    try {
      await verifyOtp(email, otp);
      setMessage("Access granted - redirecting...");
      await controls.start({
        scale: 0.95,
        opacity: 0,
        transition: { duration: 0.5 }
      });
      router.push("/journal");
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="h-screen flex flex-col bg-[#0D0D15] text-white font-mono">
      {/* Top Navigation Bar */}
      <div className="h-12 bg-[#1E1E2E] border-b border-purple-500/20 
                    flex items-center px-4">
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="relative w-6 h-6">
            <Image
              src="/logo.svg"
              alt="Cyrillectual Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-sm font-medium">cyril.guru</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-[#1E1E2E] border border-purple-500/20 rounded-lg overflow-hidden">
            {/* Card Header */}
            <div className="h-12 border-b border-purple-500/20 
                          flex items-center justify-between px-4">
              <span className="text-sm font-medium">
                {isOtpSent ? 'Enter Access Code' : 'Request Access'}
              </span>
            </div>

            {/* Card Content */}
            <div className="p-6">
              {message && (
                <div className="mb-6 p-3 rounded bg-purple-500/10 border border-purple-500/20 
                              text-sm text-purple-400">
                  {message}
                </div>
              )}

              {!isOtpSent ? (
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        className="w-full bg-[#0D0D15] border border-purple-500/20 rounded-lg py-2 px-10 
                                text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 
                                transition-colors disabled:opacity-50"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg 
                            py-2 px-4 flex items-center justify-center space-x-2 
                            transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <ArrowRight className="w-5 h-5" />
                        <span>Request Access Code</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Access Code</label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        disabled={isLoading}
                        className="w-full bg-[#0D0D15] border border-purple-500/20 rounded-lg py-2 px-10 
                                text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 
                                transition-colors disabled:opacity-50"
                        placeholder="Enter access code"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg 
                            py-2 px-4 flex items-center justify-center space-x-2 
                            transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <ArrowRight className="w-5 h-5" />
                        <span>Verify & Access</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  {isOtpSent ? (
                    <>
                      Didn&apos;t receive the code?{' '}
                      <button
                        onClick={() => handleLogin(new Event('submit') as any)}
                        className="text-purple-400 hover:text-purple-300 transition-colors"
                        disabled={isLoading}
                      >
                        Resend Code
                      </button>
                    </>
                  ) : (
                    <>
                      Need assistance?{' '}
                      <a
                        href="mailto:george@cyril.guru"
                        className="text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        Email george@cyril.guru
                      </a>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Access;