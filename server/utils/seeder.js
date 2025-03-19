const mongoose = require('mongoose');
const Visitor = require('../models/Visitor');

// MongoDB URI - using the one that worked in our test
const MONGO_URI = "mongodb+srv://hareshswork:McPghY7ofQNf24Dz@vms.oqbam.mongodb.net/?retryWrites=true&w=majority";
console.log("MongoDB URI:", MONGO_URI);

// Connect to MongoDB with simplified approach that worked
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for seeding'))
  .catch(err => {
    console.error(`❌ Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  });

// Sample visitor data
const visitors = [
  {
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    phone: '9876543210',
    purpose: 'Parent Teacher Meeting',
    whomToMeet: 'Prof. Sharma',
    status: 'checked-in',
    checkInTime: new Date(),
    visitorId: 'VIS-001',
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
    visitorId: 'VIS-002',
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
    visitorId: 'VIS-003',
    timestamp: new Date(),
    lastUpdated: new Date()
  },
  {
    name: 'Anjali Desai',
    email: 'anjali@example.com',
    phone: '9876543213',
    purpose: 'Project Discussion',
    whomToMeet: 'Prof. Mehta',
    status: 'checked-in',
    checkInTime: new Date(),
    visitorId: 'VIS-004',
    timestamp: new Date(),
    lastUpdated: new Date()
  },
  {
    name: 'Karthik Reddy',
    email: 'karthik@example.com',
    phone: '9876543214',
    purpose: 'Job Interview',
    whomToMeet: 'HR Department',
    status: 'rejected',
    visitorId: 'VIS-005',
    timestamp: new Date(),
    lastUpdated: new Date()
  }
];

// Import data
const importData = async () => {
  try {
    await Visitor.deleteMany();
    console.log('All existing visitors deleted');
    
    await Visitor.insertMany(visitors);
    console.log('✅ Sample visitors imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

// Delete all data
const destroyData = async () => {
  try {
    await Visitor.deleteMany();
    console.log('✅ All visitor data destroyed!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

// Check command line args
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
} 