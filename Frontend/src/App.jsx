import React from 'react'
import { Routes , Route } from 'react-router-dom'
import UserLogin from './pages/UserLogin'
import Home from './pages/Home'
import UserSignup from './pages/UserSignup'
import './App.css'
function App() {
  return (
   <Routes>
<Route path='/' element={<Home/>}/>
<Route path='/user/login' element={<UserLogin/>}/>
<Route path='/user/signup' element={<UserSignup/>}/>

   </Routes>
  )
}

export default App