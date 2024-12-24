"use client";

import { useState, useEffect } from "react";
import BackgroundWrapper from "./BackgroundWrapper";
import LogoAndTitle from "./LogoAndTitle";
import { motion } from 'framer-motion';
import CopyrightFooter from "./CopyrightFooter";


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
            } catch (error) {
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
                    <div className="flex items-center justify-center w-full max-w-lg h-dvh">
                        <div className="mx-auto w-full sm:pl-0 pl-8">
                            <LogoAndTitle />
                            <div className="pt-6"></div>
                            <motion.h2
                                className="font-semibold text-left 2xl:text-3xl sm:text-2xl text-xl w-full"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                            >
                                Cyril is <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700">offline</span> at the moment.<br />Please try again later.
                            </motion.h2>
                        </div>
                    </div>
                    <div className="w-full max-w-lg">
                        <CopyrightFooter />
                    </div>
                </BackgroundWrapper>
            </>
        );
    }

    return <>{children}</>;
}