import axios from '../utils/axios';

// Register a new visitor
export const registerVisitor = async (visitorData) => {
  try {
    const response = await axios.post('/visitors/register', visitorData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get all visitors (admin/staff only)
export const getVisitors = async () => {
  try {
    const response = await axios.get('/visitors');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get visitor by ID (admin/staff only)
export const getVisitorById = async (id) => {
  try {
    const response = await axios.get(`/visitors/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Check-in a visitor (admin/staff only)
export const checkInVisitor = async (visitorId) => {
  try {
    const response = await axios.post('/visitors/checkin', { visitorId });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Check-out a visitor (admin/staff only)
export const checkOutVisitor = async (visitorId) => {
  try {
    const response = await axios.post(`/visitors/checkout/${visitorId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}; 