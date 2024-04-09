import React, { createContext, useEffect, useState, useContext } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { db, auth } from '../Firebase/Firebase'; 
import { ref, onValue } from 'firebase/database'

const AuthContext = createContext();

export function AuthProvider({ children })  {
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState(null);

  function userLogin(email, password){
    return signInWithEmailAndPassword(auth, email, password)
  }

  function userLogout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
      
      if (currentuser) {
        const userDataRef = ref(db, `admins/${currentuser.uid}`); 
        onValue(userDataRef, (snapshot) => {
          const data = snapshot.val();
          setUserData(data);
        });
      } else {
        setUserData(null); 
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, userLogin, userLogout }}>
        {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
