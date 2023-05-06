const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    required: true,
  },
  flightNumber: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  departureDate: {
    type: Date,
    required: true,
  },

  firstclassCount: {
    type: Number,
    required: true,
  },
  economyclassCount: {
    type: Number,
    required: true,
  },

  businessclassCount: {
    type: Number,
    required: true,
  },
  firstclassocc: {
    type: Number,
    required: true,
  },
  economyclassocc: {
    type: Number,
    required: true,
  },
  businessclassocc: {
    type: Number,
    required: true,
  }
 
});


const Flight = mongoose.model('Flight', flightSchema);


module.exports=Flight;
