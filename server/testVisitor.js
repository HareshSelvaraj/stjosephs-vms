const mongoose = require('mongoose');

// MongoDB URI
const MONGO_URI = "mongodb+srv://hareshswork:TyAo6h5x19Ph5NUg@vms.oqbam.mongodb.net/?retryWrites=true&w=majority&appName=VMS";
console.log("MongoDB URI:", MONGO_URI);

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  });

// Define Visitor schema directly in this file
const visitorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    required: true
  },
  whomToMeet: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'checked-in', 'checked-out', 'rejected'],
    default: 'pending'
  },
  checkInTime: {
    type: Date
  },
  checkOutTime: {
    type: Date
  },
  visitorId: {
    type: String,
    unique: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const Visitor = mongoose.model('Visitor', visitorSchema);

// Create a test visitor
const createTestVisitor = async () => {
  try {
    // Delete all existing visitors first
    await Visitor.deleteMany({});
    console.log('All existing visitors deleted');

    // Create a new visitor
    const visitor = new Visitor({
      name: 'Test Visitor',
      email: 'test@example.com',
      phone: '1234567890',
      purpose: 'Testing',
      whomToMeet: 'Admin',
      status: 'checked-in',
      checkInTime: new Date(),
      visitorId: `VIS-${Date.now()}`,
      timestamp: new Date(),
      lastUpdated: new Date()
    });

    await visitor.save();
    console.log('Test visitor created successfully');
    
    // Create more visitors
    const moreVisitors = [
      {
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        phone: '9876543210',
        purpose: 'Parent Teacher Meeting',
        whomToMeet: 'Prof. Sharma',
        status: 'checked-in',
        checkInTime: new Date(),
        visitorId: `VIS-${Date.now()}-1`,
        timestamp: new Date(),
        lastUpdated: new Date()
      },
      {
        name: 'Priya Sharma',
        email: 'priya@example.com',
        phone: '9876543211',
        purpose: 'Admission Enquiry',
        whomToMeet: 'Admission Office',
        status: 'checked-out',
        checkInTime: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
        checkOutTime: new Date(),
        visitorId: `VIS-${Date.now()}-2`,
        timestamp: new Date(),
        lastUpdated: new Date()
      },
      {
        name: 'Vikram Singh',
        email: 'vikram@example.com',
        phone: '9876543212',
        purpose: 'Campus Tour',
        whomToMeet: 'Student Coordinator',
        status: 'pending',
        visitorId: `VIS-${Date.now()}-3`,
        timestamp: new Date(),
        lastUpdated: new Date()
      }
    ];

    await Visitor.insertMany(moreVisitors);
    console.log('Additional visitors created successfully');

    // List all visitors to confirm
    const allVisitors = await Visitor.find({});
    console.log(`Found ${allVisitors.length} visitors in the database:`);
    allVisitors.forEach(v => console.log(`- ${v.name} (${v.status})`));

    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

createTestVisitor(); 