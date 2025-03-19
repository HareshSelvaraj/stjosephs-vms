import axiosInstance from '../utils/axios';

// Register a new visitor
export const registerVisitor = async (visitorData) => {
  try {
    const response = await axiosInstance.post('/visitors/register', visitorData);
    return response.data;
  } catch (error) {
    console.error('Error registering visitor:', error);
    throw error.response?.data || error.message;
  }
};

// Get all visitors (admin/staff only)
export const getVisitors = async () => {
  try {
    const response = await axiosInstance.get('/visitors');
    return response.data;
  } catch (error) {
    console.error('Error fetching visitors:', error);
    throw error;
  }
};

// Get visitor by ID (admin/staff only)
export const getVisitorById = async (id) => {
  try {
    const response = await axiosInstance.get(`/visitors/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching visitor:', error);
    throw error.response?.data || error.message;
  }
};

// Get visitor by visitorId
export const getVisitorByVisitorId = async (visitorId) => {
  try {
    const response = await axiosInstance.get(`/visitors/visitorId/${visitorId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching visitor by visitor ID:', error);
    throw error.response?.data || error.message;
  }
};

// Update visitor status
export const updateVisitorStatus = async (visitorId, status) => {
  try {
    const response = await axiosInstance.patch(`/visitors/${visitorId}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating visitor status:', error);
    throw error;
  }
}; 