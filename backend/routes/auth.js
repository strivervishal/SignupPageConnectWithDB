const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

// Secret key for JWT (use .env in production)
const JWT_SECRET = "your_jwt_secret_key";

// Configure Multer for temporary local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Temporary storage folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Sign Up Route
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Welcome Route (Protected)
router.get("/welcome", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(verified.id);
    res.json({ message: `Welcome ${user.firstName}!`, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid token" });
  }
});

// File Upload Route
router.post("/upload", upload.single("media"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "uploads", // Optional: Cloudinary folder
    });

    // Delete the local file after upload
    fs.unlinkSync(req.file.path);

    return res.status(200).json({ fileUrl: result.secure_url });
  } catch (error) {
    console.error("Upload Error:", error);
    return res.status(500).json({ message: "Failed to upload file" });
  }
});

module.exports = router;
