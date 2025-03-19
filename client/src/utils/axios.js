import axios from 'axios';
import { toast } from 'react-toastify';

// Create axios instance with base URL
const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to add auth token to every request
axiosInstance.interceptors.request.use(
  config => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, add it to request headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const response = error.response;
    
    // Handle different error responses
    if (response) {
      // Unauthorized (401) - token expired or invalid
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        toast.error('Your session has expired. Please log in again.');
        window.location.href = '/login';
      }
      
      // Forbidden (403) - not enough permissions
      if (response.status === 403) {
        toast.error('You do not have permission to access this resource.');
      }
      
      // Server error (500)
      if (response.status === 500) {
        toast.error('Server error. Please try again later.');
      }
    } else {
      // Network error
      toast.error('Network error. Please check your internet connection.');
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance; 