import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  console.log("Login component rendering");
  
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Get context
  let contextValue = { login: () => console.log("Default login") };
  try {
    contextValue = useContext(AuthContext);
    console.log("Context accessed successfully:", !!contextValue);
  } catch (error) {
    console.error("Error accessing context:", error);
  }
  
  const { login } = contextValue;
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    if (!email || !password) {
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }
    
    try {
      console.log("Login attempt with:", email, password);
      
      // Log the request details
      console.log("Sending request to:", 'http://localhost:5000/api/auth/login');
      
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      
      console.log("Login response status:", response.status);
      console.log("Login response data:", response.data);
      
      const { data } = response;
      
      if (data && data.user && data.token) {
        login(data.user, data.token);
        navigate('/'); // Redirect to home page after successful login
      } else {
        setError('Invalid response from server');
      }
    } catch (error) {
      console.error("Login error full details:", error);
      
      if (error.response) {
        setError(error.response.data.message || 'Failed to login. Please check your credentials.');
      } else if (error.request) {
        setError('No response from server. Please try again later.');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-indigo-800">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to your SkillSync account</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p>{error}</p>
            </div>
          )}
          
          <form onSubmit={handleLogin} className="p-8">
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                Email Address
              </label>
              <input 
                id="email"
                type="email"
                value={email}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200 ease-in-out"
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <label className="block text-gray-700 text-sm font-semibold" htmlFor="password">
                  Password
                </label>
                <a href="#" className="text-xs text-indigo-600 hover:text-indigo-800">
                  Forgot Password?
                </a>
              </div>
              <input 
                id="password"
                type="password" 
                value={password}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200 ease-in-out"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-6">
              <div className="flex items-center">
                <input 
                  id="remember-me" 
                  type="checkbox" 
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
            </div>
            
            <button 
              type="submit" 
              className={`w-full py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold rounded-lg shadow-lg
              ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90 transform transition duration-300 ease-in-out hover:-translate-y-1'}`}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
            
            <div className="text-center mt-6 text-gray-500">
              Don't have an account? 
              <Link to="/signup" className="text-indigo-600 hover:text-indigo-800 font-semibold ml-1">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;