import {Outlet } from 'react-router-dom';
import ManagePagesNav from '../../Components/AdminComponents/ManagePagesNav';

function ManagePages() {
  return (
    <div className="flex flex-col justify-center items-center m-10">
      <ManagePagesNav />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}



export default ManagePages;
