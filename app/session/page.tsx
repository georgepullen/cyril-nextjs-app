'use client';
import React, { useState, useRef, useEffect } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useChat } from '../hooks/useChat';
import { getSessionNumber } from '../utils/supabaseUtils';

import InputFooter from './components/InputFooter';
import ChatContainer from './components/ChatContainer';
import BackgroundWrapper from '../components/BackgroundWrapper';
import SessionLoader from './components/SessionLoader';

export default withPageAuthRequired(function Session({ user }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { messages, input, setInput, loading, evolving, setEvolving, handleSend, handleIncrementSession } = useChat(user, inputRef);
  
  const [showLogoAndTitle, setShowLogoAndTitle] = useState(true);
  const [triggerSessionLoader, setTriggerSessionLoader] = useState(false);

  const fetchSessionNumber = async (): Promise<number | null> => {
    const number = await getSessionNumber(user.email as string, user.name as string, user.picture as string);
    return number !== null ? Number(number) : null;
  };
  
  useEffect(() => {
    if (showLogoAndTitle === false) {
      setEvolving(false);
    }
  }, [showLogoAndTitle]);

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
    <BackgroundWrapper>
      {showLogoAndTitle ? (
        <SessionLoader
          user={{
            email: user.email ?? '',
            name: user.name ?? '',
            picture: user.picture ?? '',
          }}
          fetchSessionNumber={fetchSessionNumber}
          onComplete={() => setShowLogoAndTitle(false)}
        />
      ) : (
        <ChatContainer
          messages={messages}
          loading={loading && !evolving}
          onNewSession={handleNewSession}
        />
      )}
      <InputFooter
        onSend={handleSend}
        input={input}
        setInput={setInput}
        disabled={loading || evolving || showLogoAndTitle}
        inputRef={inputRef}
      />
    </BackgroundWrapper>
  );
});
