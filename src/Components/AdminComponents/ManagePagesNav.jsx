import { NavLink } from 'react-router-dom';

function ManagePagesNav() {
  return (
    <div className='w-full pb-4'>

    <div className=' text-left border-b w-full'>
        <h1 className=' font-semibold text-3xl pb-4'>Page Settings</h1>
        <div>  
            <nav className=" flex gap-6">
                <NavLink to="/admin/manage-pages">General</NavLink>
                <NavLink to="/admin/manage-pages/Officials">Officials</NavLink>
                <NavLink to="/admin/manage-pages/news">News</NavLink>
                <NavLink to="/admin/manage-pages/faq">FAQ</NavLink>
            </nav>     
        </div>
    </div>
       
    </div>
  )
}

export default ManagePagesNav