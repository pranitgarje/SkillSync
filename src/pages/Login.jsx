import React, { useContext, useState } from 'react';
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';

const Login = () => {
  // Add this console log to verify the component is rendering
  console.log("Login component rendering");
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Wrap the context usage in a try/catch block
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
    try {
      // For testing, just log the credentials
      console.log("Login attempt with:", email, password);
      
      // Uncomment this when ready to test the actual API call
      
      const { data } = await axios.post('http://localhost:5173/api/auth/login', {
        email,
        password,
      });
      login(data.user, data.token);
      
      
      // For now, use mock data
      login(data.user,data.token);
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  
  return (
    <div className="flex justify-center items-center h-screen">
      
      <form onSubmit={handleLogin} className="p-6 bg-white shadow-md rounded-md w-96">
      <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
        <div style={{ marginBottom: '10px' }}>
          <label>Email: </label>
          <input 
            type="email"
            value={email}
            className="w-full p-2 border rounded mb-4"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password: </label>
          <input 
            type="password" 
            value={password}
            className="w-full p-2 border rounded mb-4"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;