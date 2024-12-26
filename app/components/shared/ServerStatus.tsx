"use client";
import { useState, useEffect } from "react";
import BackgroundWrapper from "./BackgroundWrapper";
import { motion } from 'framer-motion';

export default function ServerStatus({ children }: { children: React.ReactNode }) {
    const [isOnline, setIsOnline] = useState<boolean | null>(null);

    useEffect(() => {
        const checkServerStatus = async () => {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_STATUS_API!);
                const data = await response.json();
                if (data.status === "online") {
                    setIsOnline(true);
                } else {
                    setIsOnline(false);
                }
            } catch (error: any) {
                console.error(error)
                setIsOnline(false);
            }
        };

        checkServerStatus();
    }, []);

    if (isOnline === null) {
        return <></>
    }

    if (!isOnline) {
        return (
            <>
                <BackgroundWrapper>
                    <div className="flex items-center justify-center w-full h-dvh md:px-[20%] px-[1%]">
                        <div className="h-[50%] rounded-lg flex flex-col items-start justify-center p-4">
                            <h1 className="font-extrabold text-white text-center w-full md:text-4xl text-2xl pb-6">Cyril is Offline</h1>
                            <motion.h2
                                className="md:text-lg text-sm text-center w-full text-gray-300"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                            >
                                Please contact <a href="mailto:george@cyril.guru" className="text-blue-400 hover:underline">george@cyril.guru</a> to arrange a period of guaranteed uptime.<br />
                                <a href="/" className="text-blue-400 text-center mt-auto hover:underline">&larr; Return to Home Page</a>
                            </motion.h2>
                        </div>
                    </div>
                </BackgroundWrapper>
            </>
        );
    }

    return <>{children}</>;
}