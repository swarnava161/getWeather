const express = require('express');
const router = express.Router();
const SignupModel = require('../model/User');



router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, confirmPassword, profileImage, location } = req.body;

    // Check if the email already exists
    const existingUser = await SignupModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Validate the signup data using the signup schema
    const signupData = {
      name,
      email,
      password,
      confirmPassword,
      profileImage,
      location,
    };

    // Save the signup data to the database
    const signup = new SignupModel(signupData);
    const savedSignup = await signup.save();

    // Return a success response
    res.status(201).json({ message: 'Signup successful', data: savedSignup });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
