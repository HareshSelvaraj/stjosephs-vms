const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Staff = require('../models/Staff');

// Load env vars
dotenv.config();

// Connect to DB with more robust error handling
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

// Seed data
const seedData = async () => {
  try {
    // Connect to the database first
    await connectDB();
    
    // Clear existing data
    await Admin.deleteMany();
    await Staff.deleteMany();

    console.log('Data cleared...');

    // Create admin
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);
    const staffPassword = await bcrypt.hash('staff123', salt);

    await Admin.create({
      name: 'Admin User',
      email: 'admin@stjosephs.edu',
      password: adminPassword,
      role: 'SuperAdmin'
    });

    console.log('Admin user created');

    await Staff.create({
      name: 'Staff Member',
      email: 'staff@stjosephs.edu',
      password: staffPassword,
      department: 'Computer Science',
      position: 'Professor',
      officeLocation: 'Main Building, Room 101'
    });

    console.log('Staff member created');
    console.log('Data imported successfully');
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    // Connect to the database first
    await connectDB();
    
    await Admin.deleteMany();
    await Staff.deleteMany();

    console.log('Data destroyed...');
    process.exit(0);
  } catch (error) {
    console.error(`Error deleting data: ${error.message}`);
    process.exit(1);
  }
};

// Handle command line arguments
if (process.argv[2] === '-d') {
  deleteData();
} else {
  seedData();
} 