
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { db } from '../../../Firebase/Firebase';
import LoadingAnimation from '../../Loading/LoadingAnimation';

const CreateNewAdmin = () => {
  const [loading, setLoading] = useState(false); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleMiddleNameChange = (e) => {
    setMiddleName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const database = getDatabase();
      await set(ref(database, `admins/${userCredential.user.uid}`), {
        email: email,
        lastName: lastName,
        firstName: firstName,
        middleName: middleName,
        phoneNumber: phoneNumber,
      });

      console.log('Admin created:', userCredential.user);
      setEmail('');
      setPassword('');
      setLastName('');
      setFirstName('');
      setMiddleName('');
      setPhoneNumber('');

      window.location.href = '/admin/manage-users/admins';
    } catch (error) {
      alert(error.message);
      console.error('Error creating admin:', error.message);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg w-1/2 shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4">Create Admin</h1>

      <form onSubmit={handleFormSubmit}>
      <div className='flex gap-4 '>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={handleFirstNameChange}
              className="mt-1 px-2 bg-blue-300 w-full block py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">Middle Name</label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              value={middleName}
              onChange={handleMiddleNameChange}
              className="mt-1 px-2 bg-blue-300 w-full block py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={handleLastNameChange}
            className="mt-1 px-2 bg-blue-300 w-full block py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className="mt-1 px-2 bg-blue-300 w-full block py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></input>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            className="mt-1 px-2 bg-blue-300 w-full block py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className="mt-1 px-2 bg-blue-300 w-full block py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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

      {loading && <LoadingAnimation/>}
    </div>
  );
};

export default CreateNewAdmin;
