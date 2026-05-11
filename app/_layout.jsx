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
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        setAuth(session.user);

        let res = await getUserData(session.user.id);

        if (res.success) {
          setUserData(res.data);
        }

        requestAnimationFrame(() => {
          router.replace('/(main)/home');
        });
      } else {
        setAuth(null);

        requestAnimationFrame(() => {
          router.replace('/(auth)/welcome');
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default RootLayout;