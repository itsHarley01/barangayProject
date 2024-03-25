import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set, get } from 'firebase/database';

function ContactInfo({showContact, onclick}) {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [facebook, setFacebook] = useState('');
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingFacebook, setIsEditingFacebook] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const database = getDatabase();
      const infoRef = ref(database, '/page-info/contact');
      const infoSnapshot = await get(infoRef);
      if (infoSnapshot.exists()) {
        const infoData = infoSnapshot.val();
        setPhone(infoData.phone || '');
        setEmail(infoData.email || '');
        setAddress(infoData.address || '');
        setFacebook(infoData.facebook || '');
      }
    };
    fetchData();
  }, []);

  const handleUpdatePhone = async () => {
    const database = getDatabase();
    const infoRef = ref(database, 'page-info/contact/phone');
    await set(infoRef, phone);
    setIsEditingPhone(false);
  };

  const handleUpdateEmail = async () => {
    const database = getDatabase();
    const infoRef = ref(database, 'page-info/contact/email');
    await set(infoRef, email);
    setIsEditingEmail(false);
  };

  const handleUpdateAddress = async () => {
    const database = getDatabase();
    const infoRef = ref(database, 'page-info/contact/address');
    await set(infoRef, address);
    setIsEditingAddress(false);
  };

  const handleUpdateFacebook = async () => {
    const database = getDatabase();
    const infoRef = ref(database, 'page-info/contact/facebook');
    await set(infoRef, facebook);
    setIsEditingFacebook(false);
  };

  return (
    <div className="mt-2 border rounded-sm">
      <h1 className="text-2xl text-pink-400 font-semibold mb-4">Contact Information</h1>
      <button className='font-semibold w-full pl-2 my-2 bg-blue-300 text-left' onClick={onclick}>{showContact ? 'Minimize':'Show'}</button>
      {showContact &&(
        <div className="m-2 grid grid-cols-2 gap-4">
        <div className="border p-3">
          <label htmlFor="phone" className="block mb-1 font-semibold">Phone:</label>
          {isEditingPhone ? (
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <div>{phone}</div>
          )}
          {isEditingPhone && (
            <div>
              <button onClick={handleUpdatePhone} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-2">
                Update
              </button>
              <button onClick={() => { setIsEditingPhone(false);}} className="mt-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                Cancel
              </button>
            </div>
          )}
          {!isEditingPhone && (
            <button onClick={() => setIsEditingPhone(true)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Edit
            </button>
          )}
          
        </div>

        <div className="border p-3">
          <label htmlFor="email" className="block mb-1 font-semibold">Email:</label>
          {isEditingEmail ? (
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <div>{email}</div>
          )}
          {isEditingEmail && (
            <div>
              <button onClick={handleUpdateEmail} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-2">
                Update
              </button>
              <button onClick={() => { setIsEditingEmail(false); }} className="mt-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                Cancel
              </button>
            </div>
          )}
          {!isEditingEmail && (
            <button onClick={() => setIsEditingEmail(true)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Edit
            </button>
          )}
          
        </div>

        <div className="border p-3">
          <label htmlFor="address" className="block mb-1 font-semibold">Address:</label>
          {isEditingAddress ? (
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <div>{address}</div>
          )}
          {isEditingAddress && (
            <div>
              <button onClick={handleUpdateAddress} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-2">
                Update
              </button>
              <button onClick={() => { setIsEditingAddress(false);}} className="mt-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                Cancel
              </button>
            </div>
          )}
          {!isEditingAddress && (
            <button onClick={() => setIsEditingAddress(true)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Edit
            </button>
          )}
          
        </div>

        <div className="border p-3">
          <label htmlFor="facebook" className="block mb-1 font-semibold">Facebook Page:</label>
          {isEditingFacebook ? (
            <input
              type="text"
              id="facebook"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <div>{facebook}</div>
          )}
          {isEditingFacebook && (
            <div>
              <button onClick={handleUpdateFacebook} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-2">
                Update
              </button>
              <button onClick={() => { setIsEditingFacebook(false);}} className="mt-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                Cancel
              </button>
            </div>
          )}
          {!isEditingFacebook && (
            <button onClick={() => setIsEditingFacebook(true)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Edit
            </button>
          )}
          
        </div>
        </div>
      )}
    </div>
  );
}

export default ContactInfo; 
