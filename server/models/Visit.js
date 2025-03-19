const mongoose = require('mongoose');

const VisitSchema = new mongoose.Schema({
  visitor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Visitor',
    required: true
  },
  staffMember: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
    required: true
  },
  checkInTime: {
    type: Date,
    default: Date.now
  },
  checkOutTime: {
    type: Date
  },
  visitStatus: {
    type: String,
    enum: ['Scheduled', 'Checked In', 'Checked Out', 'Cancelled', 'Rejected'],
    default: 'Scheduled'
  },
  purpose: {
    type: String,
    required: true
  },
  accessAreas: {
    type: [String],
    default: ['Main Building']
  },
  comments: {
    type: String
  },
  expectedDuration: {
    type: Number, // in minutes
    default: 60
  },
  scheduledTime: {
    type: Date
  },
  badgeNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  securityNotes: {
    type: String
  },
  hostNotes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
VisitSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Visit', VisitSchema);
