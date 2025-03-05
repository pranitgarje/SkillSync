import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
   
    <nav>
        <div>
            <h1>SkillSync</h1>
           <Link to="/">Home</Link>
        </div>
    </nav>
  )
}

export default Navbar