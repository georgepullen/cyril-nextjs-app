import React, { useState, useEffect, FormEvent } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Mail, Key, Server, ArrowRight, Loader2, WifiOff, Lock, Shield } from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';

const Access: React.FC = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [message, setMessage] = useState('');
  const [isOnline, setIsOnline] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const controls = useAnimation();
  const { signInWithOtp, verifyOtp } = useAuth();

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
      router.push("/session");
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="gateway" className="relative min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-[#0D0D15] relative overflow-hidden">
        <div className="relative w-full h-full flex flex-col justify-center items-center p-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <h1 className="text-left text-4xl font-light tracking-wider mb-6">
              Welcome to
              <span className="block text-6xl mt-2 bg-gradient-to-r from-[#BE95FF] to-[#FF7C00] text-transparent bg-clip-text">
                Cyril Gateway
              </span>
            </h1>
            
            <div className="space-y-6 max-w-md mx-auto">
              {[
                { icon: Shield, text: "Passwordless Authentication" },
                { icon: Lock, text: "One-Time Passcode Verification" },
                { icon: Server, text: "Only Your Email is Stored" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 * (index + 1) }}
                  className="flex items-center space-x-4 text-gray-400"
                >
                  <item.icon className="w-6 h-6 text-[#BE95FF]" />
                  <span className="text-lg">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center py-20 px-4 bg-[#0D0D15]">
        <motion.div
          className="relative w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 rounded-2xl blur-xl bg-gradient-to-br from-[#BE95FF]/20 via-[#FF7C00]/20 to-[#BE95FF]/20 animate-pulse" />

          <motion.div
            className="relative backdrop-blur-sm border border-[#BE95FF]/10 rounded-2xl p-8 bg-[#0D0D15]/90"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <div className="text-center mb-8">
              <motion.div
                className="inline-block mb-4"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <div className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-2">
                  Secure Access Point
                </div>
                <h2 className="text-3xl font-light tracking-wider">
                  Cyril
                  <span className="bg-gradient-to-r from-[#BE95FF] to-[#FF7C00] text-transparent bg-clip-text">
                    {' '}Gateway
                  </span>
                </h2>
              </motion.div>
            </div>

            <motion.div
              className={`mb-6 flex flex-col items-center justify-center space-y-2 p-4 rounded-lg ${
                isOnline
                  ? 'bg-green-500/10 border border-green-500/20'
                  : 'bg-red-500/10 border border-red-500/20'
              }`}
              initial={false}
              animate={{
                scale: isOnline ? 1 : [1, 1.02, 1],
                transition: { duration: 2, repeat: !isOnline ? Infinity : 0 }
              }}
            >
              {isOnline ? (
                <>
                  <Server className="w-6 h-6 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">Systems Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-6 h-6 text-red-400" />
                  <span className="text-red-400 text-sm font-medium">Systems Offline</span>
                  <span className="text-red-400/80 text-xs text-center">
                    Server is currently unavailable. Please try again later, or ask for a designated test session.
                  </span>
                </>
              )}
            </motion.div>

            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-lg bg-[#BE95FF]/10 border border-[#BE95FF]/20 text-center text-sm text-[#BE95FF]"
              >
                {message}
              </motion.div>
            )}

            {!isOtpSent ? (
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                      isOnline ? 'text-gray-400' : 'text-gray-600'
                    }`} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={!isOnline || isLoading}
                      className={`w-full bg-[#1A1A2E] border rounded-lg py-3 px-10 text-white placeholder-gray-500 focus:outline-none transition-colors disabled:opacity-50 ${
                        isOnline
                          ? 'border-[#BE95FF]/20 focus:border-[#BE95FF]/50'
                          : 'border-red-500/20'
                      }`}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={!isOnline || isLoading}
                  className={`w-full text-white rounded-lg py-3 px-4 flex items-center justify-center space-x-2 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed ${
                    isOnline
                      ? 'bg-gradient-to-r from-[#BE95FF] to-[#FF7C00] hover:opacity-90'
                      : 'bg-gray-600'
                  }`}
                  whileHover={isOnline ? { scale: 1.02 } : {}}
                  whileTap={isOnline ? { scale: 0.98 } : {}}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      <span>Request Access Code</span>
                    </>
                  )}
                </motion.button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Access Code</label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      disabled={!isOnline || isLoading}
                      className="w-full bg-[#1A1A2E] border border-[#BE95FF]/20 rounded-lg py-3 px-10 text-white placeholder-gray-500 focus:outline-none focus:border-[#BE95FF]/50 transition-colors disabled:opacity-50"
                      placeholder="Enter access code"
                      required
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={!isOnline || isLoading}
                  className="w-full bg-gradient-to-r from-[#BE95FF] to-[#FF7C00] text-white rounded-lg py-3 px-4 flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <ArrowRight className="w-5 h-5" />
                      <span>Verify & Access</span>
                    </>
                  )}
                </motion.button>
              </form>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                {isOtpSent ? 'Didn\'t receive the code?' : 'Need assistance?'}
                {isOtpSent ? (
                  <button
                    onClick={() => handleLogin(new Event('submit') as any)}
                    className="ml-2 text-[#BE95FF] hover:text-[#FF7C00] transition-colors"
                    disabled={!isOnline}
                  >
                    Resend Code
                  </button>
                ) : (
                  <a
                    href="mailto:george@cyril.guru"
                    className="ml-2 text-[#BE95FF] hover:text-[#FF7C00] transition-colors"
                  >
                    Email george@cyril.guru
                  </a>
                )}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Access;