import { useSession } from './useSession';
import { useMessages } from './useMessages';
import { useInput } from './useInput';

export const useChat = (email: any, inputRef: React.RefObject<HTMLInputElement>) => {
  const { sessionId, sessionNumber, messages: storedMessages, setMessages, error, incrementSessionId } = useSession(email);
  const { messages, sendMessage, evolving, setEvolving, loading, resetMessages } = useMessages(sessionId, email);
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
    sessionNumber,
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
