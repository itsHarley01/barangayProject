import SideBar from "../Components/AdminComponents/SideBar"
import { Outlet } from "react-router-dom"
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';

function AdminLayout() {
  const [loggedInAdminName, setLoggedInAdminName] = useState('');
  const [newAdminName, setNewAdminName] = useState('');

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const database = getDatabase();
        const adminRef = ref(database, `admins/${user.uid}`);
        const adminSnapshot = await get(adminRef);

        if (adminSnapshot.exists()) {
          const adminData = adminSnapshot.val();
          const fullName = `${adminData.firstName} ${adminData.lastName}`;
          setLoggedInAdminName(fullName);
        }
      }
    });
  }, []);
  

  return (
    <div className="flex">
      <div className="flex-none">
        <SideBar loggedInAdminName={loggedInAdminName} newAdminName={newAdminName} setNewAdminName={setNewAdminName} />
      </div>
      <div className="flex-grow">
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminLayout
