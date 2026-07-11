const express = require("express");
const router = express.Router();

const {
  bookSlot,
  getMyBookings,
  cancelBooking,
  getAllBookings,
} = require("../controllers/bookingController");

const { protect, admin } = require("../middleware/authMiddleware");

router.post("/", protect, bookSlot);
router.get("/my", protect, getMyBookings);
router.put("/:id/cancel", protect, cancelBooking);
router.get("/", protect, admin, getAllBookings);
module.exports = router;