import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 ">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <p className="mb-2">Get Weather &copy; 2023</p>
            <p className="mb-0">56/1 P.C.banerjee Road, Kolkata, West Bengal</p>
            <p className="mt-2">
              <Link to="tel:+1234567890" className="text-light text-decoration-none p-2">+91 9163527619</Link> | 
              <Link to="mailto:info@getweather.com" className="text-light text-decoration-none p-2"> info@getweather.com</Link>
            </p>
            <div className="social-icons mt-3">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-light me-2">
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-light">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
