const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');
const { generateVisitorId } = require('../utils/helpers');

// Get all visitors
router.get('/', async (req, res) => {
  try {
    const visitors = await Visitor.find({}).sort({ timestamp: -1 });
    res.json(visitors);
  } catch (error) {
    console.error('Error fetching visitors:', error);
    res.status(500).json({ message: 'Failed to fetch visitors', error: error.message });
  }
});

// Register a new visitor
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, purpose, whomToMeet } = req.body;
    
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Name, email, and phone are required' });
    }
    
    const visitorId = generateVisitorId();
    
    const visitor = new Visitor({
      visitorId,
      name,
      email,
      phone,
      purpose,
      whomToMeet,
      status: 'pending',
      timestamp: new Date()
    });
    
    const savedVisitor = await visitor.save();
    res.status(201).json(savedVisitor);
  } catch (error) {
    console.error('Error registering visitor:', error);
    res.status(500).json({ message: 'Failed to register visitor', error: error.message });
  }
});

// Update visitor status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }
    
    // Validate status
    const validStatuses = ['pending', 'checked-in', 'checked-out', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Must be one of: pending, checked-in, checked-out, rejected' });
    }
    
    const visitor = await Visitor.findById(id);
    
    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }
    
    visitor.status = status;
    visitor.lastUpdated = new Date();
    
    const updatedVisitor = await visitor.save();
    res.json(updatedVisitor);
  } catch (error) {
    console.error('Error updating visitor status:', error);
    res.status(500).json({ message: 'Failed to update visitor status', error: error.message });
  }
});

// Get visitor by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const visitor = await Visitor.findById(id);
    
    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }
    
    res.json(visitor);
  } catch (error) {
    console.error('Error fetching visitor:', error);
    res.status(500).json({ message: 'Failed to fetch visitor', error: error.message });
  }
});

// Get visitor by visitorId
router.get('/visitorId/:visitorId', async (req, res) => {
  try {
    const { visitorId } = req.params;
    const visitor = await Visitor.findOne({ visitorId });
    
    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }
    
    res.json(visitor);
  } catch (error) {
    console.error('Error fetching visitor by visitorId:', error);
    res.status(500).json({ message: 'Failed to fetch visitor', error: error.message });
  }
});

module.exports = router; 