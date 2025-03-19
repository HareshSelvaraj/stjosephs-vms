const asyncHandler = require('express-async-handler');
const Admin = require('../models/Admin');
const Visitor = require('../models/Visitor');
const Visit = require('../models/Visit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Private
const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id);

  if (admin) {
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } else {
    res.status(404);
    throw new Error('Admin not found');
  }
});

// @desc    Get all visitors
// @route   GET /api/admin/visitors
// @access  Private
const getAllVisitors = asyncHandler(async (req, res) => {
  const visitors = await Visitor.find({});
  res.json(visitors);
});

// @desc    Get all visits
// @route   GET /api/admin/visits
// @access  Private
const getAllVisits = asyncHandler(async (req, res) => {
  const visits = await Visit.find({}).populate('visitor', 'name email phone');
  res.json(visits);
});

// @desc    Get visit statistics
// @route   GET /api/admin/stats
// @access  Private
const getVisitStats = asyncHandler(async (req, res) => {
  const totalVisitors = await Visitor.countDocuments();
  const totalVisits = await Visit.countDocuments();
  const activeVisits = await Visit.countDocuments({ status: 'Active' });
  
  // Get today's date at midnight
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todayVisits = await Visit.countDocuments({
    checkInTime: { $gte: today }
  });

  res.json({
    totalVisitors,
    totalVisits,
    activeVisits,
    todayVisits
  });
});

// @desc    Register a new admin
// @route   POST /api/admin/register
// @access  Private (Super Admin)
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    res.status(400);
    throw new Error('Admin already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const admin = await Admin.create({
    name,
    email,
    password: hashedPassword,
  });

  if (admin) {
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid admin data');
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  loginAdmin,
  getAdminProfile,
  getAllVisitors,
  getAllVisits,
  getVisitStats,
  registerAdmin,
}; 