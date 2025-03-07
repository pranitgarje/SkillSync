import { createContext, useState, useEffect } from "react";

// Create the context with a default value
export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {}
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  // Initialize user from localStorage
  useEffect(() => {
    try {
      const token = localStorage.getItem("jwt");
      if (token) {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }
    } catch (error) {
      console.error("Error initializing user from localStorage:", error);
    }
  }, []);

  // Simple login function without toast
  const login = (userData, jwt) => {
    try {
      setUser(userData);
      localStorage.setItem("jwt", jwt);
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("Login successful");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Simple logout function without toast
  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
      console.log("Logged out");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;