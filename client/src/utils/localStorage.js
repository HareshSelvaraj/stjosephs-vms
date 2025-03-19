// localStorage utility functions for visitor management

// Key for storing visitor data in localStorage
const VISITORS_STORAGE_KEY = 'stjosephs_visitors';

// Get all visitors from localStorage
export const getAllVisitors = () => {
  try {
    const visitors = localStorage.getItem(VISITORS_STORAGE_KEY);
    return visitors ? JSON.parse(visitors) : {};
  } catch (error) {
    console.error('Error getting visitors from localStorage:', error);
    return {};
  }
};

// Get a specific visitor by ID
export const getVisitorById = (visitorId) => {
  const visitors = getAllVisitors();
  return visitors[visitorId] || null;
};

// Save a new visitor
export const saveVisitor = (visitorData) => {
  try {
    // Generate a unique ID if not provided
    const visitorId = visitorData.visitorId || `VIS-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Get existing visitors
    const visitors = getAllVisitors();
    
    // Add timestamp if not present
    const dataToSave = {
      ...visitorData,
      visitorId,
      timestamp: visitorData.timestamp || new Date().toISOString(),
      status: visitorData.status || 'pending' // pending, checked-in, checked-out
    };
    
    // Add the new visitor
    visitors[visitorId] = dataToSave;
    
    // Save back to localStorage
    localStorage.setItem(VISITORS_STORAGE_KEY, JSON.stringify(visitors));
    
    return dataToSave;
  } catch (error) {
    console.error('Error saving visitor to localStorage:', error);
    throw error;
  }
};

// Update visitor status
export const updateVisitorStatus = (visitorId, status) => {
  try {
    const visitors = getAllVisitors();
    
    if (visitors[visitorId]) {
      visitors[visitorId].status = status;
      visitors[visitorId].lastUpdated = new Date().toISOString();
      
      localStorage.setItem(VISITORS_STORAGE_KEY, JSON.stringify(visitors));
      return visitors[visitorId];
    }
    
    return null;
  } catch (error) {
    console.error('Error updating visitor status:', error);
    throw error;
  }
};

// Delete a visitor
export const deleteVisitor = (visitorId) => {
  try {
    const visitors = getAllVisitors();
    
    if (visitors[visitorId]) {
      delete visitors[visitorId];
      localStorage.setItem(VISITORS_STORAGE_KEY, JSON.stringify(visitors));
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error deleting visitor:', error);
    throw error;
  }
}; 