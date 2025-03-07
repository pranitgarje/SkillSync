import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  let contextValue = { user: null, logout: () => {} };
  try {
    contextValue = useContext(AuthContext);
    console.log("Navbar: Context accessed successfully");
  } catch (error) {
    console.error("Navbar: Error accessing context:", error);
  }
  
  const { user, logout } = contextValue;
  
  return (
    <nav className="bg-blue-300 p-4 flex justify-between">
     
        <div className="text-white text-2xl font-bold">SkillSync</div>
        <div>
          {user ? (
            <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
          ) : (
            <Link to="/login" className="bg-green-500 px-4 py-2 rounded">Login</Link>
          )}
        </div>
     
    </nav>
  );
};

export default Navbar;