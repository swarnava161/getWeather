import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const navigate=useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userr, setUserr] = useState({});
  const [error, setError] = useState(null); 


  useEffect(() => {
    // Check if user is logged in in localStorage
    const storedUser = localStorage.getItem('user');
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated');

    

    if (storedUser && storedIsAuthenticated) {
      setUserr(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);
  
  const login = async (email, password) => {

   
    try {
      // Make API request for authentication and get user data
      const response = await axios.post('http://localhost:5000/login', { email, password });
      const { data } = response;

      // Handle successful authentication
      setIsAuthenticated(true);
      setUserr(data.user);
     
      console.log(data.user);
      console.log(error);
    localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('isAuthenticated', 'true');

     

    } catch (error) {
      // Handle authentication error
      setIsAuthenticated(false);
      setUserr(null);
      console.error(error);
      setError('Invalid credentials');
      
    }
  };

  const logout = () => {
    // Logic to handle logout and clear user data
    setIsAuthenticated(false);
    setUserr(null);
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    navigate('/'); // Redirect to the home page
  };
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, userr, login, logout,setUserr }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
