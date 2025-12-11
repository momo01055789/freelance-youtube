require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

// Route files
const videos = require("./routes/videos");
const auth = require("./routes/auth");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5000",
    "https://freelance-youtube-v5jc.vercel.app",
    "https://freelance-youtube.vercel.app",
    /\.vercel\.app$/, // Allow all Vercel preview deployments
  ],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Handle preflight requests
app.options("*", cors(corsOptions));

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// MongoDB connection for serverless
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

// Middleware to ensure DB connection before each request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Database Connection Error",
      message: "Failed to connect to database",
    });
  }
});

// Mount routers
app.use("/api/v1/auth", auth);
app.use("/api/v1/videos", videos);

// Basic route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to YouTube Landing Page API",
    version: "1.0.0",
  });
});

// For local development
if (process.env.NODE_ENV !== "production") {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });
}

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: "Not Found",
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      success: false,
      error: "Validation Error",
      messages,
    });
  }

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    return res.status(404).json({
      success: false,
      error: "Resource not found",
      message: "The requested resource was not found",
    });
  }

  // Handle MongoDB timeout errors
  if (
    err.name === "MongooseError" ||
    err.message.includes("buffering timed out")
  ) {
    return res.status(503).json({
      success: false,
      error: "Database Connection Error",
      message: "Database connection timed out. Please try again.",
    });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: "Server Error",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong!",
  });
});

module.exports = app;
