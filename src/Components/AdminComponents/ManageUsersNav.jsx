import { NavLink,Outlet } from "react-router-dom"

function ManageUsersNav() {
  return (
    <div className='w-full pb-4'>
        <div className=' text-left border-b w-full'>
            <h1 className=' font-semibold text-3xl pb-4'>Manage Users</h1>
            <div>  
                <nav className=" flex gap-6">
                    <NavLink to='/admin/manage-users'>Users</NavLink>


                    {/* only for superadmin */}
                    <NavLink to='/admin/manage-users/admins'>Admin</NavLink>
                </nav>     
            </div>
        </div>
        <Outlet/>
    </div>
  )
}

export default ManageUsersNav