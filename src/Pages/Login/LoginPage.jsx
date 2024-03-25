import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, get, child } from 'firebase/database';
import bg from '../../assets/Images/img1.jpg';
import logo from '../../assets/Images/logo.png';
import LoadingAnimation from '../../Components/Loading/LoadingAnimation';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setErrorMessage('Please enter both email and password.');
        return;
      }

      setLoading(true);
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);

      const database = getDatabase();
      const adminRef = ref(database, 'admins');
      const adminSnapshot = await get(child(adminRef, auth.currentUser.uid));

      if (adminSnapshot.exists()) {
        const adminData = adminSnapshot.val();
        window.location.href = `/admin`;
      } else {
        setErrorMessage('Email or password is incorrect.');
      }
    } catch (error) {
      setErrorMessage('Email or password is incorrect.');
      console.error('Error logging in:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-cover items-center" style={{ backgroundImage: `url(${bg})`}}>
      <div className="flex justify-center items-stretch w-3/4">
        <div className="flex flex-col justify-center items-center bg-white p-8 rounded-tl-[10px] rounded-bl-[10px] shadow-md w-1/3">
          <img src={logo} alt="Logo" className="w-20 h-20 mb-4" />
          <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} className="w-full p-2 border border-gray-300 rounded mb-4" />
          <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} className="w-full p-2 border border-gray-300 rounded mb-4" />
          <div className="flex justify-between w-full mb-4">
            <button onClick={handleLogin} className="bg-blue-500 text-white py-2 px-4 rounded">Login</button>
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
        <div className="flex flex-col justify-center items-center bg-blue-500 p-8 rounded-tr-[10px] rounded-br-[10px] shadow-md w-1/3">
        </div>
      </div>
      {loading && <LoadingAnimation/>}
    </div>
  );
}

export default LoginPage;

