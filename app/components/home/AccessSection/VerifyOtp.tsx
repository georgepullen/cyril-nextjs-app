import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import React, { FormEvent } from 'react'

interface verifyOtpProps {
    setMessage: any,
    verifyOtp: any,
    email: any,
    setOtp: any,
    otp: any,
    router: any
}



const VerifyOtp: React.FC<verifyOtpProps> = ({ setMessage, router, verifyOtp, email, setOtp, otp }) => {


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
        <motion.div
            key="verify"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-8 rounded-2xl backdrop-blur-sm border border-[#BE95FF]/10 bg-[#0D0D15]/80"
        >
            <div className="space-y-2">
                <h3 className="text-2xl font-light">Verify Access</h3>
                <p className="text-sm text-gray-400">Enter the code sent to your email</p>
            </div>

            <form onSubmit={handleVerifyOtp} className="mt-8 space-y-6">
                <div className="relative">
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full px-4 py-3 bg-transparent border-b border-[#BE95FF]/20 focus:border-[#FF7C00] transition-colors outline-none text-lg tracking-[0.5em] text-center"
                        placeholder="●●●●●●"
                        maxLength={6}
                    />
                </div>

                <motion.button
                    type="submit"
                    className="w-full py-3 bg-[#BE95FF]/10 hover:bg-[#BE95FF]/20 border border-[#BE95FF]/20 rounded-lg text-[#BE95FF] font-light tracking-wider flex items-center justify-center space-x-2 group transition-all duration-300"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                >
                    <span>Verify Code</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
            </form>
        </motion.div>
    )
}

export default VerifyOtp