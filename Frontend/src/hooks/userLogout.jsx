import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

async function userLogout(navigate) {
    try {
        // Get token before removing it
        const token = localStorage.getItem('accessToken');
        
        // Remove token immediately
        localStorage.removeItem('accessToken');

        // Make the logout API call
        await axios.get(`${import.meta.env.VITE_USER_URI}/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Navigate only once
        navigate('/user/login');
        
    } catch (error) {
        console.error('Logout error:', error);
        navigate('/user/login');
    }
}

export default userLogout;