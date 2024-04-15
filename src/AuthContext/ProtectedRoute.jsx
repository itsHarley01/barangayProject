import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/login');
    }
  }, [user, navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
