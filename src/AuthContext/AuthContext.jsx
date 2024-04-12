import React, { createContext, useEffect, useState, useContext } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from '../Firebase/Firebase'; 
import { ref, onValue, getDatabase,set } from 'firebase/database'

const AuthContext = createContext();

export function AuthProvider({ children })  {
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState(null);
  const [adminCreationStatus, setAdminCreationStatus] = useState(null);
  const [newAdminDetails, setNewAdminDetails] = useState({
    email: '',
    password: '',
    lastName: '',
    firstName: '',
    middleName: '',
    phoneNumber: '',
  });

  function userLogin(email, password){
    return signInWithEmailAndPassword(auth, email, password)
  }
  async function createNewAdmin(email, password, adminDetails) {
    try {
      const newUserCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = newUserCredential.user;
      const uid = newUser.uid;

      const database = getDatabase();
      const adminRef = ref(database, `admins/${uid}`); 
      await set(adminRef, {
        email: adminDetails.email,
        lastName: adminDetails.lastName,
        firstName: adminDetails.firstName,
        middleName: adminDetails.middleName,
        phoneNumber: adminDetails.phoneNumber,
        role: 'admin'
      });

      // Clear admin creation data
      setNewAdminDetails({
        email: '',
        password: '',
        lastName: '',
        firstName: '',
        middleName: '',
        phoneNumber: '',
      });
      
      setAdminCreationStatus('success')

      return uid;
    } catch (error) {
      setAdminCreationStatus('error');
      throw error;
    }
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
    <AuthContext.Provider value={{ user, userData, userLogin, userLogout, createNewAdmin, newAdminDetails, setNewAdminDetails, adminCreationStatus }}>
        {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
