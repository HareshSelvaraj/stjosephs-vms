const express = require('express');
const router = express.Router();
const {
  loginStaff,
  getStaffProfile,
  getStaffVisitors,
  getActiveVisits,
  registerStaff,
  getPendingVisits
} = require('../controllers/staffController');
const { protect, staff } = require('../middleware/authMiddleware');

// @route   POST api/staff/login
// @desc    Authenticate staff
// @access  Public
router.post('/login', loginStaff);

// @route   GET api/staff/profile
// @desc    Get staff profile
// @access  Private
router.get('/profile', protect, staff, getStaffProfile);

// @route   GET api/staff/visitors
// @desc    Get all visitors for this staff
// @access  Private
router.get('/visitors', protect, staff, getStaffVisitors);

// @route   GET api/staff/active-visits
// @desc    Get active visits for this staff
// @access  Private
router.get('/active-visits', protect, staff, getActiveVisits);

// @route   GET api/staff/pending-visits
// @desc    Get pending visits for staff approval
// @access  Private
router.get('/pending-visits', protect, staff, getPendingVisits);

// @route   POST api/staff/register
// @desc    Register a new staff member (Admin only)
// @access  Private
router.post('/register', registerStaff);

module.exports = router;
