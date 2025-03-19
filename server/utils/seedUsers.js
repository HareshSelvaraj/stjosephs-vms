const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Staff = require('../models/Staff');

// MongoDB URI - using the one that worked in our test
const MONGO_URI = "mongodb+srv://hareshswork:McPghY7ofQNf24Dz@vms.oqbam.mongodb.net/?retryWrites=true&w=majority";
console.log("MongoDB URI:", MONGO_URI);

// Connect to MongoDB with simplified approach that worked
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for seeding users'))
  .catch(err => {
    console.error(`❌ Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  });

// Hash password function
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Sample admin data
const seedAdmins = async () => {
  try {
    // Clear existing data
    await Admin.deleteMany({});
    console.log('All existing admins deleted');
    
    // Create new admin
    const adminPassword = await hashPassword('admin123');
    
    const admin = await Admin.create({
      name: 'Admin User',
      email: 'admin@stjosephs.edu',
      password: adminPassword,
      lastLogin: new Date()
    });
    
    console.log('✅ Admin user created:', admin.email);
    return true;
  } catch (error) {
    console.error(`❌ Error creating admin: ${error.message}`);
    return false;
  }
};

// Sample staff data
const seedStaffs = async () => {
  try {
    // Clear existing data
    await Staff.deleteMany({});
    console.log('All existing staff deleted');
    
    // Create new staff members
    const staffPassword = await hashPassword('staff123');
    
    const staffMembers = [
      {
        name: 'John Smith',
        email: 'staff@stjosephs.edu',
        password: staffPassword,
        department: 'Computer Science',
        lastLogin: new Date()
      },
      {
        name: 'Prof. Sharma',
        email: 'sharma@stjosephs.edu',
        password: staffPassword,
        department: 'Mathematics',
        lastLogin: new Date()
      },
      {
        name: 'Prof. Mehta',
        email: 'mehta@stjosephs.edu',
        password: staffPassword,
        department: 'Physics',
        lastLogin: new Date()
      }
    ];
    
    const createdStaff = await Staff.insertMany(staffMembers);
    
    console.log(`✅ ${createdStaff.length} staff members created`);
    for (const staff of createdStaff) {
      console.log(`  - ${staff.name} (${staff.email})`);
    }
    
    return true;
  } catch (error) {
    console.error(`❌ Error creating staff: ${error.message}`);
    return false;
  }
};

// Main function to seed all users
const seedAllUsers = async () => {
  console.log('Starting to seed users...');
  
  const adminSuccess = await seedAdmins();
  const staffSuccess = await seedStaffs();
  
  if (adminSuccess && staffSuccess) {
    console.log('✅ All users seeded successfully!');
  } else {
    console.log('❌ Some users failed to seed.');
  }
  
  // Disconnect from database
  mongoose.disconnect();
  console.log('Disconnected from MongoDB');
};

// Run the seeding function
seedAllUsers(); 