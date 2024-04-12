import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, remove, update } from 'firebase/database';
import { FaEdit, FaTrash } from 'react-icons/fa'; 
import LoadingAnimation from '../../../Components/Loading/LoadingAnimation';
import { NavLink } from 'react-router-dom';

function Admins() {
  const [searchTerm, setSearchTerm] = useState('');
  const [admins, setAdmins] = useState([]);
  const [editAdmin, setEditAdmin] = useState(null);
  const [deleteAdmin, setDeleteAdmin] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [editedFirstName, setEditedFirstName] = useState('');
  const [editedMiddleName, setEditedMiddleName] = useState('');
  const [editedLastName, setEditedLastName] = useState('');
  const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false); 

  useEffect(() => {
    const database = getDatabase();
    const adminsRef = ref(database, 'admins');

    onValue(adminsRef, (snapshot) => {
      const adminsData = snapshot.val();
      if (adminsData) {
        const adminsArray = Object.keys(adminsData).map((key) => ({
          id: key,
          ...adminsData[key],
        }));
        setAdmins(adminsArray);
      } else {
        setAdmins([]);
      }
      setLoading(false);
    });

    return () => {
      onValue(adminsRef, null);
    };
  }, []);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
  };

  const filteredAdmins = admins.filter((admin) =>
  (admin.role === 'admin') &&
  (admin.firstName.toLowerCase().includes(searchTerm) ||
  admin.middleName.toLowerCase().includes(searchTerm) ||
  admin.lastName.toLowerCase().includes(searchTerm) ||
  admin.phoneNumber.toLowerCase().includes(searchTerm) ||
  admin.email.toLowerCase().includes(searchTerm))
);


  const handleEditAdmin = (admin) => {
    setEditAdmin(admin); 
    setEditedFirstName(admin.firstName);
    setEditedMiddleName(admin.middleName);
    setEditedLastName(admin.lastName);
    setEditedPhoneNumber(admin.phoneNumber);
  };

  const handleUpdateAdmin = () => {
    if (editAdmin) {
      const database = getDatabase();
      const adminRef = ref(database, `admins/${editAdmin.id}`);
      update(adminRef, {
        firstName: editedFirstName,
        middleName: editedMiddleName,
        lastName: editedLastName,
        phoneNumber: editedPhoneNumber,
      })
        .then(() => {
          setEditAdmin(null); 
        })
        .catch((error) => {
          console.error('Error updating admin:', error);
        });
    }
  };

  const handleDeleteAdmin = (admin) => {
    setDeleteAdmin(admin); 
    setShowConfirmation(true); 
  };

  const handleConfirmDelete = () => {
    if (deleteAdmin) {
      const database = getDatabase();
      const adminRef = ref(database, `admins/${deleteAdmin.id}`);
      remove(adminRef)
        .then(() => {
          setDeleteAdmin(null); 
          setShowConfirmation(false); 
        })
        .catch((error) => {
          console.error('Error deleting admin:', error);
        });
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false); 
  };

  return (
    <div>
      <div className="flex items-center mt-10 mb-4 justify-between">
        <input
          type="text"
          placeholder="Search Admins..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />

        <NavLink to='/admin/add-new-admin'  className="px-3 py-2 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Create New Admin
        </NavLink>
      </div>
      <div className="border border-gray-300 rounded-md p-4">
        <table className="w-full">
          <tr className='border-b text-left '>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
          {filteredAdmins.map((admin) => (
            <tr key={admin.id}>
              <td>{`${admin.firstName} ${admin.middleName} ${admin.lastName}`}</td>
              <td>{admin.phoneNumber}</td>
              <td>{admin.email}</td>
              <td>
                <button onClick={() => handleEditAdmin(admin)} className="mr-2">
                  <FaEdit />
                </button>
                <button onClick={() => handleDeleteAdmin(admin)} className="text-red-500">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
      
      {editAdmin && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-700 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-4">Edit Admin</h2>
            <div className="mb-4">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                value={editedFirstName}
                onChange={(e) => setEditedFirstName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="middleName">Middle Name:</label>
              <input
                type="text"
                id="middleName"
                value={editedMiddleName}
                onChange={(e) => setEditedMiddleName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                value={editedLastName}
                onChange={(e) => setEditedLastName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="text"
                id="phoneNumber"
                value={editedPhoneNumber}
                onChange={(e) => setEditedPhoneNumber(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex justify-end">
              <button onClick={handleUpdateAdmin} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-2">Update</button>
              <button onClick={() => setEditAdmin(null)} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">Cancel</button>
            </div>
          </div>
        </div>
      )}
      
      {loading && <LoadingAnimation />}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md">
            <p className="text-red-600 mb-4">Are you sure you want to delete this admin account? Actions are irreversible.</p>
            <div className="flex justify-end">
              <button onClick={handleConfirmDelete} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mr-2">Confirm</button>
              <button onClick={handleCancelDelete} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admins;
