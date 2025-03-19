import React from 'react';
import { Navigate } from 'react-router-dom';

const StaffRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Check if user is staff
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.role !== 'staff') {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default StaffRoute; 