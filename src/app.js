const express = require("express");
const { User } = require("./models");

const app = express();

// Basic middleware
app.use(express.json());

// Test route
app.get("/health", (req, res) => {
  res.json({
    status: "success",
    message: "Server is running!",
    timestamp: new Date().toISOString(),
  });
});

// TEST ROUTE - Create a user (we'll remove this later)
app.post("/test/create-user", async (req, res) => {
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: req.body.role || "customer",
    });

    res.status(201).json({
      status: "success",
      message: "User created successfully!",
      data: user, // Password will be hidden by toJSON()
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
});

// TEST ROUTE - Get all users
app.get("/test/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({
      status: "success",
      results: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

module.exports = app;
