const express = require('express');
const router = express.Router();
const UserModel = require('../model/User');

// Route to update the user's profile image
router.put('/update-profile-image/:id', async (req, res) => {
  try {
    const { profileImage } = req.body;
    const userId = req.params.id;
   // Assuming you have implemented authentication and have access to the user's ID through req.user
   
    // You can directly update the profileImage field in the user document with the base64 string
   await UserModel.findByIdAndUpdate(userId, { profileImage });
   const updatedUser = await UserModel.findById(userId);
    res.status(200).json({ message: 'Profile image updated successfully', updatedUser});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
