import React from 'react';
import MainChatArea from '../components/MainChatArea';

type Props = { messages: any; loading: boolean, onNewSession: () => void; };

export default function ChatContainer({ messages, loading, onNewSession }: Props) {
  return (
    <>
      <MainChatArea messages={messages} loading={loading} onNewSession={onNewSession} />
    </>
  );
}
