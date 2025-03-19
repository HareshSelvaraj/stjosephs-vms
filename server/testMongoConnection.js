const mongoose = require('mongoose');

// MongoDB connection string with updated password
const MONGO_URI = "mongodb+srv://hareshswork:McPghY7ofQNf24Dz@vms.oqbam.mongodb.net/?retryWrites=true&w=majority&appName=VMS";
console.log('Attempting to connect to MongoDB with URI:', MONGO_URI);

// Connect with minimal options to avoid errors
mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 30000 // Increase timeout to 30 seconds
})
  .then(() => {
    console.log('✅ MongoDB Connected Successfully!');
    
    // Create a simple model
    const TestSchema = new mongoose.Schema({
      name: String,
      date: { type: Date, default: Date.now }
    });
    
    const Test = mongoose.model('Test', TestSchema);
    
    // Try to write something to the database
    return Test.create({ name: 'Connection Test' })
      .then(doc => {
        console.log('✅ Successfully created document:', doc);
        return mongoose.connection.close();
      })
      .then(() => {
        console.log('✅ Connection closed successfully.');
        process.exit(0);
      });
  })
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  }); 