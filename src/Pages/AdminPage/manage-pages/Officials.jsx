import { NavLink } from "react-router-dom";
import ManageOfficials from "../../../Components/AdminComponents/ManageOfficials/ManageOfficials";


function Officials() {
  return (
    <div className="">
        <h1 className="text-2xl text-pink-400 font-semibold mb-4">Manage Officials</h1>
        <div className="p-5 border">
            
            <NavLink to="/admin/manage-pages/add-official" className="inline-block bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white px-6 py-3 rounded-md shadow-md transition duration-300 ease-in-out">
                + Add Official
            </NavLink>
        </div>
        <div>
          <ManageOfficials/>
        </div>
    </div>
  );
}

export default Officials;
