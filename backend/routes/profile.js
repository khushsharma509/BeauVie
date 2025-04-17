const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const profileController = require("../controllers/profileController");

// GET /profile - Get user profile
router.get("/", authMiddleware, profileController.getProfile);

// PUT /profile - Update user profile
router.put("/", authMiddleware, profileController.updateProfile);

module.exports = router;
