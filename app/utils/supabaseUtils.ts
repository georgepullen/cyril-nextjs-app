import { supabase } from './supabaseClient';

export const getSession = async (
  email: string
): Promise<{ id: string | null; session_number: number | null }> => {
  if (!email) {
    return { id: null, session_number: null };
  }
  
  const upsertResponse = await supabase
    .from('sessions')
    .upsert(
      {
        user_email: email,
        session_number: 1,
      },
      {
        onConflict: 'user_email,session_number',
      }
    )
    .select()
    .single();

  if (upsertResponse.error) {
    console.error(
      `Error upserting session for email: ${email}. Details:`,
      upsertResponse.error
    );
    throw upsertResponse.error;
  }

  const { data, error } = await supabase
    .from('sessions')
    .select('id, session_number')
    .eq('user_email', email)
    .order('session_number', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error(`Error fetching session for email: ${email}. Details:`, error);
    throw error;
  }

  return { id: data?.id, session_number: data?.session_number };
};

export const getMessagesForSession = async (sessionId: string) => {
  if (!sessionId) {
    return [];
  }
  
  const { data, error } = await supabase
    .from('messages')
    .select(`
      id, 
      role, 
      content, 
      created_at
    `)
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error(`Error fetching messages for session ID: ${sessionId}. Details:`, error);
    return [];
  }

  return data.map((message: any) => ({
    id: message.id,
    role: message.role,
    content: message.content,
    created_at: message.created_at
  }));
};

export const insertMessage = async ({
  sessionId,
  role,
  content,
  email
}: {
  sessionId: string;
  role: 'user' | 'ai' | 'system';
  content: string;
  email: string
}) => {
  if (!email || !sessionId) {
    return null;
  }
  
  const { data, error } = await supabase
    .from('messages')
    .insert([
      {
        session_id: sessionId,
        role,
        content,
        email,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error(
      `Error inserting message for session ID: ${sessionId}, Role: ${role}, Email: ${email}. Content: ${content}. Details:`,
      error
    );
    return null;
  }

  return data;
};

export const incrementSession = async (email: string) => {
  if (!email) {
    return null;
  }

  const { data: lastSession, error: lastSessionError } = await supabase
    .from('sessions')
    .select('id, session_number')
    .eq('user_email', email)
    .order('session_number', { ascending: false })
    .limit(1)
    .single();

  if (lastSessionError) {
    console.error(`Error fetching last session for email: ${email}. Details:`, lastSessionError);
    return null;
  }

  if (lastSession) {
    const { error: updateError } = await supabase
      .from('sessions')
      .update({ finished_at: new Date().toISOString() })
      .eq('id', lastSession.id);

    if (updateError) {
      console.error(`Error updating finished_at for session ID: ${lastSession.id}. Details:`, updateError);
      return null;
    }
  }

  const newSessionNumber = (lastSession?.session_number || 0) + 1;

  const { data, error } = await supabase
    .from('sessions')
    .insert([
      {
        user_email: email,
        session_number: newSessionNumber,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error(`Error creating new session for email: ${email}. New Session Number: ${newSessionNumber}. Details:`, error);
    return null;
  }

  return data;
};

export const getSessionHistory = async (email: string) => {
  if (!email) {
    return [];
  }

  const { data, error } = await supabase
    .from('sessions')
    .select('id, session_number, created_at, finished_at')
    .eq('user_email', email)
    .order('session_number', { ascending: true });

  if (error) {
    console.error(`Error fetching session history for email: ${email}. Details:`, error);
    return [];
  }

  return data.map((session: any) => ({
    session_id: session.id,
    session_number: session.session_number,
    created_at: session.created_at,
    finished_at: session.finished_at,
  }));
};

export const fetchUserSessionsAndMessages = async (
  email: string
): Promise<UserSessionsAndMessages | null> => {
  if (!email) {
    return null;
  }


  const sessionHistory = await getSessionHistory(email);

  if (!sessionHistory.length) {
    console.error(`No sessions found for user with email: ${email}`);
    return null;
  }

  const latestSession = sessionHistory[sessionHistory.length - 1];
  const messages = await getMessagesForSession(latestSession.session_id);

  return {
    sessionHistory,
    latestMessages: messages,
  };
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
    created_at: string;
  }[];
};