const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  department: {
    type: String,
    required: true
  },
  position: {
    type: String
  },
  staffId: {
    type: String,
    unique: true,
    sparse: true
  },
  notificationPreference: {
    type: String,
    enum: ['Email', 'SMS', 'Both'],
    default: 'Email'
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  officeLocation: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  }
});

module.exports = mongoose.model('Staff', StaffSchema);
