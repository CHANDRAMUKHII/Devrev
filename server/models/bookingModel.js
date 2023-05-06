const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  flightNumber: {
    type: String,
    required: true,
  },
  passengerName: {
    type: String,
    required: true,
  },
  passengerEmail: {
    type: String,
    required: true,
  },
  passengerPhone: {
    type: String,
    required: true,
  },
  bookedcount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
