


import React, { useContext,  useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
// import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';


const CustomNavbar = () => {
    const { isAuthenticated, userr,logout, setUserr } = useContext(AuthContext);
    const fileInputRef = useRef(null);
    
  
   
    const convertImageToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };
   

    const handleLogout = () => {
      logout(); // Call the logout function from AuthContext
    };
    const handleImageUpload = async (e) => {
      const file = e.target.files[0];
    
      try {
        const base64Image = await convertImageToBase64(file);
        
        
        console.log("profile image in navbar",userr.profileImage,userr._id);
        // Send the updated profile image to the backend along with the user ID
       const response= await axios.put(`http://localhost:5000/update-profile-image/${userr._id}`, {
          profileImage: base64Image,
         
        });
        console.log("after put function",response.data.updatedUser.profileImage);
        
        // Update the user's profile image in the frontend
        if (userr) {
          setUserr({ ...userr, profileImage: response.data.updatedUser.profileImage });
          // Update the `userr` state with the new profile image URL to reflect the change immediately in the UI
        }
      } catch (error) {
        console.error(error);
        // Handle error response or display error message
      }
    };
    const handleProfileImageClick = () => {
      // Trigger the file input when the profile image is clicked
      
      fileInputRef.current.click();
    };
    const temperatureStyle = {
      backgroundImage: "linear-gradient(to right, red, orange)",
      backgroundSize: "100% 100%",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: "2px 2px 4px rgba(555, 555, 555, 0.3)",
    };
   
    return (
      <Navbar bg="dark" variant="dark" expand="lg" className='p-2' >
        <Navbar.Brand as={Link} to="/" className='fs-2' style={temperatureStyle}>
         Get Weather
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="navbar-nav" >
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link as={NavLink} exact="true" to="/" activeclassname="active ">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about" activeclassname="active">
              About
            </Nav.Link>
            {!isAuthenticated ? (
              <>
                <Nav.Link as={NavLink} to="/login" activeclassname="active">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/signup" activeclassname="active">
                  Sign Up
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link onClick={handleLogout}  activeclassname="active">
                  Logout
                </Nav.Link>
                <Nav.Link onClick={handleProfileImageClick}>
                  {userr.profileImage ? (
                    <img src={userr.profileImage} alt="Profile"  key={userr.profileImage} className="profile-photo img-fluid rounded-circle" style={{height:"40px",width:"40px"}}/>
                  ) : (
                    <img src="https://tse1.mm.bing.net/th?id=OIP.AaL7l0Qp9bk7qZPWeJTwlwHaHa&pid=Api&rs=1&c=1&qlt=95&w=117&h=117" alt="Profile" className="profile-photo img-fluid rounded-circle" key="default-profile-image" style={{height:"40px",width:"40px"}}/>
                  )}
                </Nav.Link>
                <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageUpload}
                accept="image/*"
              />
            
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };
  
  export default CustomNavbar;
  