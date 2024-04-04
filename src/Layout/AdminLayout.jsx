import SideBar from "../Components/AdminComponents/SideBar"
import { Outlet } from "react-router-dom"

function AdminLayout() {

  return (
    <div className="flex">
      <div className="flex-none">
        <SideBar />
      </div>
      <div className="flex-grow">
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminLayout
