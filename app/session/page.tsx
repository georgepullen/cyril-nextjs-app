"use client";
import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import ChatContainer from "../components/session/ChatContainer";
import BackgroundWrapper from "../components/shared/BackgroundWrapper";
import SessionLoader from "../components/session/SessionLoader";
import { useRouter } from "next/navigation";
import { useChat } from "../hooks/useChat";
import { supabase } from "../utils/supabaseClient";
import ServerStatus from "../components/shared/ServerStatus";

export default function Session() {
  const { email } = useAuth();
  const [isTyping, setIsTyping] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const { messages, sessionNumber, input, setInput, loading, evolving, setEvolving, handleSend, handleIncrementSession } =
    useChat(email, inputRef);

  const [showLogoAndTitle, setShowLogoAndTitle] = useState(true);
  const [triggerSessionLoader, setTriggerSessionLoader] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/login");
      }
    };

    checkSession();
  }, [router]);

  useEffect(() => {
    if (showLogoAndTitle === false) {
      setEvolving(false);
    }
  }, [showLogoAndTitle, setEvolving]);

  useEffect(() => {
    if (evolving && triggerSessionLoader) {
      setShowLogoAndTitle(true);
      setTriggerSessionLoader(false);
    }
  }, [evolving, triggerSessionLoader]);

  const handleNewSession = async () => {
    setTriggerSessionLoader(true);
    await handleIncrementSession();
  };

  return (
    <ServerStatus>
      <BackgroundWrapper>
        {showLogoAndTitle ? (
          <SessionLoader
            sessionNumber={sessionNumber as number}
            onComplete={() => setShowLogoAndTitle(false)}
          />
        ) : (
          <ChatContainer
            messages={messages}
            loading={loading && !evolving}
            onNewSession={handleNewSession}
            isTyping={isTyping}
            input={input}
            setInput={setInput}
            onSend={handleSend}
            disabled={loading || evolving || showLogoAndTitle}
            inputRef={inputRef}
            setIsTyping={setIsTyping}
          />
        )}
      </BackgroundWrapper>
    </ServerStatus>
  );
}
