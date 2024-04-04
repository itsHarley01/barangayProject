// auth.jsx

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';


export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginWithEmail = async (email, password) => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
      return auth.currentUser;
    } catch (error) {
      console.error('Error signing in:', error);
      setIsLoggedIn(false); 
      throw error; 
    }
  };
  

  const getIsLoggedIn = () => isLoggedIn;

  const logout = async () => {
    const auth = getAuth();
    await auth.signOut();
    setIsLoggedIn(false);
  };

  return { loginWithEmail, getIsLoggedIn, logout };
};
