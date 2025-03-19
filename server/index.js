const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// MongoDB URI with updated password - now using the one that worked in our test
const MONGO_URI = "mongodb+srv://hareshswork:McPghY7ofQNf24Dz@vms.oqbam.mongodb.net/?retryWrites=true&w=majority";
console.log("MongoDB URI:", MONGO_URI);

// Connect with minimal options - simplified approach that worked in our test
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch(err => {
    console.error(`❌ Error connecting to MongoDB: ${err.message}`);
    // Don't exit the process, allow the app to run with fallback data
  });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/visitors', require('./routes/visitors'));
app.use('/api/staff', require('./routes/staff'));
app.use('/api/admin', require('./routes/admin'));

// Basic API route
app.get('/api', (req, res) => {
  res.send('Visitor Management System API is running...');
});

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Any route that is not API will be redirected to index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

// Error handler middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
