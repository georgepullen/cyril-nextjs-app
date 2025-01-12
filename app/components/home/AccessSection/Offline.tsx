import { motion } from 'framer-motion';
import { Power } from 'lucide-react';

const Offline = () => {
    return (
        <motion.div
                key="offline-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-8 rounded-2xl backdrop-blur-sm border border-red-500/10 bg-[#0D0D15]/80 relative overflow-hidden"
              >
                <div className="relative z-10 space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Power className="w-6 h-6 text-red-400" />
                      </motion.div>
                      <h3 className="text-2xl font-light text-red-400">System Offline</h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed">
                      You cannot test Cyril at the moment. Please try again tomorrow.
                    </p>
                  </div>

                  <div className="pt-4">
                    <motion.div
                      className="w-full h-1 bg-red-500/20 rounded-full overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.div
                        className="h-full bg-red-400"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                          duration: 30,
                          ease: "linear",
                          repeat: Infinity,
                        }}
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent"
                    animate={{
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </motion.div>
    )
}

export default Offline