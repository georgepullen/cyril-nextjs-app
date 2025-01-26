import { supabase } from './supabaseClient';

export interface Branch {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
}

export interface Memory {
  id: string;
  branch_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export const createBranch = async (title: string, userId: string): Promise<Branch | null> => {
  console.log("Creating branch:", title, userId);
  const { data, error } = await supabase
    .from('branches')
    .insert([{ title, user_id: userId }])
    .select('*')
    .single();
  console.log("Branch created:", data);
  if (error || !data) {
    console.error('Error creating branch:', error);
    return null;
  }
  return data;
};

export const getBranches = async (userId: string): Promise<Branch[]> => {
  const { data, error } = await supabase
    .from('branches')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching branches:', error);
    return [];
  }
  return data;
};

export const getBranchById = async (branchId: string): Promise<Branch | null> => {
  const { data, error } = await supabase
    .from('branches')
    .select('*')
    .eq('id', branchId)
    .single();

  if (error) {
    console.error('Error fetching branch:', error);
    return null;
  }

  return data;
};

export const getMemoriesForBranch = async (branchId: string): Promise<Memory[]> => {
  const { data, error } = await supabase
    .from('memories')
    .select('*')
    .eq('branch_id', branchId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching memories:', error);
    return [];
  }

  return data;
};

export const createMemory = async (branchId: string, content: string): Promise<Memory | null> => {
  const { data, error } = await supabase
    .from('memories')
    .insert([{ branch_id: branchId, content }])
    .select('*')
    .single();

  if (error) {
    console.error('Error creating memory:', error);
    return null;
  }

  return data;
};

export const updateMemory = async (memoryId: string, content: string): Promise<Memory | null> => {
  const { data, error } = await supabase
    .from('memories')
    .update({ 
      content,
      updated_at: new Date().toISOString()
    })
    .eq('id', memoryId)
    .select('*')
    .single();

  if (error) {
    console.error('Error updating memory:', error);
    return null;
  }

  return data;
};

export const deleteMemory = async (memoryId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('memories')
    .delete()
    .eq('id', memoryId);

  if (error) {
    console.error('Error deleting memory:', error);
    return false;
  }

  return true;
};

export const deleteBranch = async (branchId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('branches')
    .delete()
    .eq('id', branchId);

  if (error) {
    console.error('Error deleting branch:', error);
    return false;
  }

  return true;
};