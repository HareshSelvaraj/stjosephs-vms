const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    required: true
  },
  whomToMeet: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'checked-in', 'checked-out', 'rejected'],
    default: 'pending'
  },
  checkInTime: {
    type: Date
  },
  checkOutTime: {
    type: Date
  },
  visitorId: {
    type: String,
    unique: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Visitor', visitorSchema);
