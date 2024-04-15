import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function ManageUsersNav() {
  const userData  = localStorage.getItem('role');
  const [userRole, setUserRole] = useState();
  const navigate = useNavigate(); 
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('')
  const hoverEffect = "relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);
  
  useEffect(() => {
    if (userData) {
      if (userData === 'admin') {
        setUserRole('admin');
      } else if (userData === 'superadmin') {
        setUserRole('superadmin');
      }
    }
  }, [userData]);


  useEffect(() => {
    console.log('userrole',userRole)
    if (userRole === 'admin') {
      navigate('/admin/manage-users'); 
    }
  }, [userRole, navigate]);

  return (
    <div className='w-full pb-4'>
      <div className='text-left border-b w-full'>
        <h1 className='font-semibold text-3xl pb-4'>Manage Users</h1>
        <div>  
          {userRole === 'superadmin' ? (
            <nav className="flex gap-6">
              <NavLink to='/admin/manage-users' className={`${hoverEffect} ${activeLink === '/admin/manage-users' ? 'after:bg-black after:scale-x-100':''}`}>Users</NavLink>
              <NavLink to='/admin/manage-users/admins' className={`${hoverEffect} ${activeLink === '/admin/manage-users/admins' ? 'after:bg-black after:scale-x-100':''}`}>Admin</NavLink>
            </nav>  
          ) : userRole === 'admin' ? (
            <nav className="flex gap-6">
              <NavLink to='/admin/manage-users' className={`${hoverEffect} ${activeLink === '/admin/manage-users' ? 'after:bg-black after:scale-x-100':''}`}>Users</NavLink>
            </nav>
          ) : null}
        </div>
      </div>
      <Outlet/>
    </div>
  );
}

export default ManageUsersNav;
