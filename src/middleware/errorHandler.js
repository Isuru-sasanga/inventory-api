const AppError = require("../utils/AppError");

// Send error response
const sendError = (err, res) => {
  // Operational, trusted error
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // Programming or unknown error
  else {
    console.error("ERROR", err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

// Global error handling middleware
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Handle Sequelize unique constraint errors
  if (err.name === "SequelizeUniqueConstraintError") {
    err = new AppError("Email already exists", 400);
  }

  // Handle Sequelize validation errors
  if (err.name === "SequelizeValidationError") {
    const message = err.errors.map((e) => e.message).join(", ");
    err = new AppError(message, 400);
  }

  sendError(err, res);
};
