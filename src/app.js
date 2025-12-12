const express = require("express");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");
const AppError = require("./utils/AppError");

const app = express();

app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "success",
    message: "Server is running!",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/v1/auth", authRoutes);

// Handle undefined routes
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global error handler (must be last)
app.use(errorHandler);

module.exports = app;
