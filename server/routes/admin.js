const express = require('express');
const router = express.Router();
const {
  loginAdmin,
  getAdminProfile,
  getAllVisitors,
  getAllVisits,
  getVisitStats,
  registerAdmin
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

// @route   POST api/admin/login
// @desc    Authenticate admin
// @access  Public
router.post('/login', loginAdmin);

// @route   GET api/admin/profile
// @desc    Get admin profile
// @access  Private
router.get('/profile', protect, admin, getAdminProfile);

// @route   GET api/admin/visitors
// @desc    Get all visitors
// @access  Private
router.get('/visitors', protect, admin, getAllVisitors);

// @route   GET api/admin/visits
// @desc    Get all visits
// @access  Private
router.get('/visits', protect, admin, getAllVisits);

// @route   GET api/admin/stats
// @desc    Get visit statistics
// @access  Private
router.get('/stats', protect, admin, getVisitStats);

// @route   POST api/admin/register
// @desc    Register a new admin
// @access  Private (Super Admin)
router.post('/register', protect, admin, registerAdmin);

module.exports = router;
