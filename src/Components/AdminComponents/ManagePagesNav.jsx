import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';


function ManagePagesNav() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('')
  const hoverEffect = "relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"

  useEffect(() => {
    console.log('New Location:', location.pathname);
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <div className='w-full pb-4'>

    <div className=' text-left border-b w-full'>
        <h1 className=' font-semibold text-3xl pb-4'>Page Settings</h1>
        <div>  
            <nav className=" flex gap-6">
                <NavLink to="/admin/manage-pages" className={`${hoverEffect} ${activeLink === '/admin/manage-pages' ? ' after:bg-black after:scale-x-100':''}`}>General</NavLink>
                <NavLink to="/admin/manage-pages/Officials" className={`${hoverEffect} ${activeLink === '/admin/manage-pages/Officials' ? 'after:bg-black after:scale-x-100':''}`}>Officials</NavLink>
                <NavLink to="/admin/manage-pages/news" className={`${hoverEffect} ${activeLink === '/admin/manage-pages/news' ? 'after:bg-black after:scale-x-100':''}`}>Events</NavLink>
                <NavLink to="/admin/manage-pages/faq" className={`${hoverEffect} ${activeLink === '/admin/manage-pages/faq' ? 'after:bg-black after:scale-x-100':''}`}>FAQ</NavLink>
            </nav>     
        </div>
    </div>
       
    </div>
  )
}

export default ManagePagesNav