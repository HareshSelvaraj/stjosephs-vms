const asyncHandler = require('express-async-handler');
const Visitor = require('../models/Visitor');
const Visit = require('../models/Visit');
const QRCode = require('qrcode');

// @desc    Register a new visitor
// @route   POST /api/visitors/register
// @access  Public
const registerVisitor = asyncHandler(async (req, res) => {
  console.log('Received visitor registration request:', req.body);
  
  const { name, email, phone, purpose, visitType, whomToMeet, idProofType, idProofNumber } = req.body;

  // Check if visitor already exists
  const visitorExists = await Visitor.findOne({ email });
  console.log('Existing visitor check:', visitorExists ? 'Found' : 'Not found');

  let visitor;
  if (visitorExists) {
    // Update existing visitor
    console.log('Updating existing visitor');
    visitor = visitorExists;
    visitor.name = name;
    visitor.phone = phone;
    visitor.purpose = purpose;
    visitor.visitType = visitType;
    visitor.whomToMeet = whomToMeet;
    visitor.idProofType = idProofType;
    visitor.idProofNumber = idProofNumber;
    visitor.isPreRegistered = true;
    await visitor.save();
  } else {
    // Create new visitor
    console.log('Creating new visitor');
    visitor = await Visitor.create({
      name,
      email,
      phone,
      purpose,
      visitType,
      whomToMeet,
      idProofType,
      idProofNumber,
      isPreRegistered: true
    });
  }

  console.log('Visitor created/updated:', visitor);

  // Generate QR code
  const visitorData = {
    id: visitor._id,
    name: visitor.name,
    email: visitor.email,
    visitType: visitor.visitType
  };

  console.log('Generating QR code for:', visitorData);
  const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(visitorData));
  visitor.qrCode = qrCodeDataUrl;
  await visitor.save();

  if (visitor) {
    console.log('Sending success response');
    res.status(201).json({
      _id: visitor._id,
      name: visitor.name,
      email: visitor.email,
      qrCode: visitor.qrCode,
      isPreRegistered: visitor.isPreRegistered
    });
  } else {
    console.log('Sending error response');
    res.status(400);
    throw new Error('Invalid visitor data');
  }
});

// @desc    Get visitor by ID
// @route   GET /api/visitors/:id
// @access  Private (Admin/Staff)
const getVisitorById = asyncHandler(async (req, res) => {
  console.log('Fetching visitor by ID:', req.params.id);
  const visitor = await Visitor.findById(req.params.id);

  if (visitor) {
    console.log('Visitor found:', visitor);
    res.json(visitor);
  } else {
    console.log('Visitor not found');
    res.status(404);
    throw new Error('Visitor not found');
  }
});

// @desc    Get all visitors
// @route   GET /api/visitors
// @access  Private (Admin/Staff)
const getVisitors = asyncHandler(async (req, res) => {
  console.log('Fetching all visitors');
  const visitors = await Visitor.find({});
  console.log(`Found ${visitors.length} visitors`);
  res.json(visitors);
});

// @desc    Check-in a visitor
// @route   POST /api/visitors/checkin
// @access  Private (Admin/Staff)
const checkInVisitor = asyncHandler(async (req, res) => {
  console.log('Processing check-in for visitor:', req.body.visitorId);
  const { visitorId } = req.body;

  const visitor = await Visitor.findById(visitorId);

  if (!visitor) {
    console.log('Visitor not found for check-in');
    res.status(404);
    throw new Error('Visitor not found');
  }

  // Create a new visit record
  console.log('Creating visit record');
  const visit = await Visit.create({
    visitor: visitorId,
    checkInTime: new Date(),
    status: 'Active'
  });

  if (visit) {
    console.log('Visit record created:', visit);
    res.status(201).json({
      _id: visit._id,
      visitor: visitor.name,
      checkInTime: visit.checkInTime,
      status: visit.status
    });
  } else {
    console.log('Failed to create visit record');
    res.status(400);
    throw new Error('Invalid visit data');
  }
});

// @desc    Check-out a visitor
// @route   POST /api/visitors/checkout/:id
// @access  Private (Admin/Staff)
const checkOutVisitor = asyncHandler(async (req, res) => {
  console.log('Processing check-out for visitor:', req.params.id);
  const visit = await Visit.findOne({ 
    visitor: req.params.id, 
    status: 'Active' 
  }).sort({ checkInTime: -1 });

  if (!visit) {
    console.log('No active visit found for check-out');
    res.status(404);
    throw new Error('No active visit found for this visitor');
  }

  visit.checkOutTime = new Date();
  visit.status = 'Completed';
  
  await visit.save();
  console.log('Visit record updated:', visit);

  res.json({
    _id: visit._id,
    checkInTime: visit.checkInTime,
    checkOutTime: visit.checkOutTime,
    status: visit.status
  });
});

module.exports = {
  registerVisitor,
  getVisitorById,
  getVisitors,
  checkInVisitor,
  checkOutVisitor
}; 