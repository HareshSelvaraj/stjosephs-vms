const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    required: true
  },
  visitType: {
    type: String,
    enum: ['Parent', 'Guest', 'Vendor', 'Other'],
    default: 'Guest'
  },
  whomToMeet: {
    type: String,
    required: true
  },
  idProofType: {
    type: String,
    enum: ['Aadhar', 'PAN', 'Driving License', 'Passport', 'Voter ID', 'Other'],
    required: true
  },
  idProofNumber: {
    type: String,
    required: true
  },
  qrCode: {
    type: String
  },
  isPreRegistered: {
    type: Boolean,
    default: false
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Visitor', VisitorSchema);
