import { createContext, useContext, useState } from 'react';
import { fetchUserData } from '../services/updateUserData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const setAuth = (authUser) => {
    setUser(authUser);
  };

  const setUserData = (userData) => {
    setUser(userData);
  };

  
  const refreshUserData = async (userId) => {
    const updatedUser = await fetchUserData(userId);

    if (updatedUser) {
      setUser(updatedUser); 
    }

    return updatedUser;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setAuth,
        setUserData,
        refreshUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);