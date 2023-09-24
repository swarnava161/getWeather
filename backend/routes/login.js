const express = require('express');
const router = express.Router();
const SignupModel = require('../model/User');


// Other dependencies or middleware
// ...
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user exists
      const user = await SignupModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
  
      // Compare the provided password with the stored password
      if (password !== user.password) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
  
      // User authenticated
      // You can generate a token or set a session here
  
      res.status(200).json({ message: 'Login successful' ,user});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  module.exports = router;

