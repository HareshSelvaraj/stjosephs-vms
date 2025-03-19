const asyncHandler = require('express-async-handler');
const Staff = require('../models/Staff');
const Visitor = require('../models/Visitor');
const Visit = require('../models/Visit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Auth staff & get token
// @route   POST /api/staff/login
// @access  Public
const loginStaff = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const staff = await Staff.findOne({ email });

  if (staff && (await bcrypt.compare(password, staff.password))) {
    res.json({
      _id: staff._id,
      name: staff.name,
      email: staff.email,
      department: staff.department,
      token: generateToken(staff._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get staff profile
// @route   GET /api/staff/profile
// @access  Private
const getStaffProfile = asyncHandler(async (req, res) => {
  const staff = await Staff.findById(req.staff._id);

  if (staff) {
    res.json({
      _id: staff._id,
      name: staff.name,
      email: staff.email,
      department: staff.department,
    });
  } else {
    res.status(404);
    throw new Error('Staff not found');
  }
});

// @desc    Get visitors for this staff
// @route   GET /api/staff/visitors
// @access  Private
const getStaffVisitors = asyncHandler(async (req, res) => {
  const visitors = await Visitor.find({ whomToMeet: req.staff.name });
  res.json(visitors);
});

// @desc    Get active visits for this staff
// @route   GET /api/staff/active-visits
// @access  Private
const getActiveVisits = asyncHandler(async (req, res) => {
  // Find all visitors that are visiting this staff member
  const visitors = await Visitor.find({ whomToMeet: req.staff.name }).select('_id');
  const visitorIds = visitors.map(visitor => visitor._id);

  // Find active visits for these visitors
  const visits = await Visit.find({
    visitor: { $in: visitorIds },
    status: 'Active'
  }).populate('visitor', 'name email phone purpose visitType');

  res.json(visits);
});

// @desc    Register a new staff
// @route   POST /api/staff/register
// @access  Private (Admin only)
const registerStaff = asyncHandler(async (req, res) => {
  const { name, email, password, department } = req.body;

  const staffExists = await Staff.findOne({ email });

  if (staffExists) {
    res.status(400);
    throw new Error('Staff already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const staff = await Staff.create({
    name,
    email,
    password: hashedPassword,
    department,
  });

  if (staff) {
    res.status(201).json({
      _id: staff._id,
      name: staff.name,
      email: staff.email,
      department: staff.department,
      token: generateToken(staff._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid staff data');
  }
});

// @desc    Get pending visits for staff approval
// @route   GET /api/staff/pending-visits
// @access  Private
const getPendingVisits = asyncHandler(async (req, res) => {
  // Find all visitors that are visiting this staff member
  const visitors = await Visitor.find({ 
    whomToMeet: req.staff.name,
    isPreRegistered: true 
  }).select('_id');
  
  const visitorIds = visitors.map(visitor => visitor._id);

  // Find visitors that are pre-registered but not yet checked in
  const pendingVisitors = await Visitor.find({
    _id: { $in: visitorIds },
    isPreRegistered: true
  });

  res.json(pendingVisitors);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  loginStaff,
  getStaffProfile,
  getStaffVisitors,
  getActiveVisits,
  registerStaff,
  getPendingVisits,
}; 