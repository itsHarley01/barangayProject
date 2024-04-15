import React, { createContext, useEffect, useState, useContext } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { db, auth } from '../Firebase/Firebase'; 
import { ref, onValue, } from 'firebase/database'

const AuthContext = createContext();

export function AuthProvider({ children })  {
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState(null);

  function userLogout() {
    return signOut(auth);
  }

  function userSetter(newUser) {
    return setUser(newUser);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log(user)
      if (currentuser) {
        const userDataRef = ref(db, `admins/${user.uid}`); 
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
    <AuthContext.Provider value={{ user, setUser, userData, userLogout, userSetter }}>
        {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
