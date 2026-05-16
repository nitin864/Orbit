import { supabase } from '../lib/supabse';

export const fetchUserData = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.log('Error fetching user data:', error.message);
      return null;
    }

    return data;
  } catch (err) {
    console.log('Unexpected Error:', err.message);
    return null;
  }
};

export const updateUserData = async (userId, updates) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.log('Error updating user data:', error.message);
      return null;
    }

    return data;
  } catch (err) {
    console.log('Unexpected Error:', err.message);
    return null;
  }
};