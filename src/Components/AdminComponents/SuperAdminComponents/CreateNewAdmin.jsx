import { useState } from 'react';
import { getDatabase, ref, set,push } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import LoadingAnimation from '../../Loading/LoadingAnimation';

const CreateNewAdmin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [newAdminDetails, setNewAdminDetails] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const db = getDatabase();
      const adminsRef = ref(db, 'admins/');
      const newAdminRef = push(adminsRef); // Assuming you have a unique identifier for each admin

      await set(newAdminRef, {
        firstName: newAdminDetails.firstName,
        middleName: newAdminDetails.middleName,
        lastName: newAdminDetails.lastName,
        phoneNumber: newAdminDetails.phoneNumber,
        email: newAdminDetails.email,
        username: newAdminDetails.username,
        password: newAdminDetails.password,
        role:'admin'
      });

      console.log('Admin created successfully');
      navigate('/admin/manage-users/admins');
    } catch (error) {
      console.error('Error creating admin:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border p-10 rounded-lg shadow-md mt-10 ">
      <h1 className="text-2xl font-bold mb-4">Create Admin</h1>

      <form onSubmit={handleFormSubmit}>
        <div className='flex gap-4 '>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={newAdminDetails.firstName}
              onChange={(e) => setNewAdminDetails({ ...newAdminDetails, firstName: e.target.value })}
              className="mt-1 px-2 border w-full block py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">Middle Name</label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              value={newAdminDetails.middleName}
              onChange={(e) => setNewAdminDetails({ ...newAdminDetails, middleName: e.target.value })}
              className="mt-1 px-2 border w-full block py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={newAdminDetails.lastName}
              onChange={(e) => setNewAdminDetails({ ...newAdminDetails, lastName: e.target.value })}
              className="mt-1 px-2 border w-full block py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={newAdminDetails.phoneNumber}
            onChange={(e) => setNewAdminDetails({ ...newAdminDetails, phoneNumber: e.target.value })}
            className="mt-1 px-2 border w-full block py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></input>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={newAdminDetails.email}
            onChange={(e) => setNewAdminDetails({ ...newAdminDetails, email: e.target.value })}
            className="mt-1 px-2 border w-full block py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={newAdminDetails.username}
              onChange={(e) => setNewAdminDetails({ ...newAdminDetails, username: e.target.value })}
              className="mt-1 px-2 border w-full block py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={newAdminDetails.password}
            onChange={(e) => setNewAdminDetails({ ...newAdminDetails, password: e.target.value })}
            className="mt-1 px-2 border w-full block py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 py-2 text-white px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          disabled={loading}
        >
          {loading ? 'Creating Admin...' : 'Create Admin'}
        </button>
      </form>

      {loading && <LoadingAnimation />}
    </div>
  );
};

export default CreateNewAdmin;
