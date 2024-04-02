import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, remove, update } from 'firebase/database';
import LoadingAnimation from '../../../Components/Loading/LoadingAnimation';
import { FaEdit, FaTrash } from 'react-icons/fa'; 

function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editedFirstName, setEditedFirstName] = useState('');
  const [editedMiddleName, setEditedMiddleName] = useState('');
  const [editedAge, setEditedAge] = useState('');
  const [editedContact, setEditedContact] = useState('');
  const [editedBirthdate, setEditedBirthdate] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const database = getDatabase();
    const usersRef = ref(database, 'users');

    onValue(usersRef, (snapshot) => {
      const usersData = snapshot.val();
      if (usersData) {
        const usersArray = Object.keys(usersData).map((key) => ({
          id: key,
          ...usersData[key],
        }));
        setUsers(usersArray);
      } else {
        setUsers([]);
      }
      setLoading(false);
    });

    return () => {
      onValue(usersRef, null);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    setEditedFirstName(user.firstName);
    setEditedMiddleName(user.middleName);
    setEditedAge(user.age);
    setEditedContact(user.contact);
    setEditedBirthdate(user.birthDate);
  };

  const handleUpdateUser = () => {
    if (editUser) {
      const database = getDatabase();
      const userRef = ref(database, `users/${editUser.id}`);
      update(userRef, {
        firstName: editedFirstName,
        middleName: editedMiddleName,
        age: editedAge,
        contact: editedContact,
        birthDate: editedBirthdate,
      })
        .then(() => {
          setEditUser(null);
        })
        .catch((error) => {
          console.error('Error updating user:', error);
        });
    }
  };

  const handleDeleteUser = (user) => {
    setDeleteUser(user);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (deleteUser) {
      const database = getDatabase();
      const userRef = ref(database, `users/${deleteUser.id}`);
      remove(userRef)
        .then(() => {
          setDeleteUser(null);
          setShowConfirmation(false);
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
        });
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div>
      <div className="flex items-center mt-10 mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="ml-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="date">Sort by Date</option>
          <option value="alphabetical">Sort A-Z</option>
        </select>
      </div>
      <div className="border border-gray-300 rounded-md p-4">
        <table className="w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{`${user.firstName} ${user.middleName} ${user.lastName}`}</td>
                <td>{user.contact}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleEditUser(user)} className="mr-2">
                  <FaEdit />
                  </button>
                  <button onClick={() => handleDeleteUser(user)} className="text-red-500">
                  <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editUser && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-700 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-4">Edit User</h2>
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
              <label htmlFor="age">Age:</label>
              <input
                type="text"
                id="age"
                value={editedAge}
                onChange={(e) => setEditedAge(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="contact">Contact:</label>
              <input
                type="text"
                id="contact"
                value={editedContact}
                onChange={(e) => setEditedContact(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="birthdate">Birthdate:</label>
              <input
                type="text"
                id="birthdate"
                value={editedBirthdate}
                onChange={(e) => setEditedBirthdate(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex justify-end">
              <button onClick={handleUpdateUser} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-2">
                Update
              </button>
              <button onClick={() => setEditUser(null)} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && <LoadingAnimation/>}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md">
            <p className="text-red-600 mb-4">Are you sure you want to delete this user account? Actions are irreversible.</p>
            <div className="flex justify-end">
              <button onClick={handleConfirmDelete} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mr-2">
                Confirm
              </button>
              <button onClick={handleCancelDelete} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;

