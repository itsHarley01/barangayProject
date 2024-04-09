import React, { useState, useEffect } from 'react';
import bg from '../../assets/Images/bgbb.png';
import logo from '../../assets/Images/logo.png';
import { useNavigate } from 'react-router-dom';
import LoadingAnimation from '../../Components/Loading/LoadingAnimation';
import { useAuthContext } from '../../AuthContext/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { userLogin } = useAuthContext();


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await userLogin(email, password);
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    }

  };
  

  return (
    <div className="min-h-screen flex justify-center bg-cover items-center" style={{ backgroundImage: `url(${bg})`}}>
      <div className="flex justify-center items-stretch w-3/4">
        <div className="flex flex-col justify-center items-center bg-white p-8 rounded-tl-[10px] rounded-bl-[10px] shadow-md w-1/3">
          <h1 className='m-10 text-3xl font-semibold'>Admin Login</h1>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-4" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-4" />
          <div className="flex justify-between w-full mb-4">
            <button onClick={handleLogin} className="bg-blue-500 text-white py-2 px-4 rounded">Login</button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <div className="flex flex-col justify-center items-center bg-blue-500 p-8 rounded-tr-[10px] rounded-br-[10px] shadow-md w-1/3">
          <img src={logo} alt="Logo" className="w-[25vh] h-auto mb-4" />
        </div>
      </div>
      {loading && <LoadingAnimation/>}
    </div>
  );
}

export default LoginPage;
