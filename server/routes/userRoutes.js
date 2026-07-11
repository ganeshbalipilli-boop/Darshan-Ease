const express = require("express");
const router = express.Router();

const {
  getProfile,
  getAllUsers,
} = require("../controllers/userController");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

router.get("/profile", protect, getProfile);

// Admin Route
router.get("/", protect, admin, getAllUsers);

module.exports = router;