const express = require('express');
const router = express.Router();
const { 
  registerVisitor,
  getVisitorById,
  getVisitors,
  checkInVisitor,
  checkOutVisitor
} = require('../controllers/visitorController');

// @route   POST api/visitors/register
// @desc    Register a new visitor
// @access  Public
router.post('/register', registerVisitor);

// @route   GET api/visitors
// @desc    Get all visitors
// @access  Private (Admin/Staff)
router.get('/', getVisitors);

// @route   GET api/visitors/:id
// @desc    Get visitor by ID
// @access  Private (Admin/Staff)
router.get('/:id', getVisitorById);

// @route   POST api/visitors/checkin
// @desc    Check in a visitor
// @access  Private (Admin/Staff)
router.post('/checkin', checkInVisitor);

// @route   POST api/visitors/checkout/:id
// @desc    Check out a visitor
// @access  Private (Admin/Staff)
router.post('/checkout/:id', checkOutVisitor);

module.exports = router;
