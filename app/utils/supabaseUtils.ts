import { supabase } from './supabaseClient';
import { v4 as uuidv4 } from 'uuid'; // Use UUID generation for session_id

export const ensureUserExists = async (
  email: string,
  name: string,
  picture: string
) => {
  const { data, error } = await supabase
    .from('users')
    .upsert(
      { email, name, picture },
      { onConflict: 'email' }
    )
    .select()
    .single();

  if (error) {
    console.error('Error ensuring user exists:', error);
    return null;
  }

  return data;
};

export const getSessionId = async (email: string, name: string, picture: string): Promise<string | null> => {
  const user = ensureUserExists(email, name, picture);

  const { data, error } = await supabase
    .from('users')
    .select('session_id')
    .eq('email', email)
    .single();

  if (error) {
    console.error('Error fetching session ID:', error);
    return null;
  }

  return data?.session_id || null;
};

export const getSessionNumber = async (email: string, name: string, picture: string): Promise<string | null> => {
  const user = ensureUserExists(email, name, picture);

  const { data, error } = await supabase
    .from('users')
    .select('session_number')
    .eq('email', email)
    .single();

  if (error) {
    console.error('Error fetching session number:', error);
    return null;
  }

  return data?.session_number || null;
};

export const getMessagesForSession = async (sessionId: string) => {
  const { data: sessionData, error: sessionError } = await supabase
    .from('sessions')
    .select('message_id')
    .eq('session_id', sessionId);

  if (sessionError) {
    console.error('Error fetching messages for session:', sessionError);
    return [];
  }

  const messageIds = sessionData?.map((session: any) => session.message_id) || [];

  if (messageIds.length === 0) {
    console.warn('No messages found for the session.');
    return [];
  }

  const { data: messagesData, error: messagesError } = await supabase
    .from('messages')
    .select(`
    id,
    role,
    content,
    created_at,
    users!messages_email_fkey (name, picture)
  `)
    .order('created_at', { ascending: true });


  if (messagesError) {
    console.error('Error fetching messages:', messagesError);
    return [];
  }

  console.log("MESSAGES DATA:", messagesData)

  return messagesData.map((message: any) => ({
    id: message.id,
    role: message.role,
    content: message.content,
    name: message.users?.name || null,
    picture: message.users?.picture || null,
  }));
};

export const insertMessage = async ({
  sessionId,
  role,
  content,
  email, // Email is now the foreign key to link to the users table
}: {
  sessionId: string;
  role: 'user' | 'ai';
  content: string;
  email: string;
}) => {
  // Step 1: Insert the message into the messages table
  const { data: messageData, error: messageError } = await supabase
    .from('messages')
    .insert([
      {
        role,
        content,
        email, // Only store email as the FK to users
      },
    ])
    .select()
    .single(); // Return the inserted message

  if (messageError) {
    console.error('Error inserting message into Supabase:', messageError);
    return null;
  }

  const messageId = messageData?.id;

  if (!messageId) {
    console.error('Message ID not returned after insertion.');
    return null;
  }

  // Step 2: Add the session-to-message mapping in the sessions table
  const { error: sessionError } = await supabase
    .from('sessions')
    .insert([
      {
        session_id: sessionId,
        message_id: messageId,
      },
    ]);

  if (sessionError) {
    console.error('Error linking message to session in Supabase:', sessionError);
    return null;
  }

  return messageData;
};

export const incrementSession = async (email: string) => {
  const newSessionId = uuidv4();

  // Fetch the current session number for the user
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('session_number, session_id')
    .eq('email', email)
    .single();

  if (userError) {
    console.error('Error fetching user data:', userError);
    return null;
  }

  const currentSessionNumber = userData?.session_number || 0;
  const currentSessionId = userData?.session_id
  const incrementedSessionNumber = currentSessionNumber === 0 ? 1 : currentSessionNumber + 1;

  // Update the user's session_id and session_number
  const { data: updatedUser, error: updateError } = await supabase
    .from('users')
    .update({
      session_id: newSessionId,
      session_number: incrementedSessionNumber,
    })
    .eq('email', email)
    .select()
    .single();

  if (updateError) {
    console.error('Error updating user record:', updateError);
    return null;
  }

  // Insert the new session into the session_history table
  const { error: sessionError } = await supabase
    .from('session_history')
    .insert([
      {
        user_email: email,
        session_id: currentSessionId,
        session_number: currentSessionNumber,
      },
    ]);

  if (sessionError) {
    console.error('Error logging session into session_history:', sessionError);
    return null;
  }

  return updatedUser;
};

export const getSessionHistory = async (email: string) => {
  const { data, error } = await supabase
    .from('session_history')
    .select('session_id, session_number, created_at')
    .eq('user_email', email)
    .order('session_number', { ascending: true });

  if (error) {
    console.error('Error fetching session history:', error);
    return [];
  }

  return data;
};

export type UserSessionsAndMessages = {
  sessionHistory: {
    session_id: string;
    session_number: number;
    created_at: string;
  }[];
  latestMessages: {
    id: string;
    role: string;
    content: string;
    name: string;
    picture: string;
  }[];
};

export const fetchUserSessionsAndMessages = async (
  email: string
): Promise<UserSessionsAndMessages | null> => {
  const sessionHistory = await getSessionHistory(email);

  if (!sessionHistory.length) {
    console.log('No sessions found for user.');
    return null;
  }

  const latestSession = sessionHistory[sessionHistory.length - 1];
  const messages = await getMessagesForSession(latestSession.session_id);

  return {
    sessionHistory,
    latestMessages: messages,
  };
};

