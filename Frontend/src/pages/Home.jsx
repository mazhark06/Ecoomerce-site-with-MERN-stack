import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useProtectedRoute from '../hooks/useProtectedRoute';
import axios from 'axios';
import userLogout from '../hooks/userLogout';
function Home() {
  const navigate = useNavigate();

  useProtectedRoute(); 

  
  return (
    <div className=''>

    Home
    <button className='border bg-gray-500 rounded ' onClick={()=> userLogout(navigate)}> Logout</button>

    </div>
  );
}

export default Home;