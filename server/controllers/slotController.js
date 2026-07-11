const Slot = require("../models/Slot");

// Add Slot
const addSlot = async (req, res) => {
  try {
    const slot = await Slot.create(req.body);

    res.status(201).json(slot);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getSlots = async (req, res) => {
  try {
    const slots = await Slot.find().populate(
      "temple",
      "templeName location"
    );

    res.json(slots);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getSlotById = async (req, res) => {
  try {
    const slot = await Slot.findById(req.params.id).populate(
      "temple",
      "templeName location"
    );

    if (!slot) {
      return res.status(404).json({
        message: "Slot not found",
      });
    }

    res.json(slot);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteSlot = async (req, res) => {
  try {
    const slot = await Slot.findByIdAndDelete(req.params.id);

    if (!slot) {
      return res.status(404).json({
        message: "Slot not found",
      });
    }

    res.json({
      message: "Slot deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Update Slot
const updateSlot = async (req, res) => {
  try {
    const slot = await Slot.findById(req.params.id);

    if (!slot) {
      return res.status(404).json({
        message: "Slot not found",
      });
    }

    const updatedSlot = await Slot.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json(updatedSlot);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addSlot,
  getSlots,
  getSlotById,
  deleteSlot,
  updateSlot,
};