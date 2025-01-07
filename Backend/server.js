require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const playRoutes = require("./routes/playRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

// MongoDB connection
const connectDB = async () => {
   try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB connected");
   } catch (err) {
      console.error("MongoDB connection error:", err);
      process.exit(1); // Exit process on failure
   }
};
connectDB();

// API routes
app.use("/api", playRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
   res.status(200).json({ status: "OK", message: "Backend is running!" });
});

// Error handling middleware
app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(err.status || 500).json({
      message: err.message || "Something went wrong on the server.",
   });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
