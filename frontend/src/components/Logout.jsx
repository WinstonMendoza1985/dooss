import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Logout = ({setToken}) => {
    const navigate = useNavigate();
    
    useEffect(() => {
        // Clear previous token if exists
        setToken('');
        localStorage.removeItem('authToken');
        setTimeout(() => navigate('/'), 100); 
    })
}

export default Logout;