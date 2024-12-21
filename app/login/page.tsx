"use client";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation'
import BackgroundWrapper from "../components/shared/BackgroundWrapper";
import LogoAndTitle from "../components/shared/LogoAndTitle";

export default function Login() {
  const { signInWithOtp, verifyOtp, email: contextEmail } = useAuth();
  const [email, setEmail] = useState(contextEmail || "");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const router = useRouter()

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setMessage("");

    try {
      await signInWithOtp(email);
      setIsOtpSent(true);
      setMessage("OTP sent to your email.");
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  const handleVerifyOtp = async (e: any) => {
    e.preventDefault();
    setMessage("");

    try {
      await verifyOtp(email, otp);
      setMessage("OTP verified successfully! Session created.");
      router.push("/session")
    } catch (error: any) {
      setMessage(error.message);
      router.push("/")
    }
  };

  return (
    <>
      <BackgroundWrapper>
        <div className="flex md:flex-row w-full xl:px-16 md:px-8 flex-col h-dvh items-center justify-center">
          <div className="hidden md:h-dvh w-1/2 md:flex justify-center items-center">
          <div className="max-w-max mx-auto">
          <LogoAndTitle />
          </div>
          </div>
          <div className="md:h-dvh md:w-1/2 w-full md:px-0 px-4 flex items-center justify-center mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-md p-8 rounded-lg bg-slate-950 shadow-lg border border-gray-900 flex flex-col items-start"
            >
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="md:text-3xl text-xl font-bold text-center mb-6"
              >
                {isOtpSent ? "Verify OTP" : "Secure Login"}
              </motion.h1>

              {message && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center text-sm mb-4 text-green-400"
                >
                  {message}
                </motion.p>
              )}

              {!isOtpSent ? (
                <form onSubmit={handleLogin} className="space-y-4 w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <input
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-900 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-xl"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <button
                      type="submit"
                      className="w-full max-w-max px-3 py-1 bg-blue-900 hover:bg-blue-800 transition-colors rounded-md text-sm font-bold"
                    >
                      Proceed
                    </button>
                  </motion.div>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4 w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <button
                      type="submit"
                      className="w-full max-w-max px-3 py-1 bg-green-800 hover:bg-green-700 transition-colors rounded-md text-sm font-bold"
                    >
                      Verify OTP
                    </button>
                  </motion.div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </BackgroundWrapper>
    </>
  );
}
