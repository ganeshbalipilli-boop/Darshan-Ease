const Booking = require("../models/Booking");
const Slot = require("../models/Slot");

// Book Darshan
const bookSlot = async (req, res) => {
  try {
    const { temple, slot, numberOfPersons } = req.body;

    const slotData = await Slot.findById(slot);

    if (!slotData) {
      return res.status(404).json({
        message: "Slot not found",
      });
    }

    if (slotData.availableSeats < numberOfPersons) {
      return res.status(400).json({
        message: "Not enough seats available",
      });
    }

    // Reduce available seats
    slotData.availableSeats -= numberOfPersons;
    await slotData.save();

    // Create booking
    const booking = await Booking.create({
      user: req.user._id,
      temple,
      slot,
      numberOfPersons,
    });

    res.status(201).json({
      message: "Darshan booked successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get My Bookings
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user._id,
    })
      .populate("temple")
      .populate("slot");

    res.json(bookings);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  bookSlot,
  getMyBookings,
};
// Cancel Booking
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // Check ownership
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // Restore seats
    const slot = await Slot.findById(booking.slot);

    slot.availableSeats += booking.numberOfPersons;

    await slot.save();

    booking.bookingStatus = "Cancelled";

    await booking.save();

    res.json({
      message: "Booking cancelled successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("temple", "templeName")
      .populate("slot", "date time");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    booking.bookingStatus = req.body.bookingStatus;

    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  bookSlot,
  getMyBookings,
  cancelBooking,
  getAllBookings,
  updateBookingStatus,
};