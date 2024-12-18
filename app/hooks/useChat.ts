// hooks/useChat.ts
import { useSession } from './useSession';
import { useMessages } from './useMessages';
import { useInput } from './useInput';

export const useChat = (user: any, inputRef: React.RefObject<HTMLInputElement>) => {
  const { sessionId, messages: storedMessages, setMessages, error, setError, incrementSessionId } = useSession(user);
  const { messages, sendMessage, evolving, setEvolving, loading, resetMessages } = useMessages(sessionId, user);
  const { input, setInput, resetInput } = useInput(inputRef);

  const allMessages = [...storedMessages, ...messages];

  const handleSend = (input: string) => {
    if (!input.trim()) return;
    sendMessage(input);
    resetInput();
  };

  const handleIncrementSession = async () => {
    const newSessionId = await incrementSessionId();
    if (newSessionId) {
      resetMessages();
      setMessages([]);
    }
  };

  return {
    messages: allMessages,
    input,
    setInput,
    inputRef,
    loading,
    evolving,
    setEvolving,
    handleSend,
    handleIncrementSession,
    error,
  };
};
