const express = require("express");
const authController = require("../controllers/authController");
const { validate, schemas } = require("../middleware/validate");

const router = express.Router();

// POST /api/v1/auth/register
router.post("/register", validate(schemas.register), authController.register);

// POST /api/v1/auth/login
router.post("/login", validate(schemas.login), authController.login);

module.exports = router;
