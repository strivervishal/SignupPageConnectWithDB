const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String, // This will store the path or URL of the uploaded photo
    required: false, // Make it optional if you don't want to enforce it during registration
  },
});

module.exports = mongoose.model("User", userSchema);
