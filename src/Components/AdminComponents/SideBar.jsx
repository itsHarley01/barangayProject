import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/Images/logo.png';
import Confirmation from '../PopUps/Confirmation';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import { useAuthContext } from '../../AuthContext/AuthContext';
import { useNavigate } from "react-router-dom";

function SideBar() {
  const navigate = useNavigate()

  const { user, userData, userLogout } = useAuthContext();
  const firstName = userData ? userData.firstName : '';
  const lastName = userData ? userData.lastName : '';

  const [showPopup, setShowPopup] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userRole, setUserRole] = useState('');
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  console.log(userData)
  console.log("user", user)

  useEffect(() => {
    if (userData) {
      if (userData.role === 'admin') {
        setUserRole('Admin');
      } else if (userData.role === 'superadmin') {
        setUserRole('SuperAdmin');
      }
    }
  }, [userData]);

  // console.log(userData)

  const handleConfirm = async () => {
    setShowPopup(false);
    try {
      await userLogout();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCancel = () => {
    setShowPopup(false);
    console.log(user.uid)
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-pink-500 to-blue-500 text-white flex flex-col" style={{ width: '16rem' }}>
      <div className="p-4">
        <div className="flex items-center mb-4">
          <img src={logo} alt="Logo" className="w-10 h-10 mr-2" />
          <span className="text-lg font-bold">Barangay Guadalupe</span>
        </div>
        <div>
          <p className="text-sm"> {user && `${userRole}: ${firstName} ${lastName}`} </p>
        </div>
      </div>
      <nav className="flex flex-col space-y-4 flex-1 pt-10">
        <NavLink to='/admin' className={`px-4 py-2 hover:bg-fuchsia-600 ${activeLink === '/admin' ? 'bg-fuchsia-600':''} `} >Dashboard</NavLink>
        <NavLink to='/admin/manage-users' className={`px-4 py-2 hover:bg-fuchsia-600 ${activeLink === '/admin/manage-users' ? 'bg-fuchsia-600':''} `} >Manage Users</NavLink>

        <div className="relative">
          <button onClick={handleDropdownToggle} className={`w-full px-4 py-2 text-left flex gap-2 items-center hover:bg-fuchsia-600 ${activeLink === '/admin/submissions/pending' || activeLink === '/admin/submissions/approved' || activeLink === '/admin/submissions/complaints' ? 'bg-fuchsia-600':''} ${showDropdown ? ' ' : ' '} `}>
            Submissions {showDropdown ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
          </button>
          <div
            className={`w-full transition-max-height duration-500 overflow-hidden ${showDropdown ? 'max-h-screen ' : 'max-h-0'}`}
          >
            {showDropdown && (
              <div className="flex flex-col text-left border-y  border-x-0">
                <NavLink to='/admin/submissions/pending' className={`px-4 py-2 pl-10 hover:bg-fuchsia-600 ${activeLink === '/admin/submissions/pending' ? 'bg-fuchsia-600':''} `}>Pending Submissions</NavLink>
                <NavLink to='/admin/submissions/approved' className={` px-4 py-2 pl-10 hover:bg-fuchsia-600 ${activeLink === '/admin/submissions/approved' ? 'bg-fuchsia-600':''} `}>Approved Submissions</NavLink>
                <NavLink to='/admin/submissions/complaints' className={` px-4 py-2 pl-10 hover:bg-fuchsia-600 ${activeLink === '/admin/submissions/complaints' ? 'bg-fuchsia-600':''} `}>Complaints</NavLink>
              </div>
            )}
          </div>
        </div>

        <NavLink to='/admin/manage-pages' className={`px-4 py-2 hover:bg-fuchsia-600 ${activeLink === '/admin/manage-pages' ? 'bg-fuchsia-600':''} `}>Page Settings</NavLink>
      </nav>
      <div className="absolute bottom-0 w-auto p-5">
        <button onClick={() => setShowPopup(true)} className="block w-full bg-red-500 text-center text-white py-2 px-2 rounded hover:bg-red-600">Logout</button>
      </div>

      {showPopup && (
        <Confirmation
          text="Are you sure you want to Logout?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          confirmText="Confirm"
          cancelText="Cancel"
        />
      )}
    </div>
  );
}

export default SideBar;
