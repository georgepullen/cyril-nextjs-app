import { motion } from 'framer-motion'
import { Activity, ArrowRight, Clock, Mail } from 'lucide-react'
import { FormEvent } from 'react';

interface SendOtpProps {
    setMessage: any,
    signInWithOtp: any,
    setIsOtpSent: any,
    email: any,
    setEmail: any
}

const SendOtp: React.FC<SendOtpProps> = ({ setMessage, signInWithOtp, setIsOtpSent, email, setEmail }) => {

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

    return (

        <motion.div
            key="status-and-auth"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6"
        >
            <motion.div
                key="online-status"
                className="p-6 rounded-2xl backdrop-blur-sm border border-[#BE95FF]/10 bg-[#0D0D15]/80 relative overflow-hidden"
            >
                <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <Activity className="w-5 h-5 text-[#BE95FF]" />
                            </motion.div>
                            <h3 className="text-lg font-light text-[#BE95FF]">System Online</h3>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>Active</span>
                        </div>
                    </div>

                    <motion.div
                        className="w-full h-0.5 bg-[#BE95FF]/20 rounded-full overflow-hidden"
                    >
                        <motion.div
                            className="h-full bg-[#BE95FF]/40"
                            animate={{
                                x: ["-100%", "100%"],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </motion.div>
                </div>
            </motion.div>

            <motion.div
                key="auth-form"
                className="p-8 rounded-2xl backdrop-blur-sm border border-[#BE95FF]/10 bg-[#0D0D15]/80"
            >
                <div className="space-y-2">
                    <h3 className="text-2xl font-light">Authentication</h3>
                    <p className="text-sm text-gray-400">Enter your email to receive a six digit code</p>
                </div>

                <form onSubmit={handleLogin} className="mt-8 space-y-6">
                    <div className="relative group">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-transparent border-b border-[#BE95FF]/20 focus:border-[#FF7C00] transition-colors outline-none text-lg"
                            placeholder="Email address"
                        />
                        <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <motion.button
                        type="submit"
                        className="w-full py-3 bg-[#BE95FF]/10 hover:bg-[#BE95FF]/20 border border-[#BE95FF]/20 rounded-lg text-[#BE95FF] font-light tracking-wider flex items-center justify-center space-x-2 group transition-all duration-300"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                    >
                        <span>Send Code</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </form>
            </motion.div>
        </motion.div>)
}

export default SendOtp