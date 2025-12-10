// Script to create the first admin user
require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("./models/Admin");

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: "admin@example.com" });

    if (existingAdmin) {
      console.log("Admin user already exists!");
      console.log("Email:", existingAdmin.email);
      console.log("Username:", existingAdmin.username);
      process.exit(0);
    }

    // Create admin user
    const admin = await Admin.create({
      username: "admin",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
    });

    console.log("Admin user created successfully!");
    console.log("Email:", admin.email);
    console.log("Username:", admin.username);
    console.log("Password: admin123");
    console.log("\nYou can now login with these credentials.");

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();
