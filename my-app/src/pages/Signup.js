import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaEdit } from 'react-icons/fa';
import "./Signup.css";
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [location, setLocation] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState(null); // Set initial value to null

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Check if any field is blank
    if (!name || !email || !password || !confirmPassword || !location) {
      setError('All fields must be filled');
      return;
    }

    try {
      // Convert image to base64 string if a profile image is selected
      let base64Image = null;

      if (profileImage) {
        const reader = new FileReader();
        reader.onloadend = () => {
          base64Image = reader.result;

          // Make a POST request to the backend for sign-up
          axios
            .post('http://localhost:5000/signup', {
              name,
              email,
              password,
              confirmPassword,
              location,
              profileImage: base64Image,
            })
            .then((response) => {
              // Handle response or redirect to a success page
              console.log(response.data);
              navigate('/login');
            })
            .catch((error) => {
              // Handle error response or display error message
              if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
              } else {
                setError('An error occurred. Please try again later.');
              }
            });
        };

        reader.readAsDataURL(profileImage);
      } else {
        // If profileImage is not selected, set it to null
        base64Image = null;

        // Make a POST request to the backend for sign-up
        axios
          .post('http://localhost:5000/signup', {
            name,
            email,
            password,
            confirmPassword,
            location,
            profileImage: base64Image,
          })
          .then((response) => {
            // Handle response or redirect to a success page
            console.log(response.data);
            navigate('/login');
          })
          .catch((error) => {
            // Handle error response or display error message
            if (error.response && error.response.data && error.response.data.error) {
              setError(error.response.data.error);
            } else {
              setError('An error occurred. Please try again later.');
            }
          });
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="container text-white p-5" style={{minHeight:"100vh"}}>
      <h2 className="text-center py-2 fw-bold" style={{
          backgroundImage: "linear-gradient(to right, red, orange)",
          backgroundSize: "100% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "2px 2px 4px rgba(555, 555, 555, 0.3)",
        }}>Sign Up</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSignUp} className='p-4 border border-white rounded-2' style={{backgroundColor:"rgba(0,0,0,0.8)"}}>
        <div className="form-group text-center p-3">
        <label htmlFor="profileImage" className="profile-image-label ">
            {previewImage ? (
              <img src={previewImage} alt="Profile" className="profile-image" />
            ) : (
              <FaUser className="default-profile-icon fs-1" />
            )}
            <FaEdit className="edit-icon fs-5" />
            <input type="file" id="profileImage" className="file-input" accept="image/*" onChange={handleImageUpload} />
          </label>
        </div>
        <div className="form-group p-2">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group p-2">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group p-2">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-group p-2">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" className="form-control" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <div className="form-group p-2">
          <label htmlFor="location">Location</label>
          <input type="text" className="form-control" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-outline-light p-2 m-2">Sign up</button>
      </form>
      <p className="text-center mt-3">Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default SignUp;

