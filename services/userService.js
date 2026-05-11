import { supabase } from "../lib/supabse"

export const getUserData = async (userId) => {
     try {
        const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

        if (error) {
            throw error;
        }

        return { success: true, data };
     } catch (error) {
        console.log('Error: ' , error)
        return {success: false, msg: error.message}
     }
}