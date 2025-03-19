const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Admin = require('../models/Admin');
const Staff = require('../models/Staff');

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check if token is for admin or staff
      let user = await Admin.findById(decoded.id).select('-password');
      
      if (user) {
        req.admin = user;
      } else {
        user = await Staff.findById(decoded.id).select('-password');
        if (user) {
          req.staff = user;
        } else {
          res.status(401);
          throw new Error('Not authorized, token failed');
        }
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Admin middleware
const admin = (req, res, next) => {
  if (req.admin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

// Staff middleware
const staff = (req, res, next) => {
  if (req.staff) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as a staff member');
  }
};

module.exports = { protect, admin, staff }; 