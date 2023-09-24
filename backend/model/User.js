const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    
  },
  location: {
    type: String,
    required: true,
  },
});

const SignupModel = mongoose.model('Signup', signupSchema);

module.exports = SignupModel;
