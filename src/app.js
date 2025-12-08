const express = require("express");

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

module.exports = app;
