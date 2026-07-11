const User = require("../models/User");
const Temple = require("../models/Temple");
const Slot = require("../models/Slot");
const Booking = require("../models/Booking");

const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTemples = await Temple.countDocuments();
    const totalSlots = await Slot.countDocuments();
    const totalBookings = await Booking.countDocuments();

    const recentBookings = await Booking.find()
      .populate("user", "name")
      .populate("temple", "templeName")
      .populate("slot", "date time")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalUsers,
      totalTemples,
      totalSlots,
      totalBookings,
      recentBookings,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};