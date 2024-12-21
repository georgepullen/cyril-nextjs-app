import React from 'react';
import MainChatArea from './MainChatArea';
import InputFooter from './InputFooter';

type Props = { 
  messages: any; 
  loading: boolean; 
  onNewSession: () => void; 
  isTyping: any; 
  input: string; 
  setInput: React.Dispatch<React.SetStateAction<string>>;
  onSend: (input: string) => void;
  disabled: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  setIsTyping: (typing: boolean) => void;
};

export default function ChatContainer({ 
  messages, 
  loading, 
  onNewSession, 
  isTyping, 
  input, 
  setInput, 
  onSend, 
  disabled, 
  inputRef, 
  setIsTyping 
}: Props) {
  return (
    <div className="flex flex-col h-dvh w-full max-w-5xl px-2 sm:px-4 pt-4 sm:pb-0 pb-4">
      <div className="flex-grow overflow-hidden">
        <MainChatArea messages={messages} loading={loading} onNewSession={onNewSession} isTyping={isTyping} />
      </div>
      <InputFooter
        onSend={onSend}
        input={input}
        setInput={setInput}
        disabled={disabled}
        inputRef={inputRef}
        setIsTyping={setIsTyping}
      />
    </div>
  );
}
