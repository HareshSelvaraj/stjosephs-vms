import axiosInstance from '../utils/axios';

// Login user (admin or staff)
export const login = async (credentials) => {
  try {
    const { userType, email, password } = credentials;
    const response = await axiosInstance.post(`/${userType}/login`, { email, password });
    
    // Store the token in localStorage
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userType', userType);
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error.response?.data || error.message;
  }
};

// Logout user
export const logout = () => {
  // Remove token from localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('userType');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

// Get current user type (admin or staff)
export const getUserType = () => {
  return localStorage.getItem('userType');
}; 