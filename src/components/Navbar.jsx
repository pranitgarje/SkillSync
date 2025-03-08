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
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-white text-2xl font-bold tracking-wide">
              <span className="text-yellow-300">Skill</span>Sync
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-white">Welcome, {user.name || 'User'}</span>
                <button 
                  onClick={logout} 
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="bg-white hover:bg-gray-100 text-indigo-600 px-4 py-2 rounded-md transition duration-300 ease-in-out shadow-md"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-yellow-400 hover:bg-yellow-500 text-indigo-800 font-semibold px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-md"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;