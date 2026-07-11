const Temple = require("../models/Temple");

// Add Temple
const createTemple = async (req, res) => {
  try {
    const temple = await Temple.create(req.body);
    res.status(201).json(temple);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Temples
const getTemples = async (req, res) => {
  try {
    const temples = await Temple.find();
    res.json(temples);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Temple By ID
const getTempleById = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);

    if (!temple) {
      return res.status(404).json({
        message: "Temple not found",
      });
    }

    res.json(temple);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Temple
const updateTemple = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);

    if (!temple) {
      return res.status(404).json({
        message: "Temple not found",
      });
    }

    const updatedTemple = await Temple.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json(updatedTemple);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Temple
const deleteTemple = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);

    if (!temple) {
      return res.status(404).json({
        message: "Temple not found",
      });
    }

    await temple.deleteOne();

    res.json({
      message: "Temple deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getTemples,
  getTempleById,
  createTemple,
  updateTemple,
  deleteTemple,
};