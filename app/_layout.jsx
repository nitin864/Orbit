import { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabse';
import { getUserData } from '../services/userService';

const RootLayout = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
};

const MainLayout = () => {
  const { setAuth, setUserData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('session user: ', session?.user?.id);

      if (session) {
        setAuth(session?.user);
        updatedUserData(session?.user);
        router.replace('/Home');
      } else {
        setAuth(null);
        router.replace('/welcome');
      }
    });
  }, []);

  const updatedUserData = async (user) => {

    let res = await getUserData(user?.id); 
    if(res.success) setUserData(res.data);

  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default RootLayout;