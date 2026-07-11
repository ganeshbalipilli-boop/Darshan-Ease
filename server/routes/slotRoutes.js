const express = require("express");
const router = express.Router();

const {
  addSlot,
  getSlots,
  getSlotById,
  deleteSlot,
  updateSlot,
} = require("../controllers/slotController");

const { protect, admin } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(getSlots)
  .post(protect, admin, addSlot);

router
  .route("/:id")
  .get(getSlotById)
  .put(protect, admin, updateSlot)
  .delete(protect, admin, deleteSlot);
module.exports = router;