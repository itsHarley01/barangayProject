import { useState, useEffect } from 'react';
import { NavLink, useLocation, Outlet } from 'react-router-dom';


function PendingNavBar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('')
  const hoverEffect = "relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"

  useEffect(() => {
    console.log('New Location:', location.pathname);
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <div className=' pb-4 m-10'>

    <div className=' text-left border-b w-full'>
        <h1 className=' font-semibold text-3xl pb-4'>Pending Submissions</h1>
        <div>  
            <nav className=" flex gap-6">
                <NavLink to="/admin/submissions/pending-forms" className={`${hoverEffect} ${activeLink === '/admin/submissions/pending-forms' ? ' after:bg-black after:scale-x-100':''}`}>Pending</NavLink>
                <NavLink to="/admin/submissions/pending-forms/accepted" className={`${hoverEffect} ${activeLink === '/admin/submissions/pending-forms/accepted' ? 'after:bg-black after:scale-x-100':''}`}>Accepted</NavLink>
            </nav>     
        </div>
    </div>
    <Outlet/>
    </div>
  )
}

export default PendingNavBar