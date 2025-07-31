import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function useProtectedRoute() {
    const navigate = useNavigate();

    useEffect(() => {
      const checkAuth = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_PROTECTED_URI}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            // if (!response.data.success) {
            //     localStorage.removeItem('accessToken');
            //     navigate('/user/login');
            // }

        } catch (error) {
         console.log(error);
         localStorage.removeItem('accessToken');
         navigate('/user/login');   
        }
      }
      checkAuth();
     
    }, [])
    return null; 
}

export default useProtectedRoute