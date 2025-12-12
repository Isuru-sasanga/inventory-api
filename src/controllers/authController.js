const jwt = require("jsonwebtoken");
const { User } = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

// Generate JWT token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Send token response
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

// Register new user
exports.register = catchAsync(async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return next(new AppError("Email already in use", 400));
  }

  // Create new user
  const newUser = await User.create({
    email,
    password,
    firstName,
    lastName,
    role: "customer",
  });

  // Send token
  createSendToken(newUser, 201, res);
});

// Login user
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password provided
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // Find user by email
  const user = await User.findOne({ where: { email } });

  // Check if user exists and password is correct
  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // Check if user is active
  if (!user.isActive) {
    return next(new AppError("Your account has been deactivated", 401));
  }

  // Send token
  createSendToken(user, 200, res);
});
