const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Root Route (Replace or Add This Code)
app.get("/", (req, res) => {
  res.send("Welcome to the Signup API!");
});

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://vp564141:h4qT5DhEbayT1gE5@signuppage.en9tg.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Database connection error:", err));

// Start the Server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
