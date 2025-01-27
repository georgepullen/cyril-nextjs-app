"use client"
import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { supabase } from "../utils/supabaseClient";

interface AuthContextType {
  session: any | null;
  email: string | null;
  signInWithOtp: (email: string) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<any | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const fetchSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setSession(session);
          setEmail(session.user?.email || null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setEmail(session?.user?.email || null);
      setIsLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signInWithOtp = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
    if (error) throw error;
    setEmail(email);
  };

  const verifyOtp = async (email: string, otp: string) => {
    const { data: { session }, error } = await supabase.auth.verifyOtp({ email, token: otp, type: "email" });
    if (error) throw error;
    setSession(session);
    setEmail(session?.user?.email || email);
  };

  return (
    <AuthContext.Provider value={{ session, email, signInWithOtp, verifyOtp, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
