import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CustomNavbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';

import AuthContextProvider from './context/AuthContext';
import Footer from './components/Footer';


const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <div
          style={{
            background: `url('https://tse2.mm.bing.net/th?id=OIP.jLEy27pBuaqtlPL7M4Y1pgAAAA&pid=Api&P=0&h=180')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
          }}
        >
          <CustomNavbar />
          <div>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
       
            </Routes>
          </div>
        </div>
        <Footer/>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
