import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Signup from './pages/signup'
import AuthProvider from './context/AuthContext'

function App() {
 

  return (
    <AuthProvider>
    <BrowserRouter>
   <Navbar/>
   <Routes>
    <Route path='/' element={<LandingPage/>}/>
    <Route path='/signup' element={<Signup/>}/>
     <Route path='/login' element={<Login/>}/>
   </Routes>
  
   </BrowserRouter>
    </AuthProvider> 
    
  
 
  )
}

export default App
