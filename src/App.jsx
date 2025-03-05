import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'

function App() {
 

  return (
   <BrowserRouter>
   <Navbar>
   <Route path='/' element={<LandingPage/>}/>
   </Navbar>
   </BrowserRouter>
  )
}

export default App
