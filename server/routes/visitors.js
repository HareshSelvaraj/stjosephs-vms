const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');
// Commented out for testing purposes
// const { protect } = require('../middleware/authMiddleware');

// @route   GET api/visitors
// @desc    Get all visitors
// @access  Public (for testing)
router.get('/', async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ timestamp: -1 });
    res.json(visitors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST api/visitors
// @desc    Register a new visitor
// @access  Public
router.post('/', async (req, res) => {
  try {
    const visitorId = `VIS-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const visitor = new Visitor({
      ...req.body,
      visitorId,
      timestamp: new Date(),
      lastUpdated: new Date()
    });
    const newVisitor = await visitor.save();
    res.status(201).json(newVisitor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT api/visitors/:id
// @desc    Update visitor status
// @access  Public (for testing)
router.put('/:id', async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);
    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }

    const { status } = req.body;
    visitor.status = status;
    visitor.lastUpdated = new Date();

    if (status === 'checked-in') {
      visitor.checkInTime = new Date();
    } else if (status === 'checked-out') {
      visitor.checkOutTime = new Date();
    }

    const updatedVisitor = await visitor.save();
    res.json(updatedVisitor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
