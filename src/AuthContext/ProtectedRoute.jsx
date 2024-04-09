import React from 'react'
import { useNavigate } from "react-router-dom";
import { useAuthContext } from './AuthContext';

const ProtectedRoute = ({children}) => {
    const navigate = useNavigate()
    const { user } = useAuthContext();

    if(!user){
        return navigate('/login')
    }
    return children
}

export default ProtectedRoute