import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('accessToken'); // Fixed typo: 'accesToken' → 'accessToken'
    if (!token) {
      navigate('/user/login');
    }
  }, [navigate]); // Added navigate to dependency array
  
  return (
    <div>Home</div>
  );
}

export default Home;