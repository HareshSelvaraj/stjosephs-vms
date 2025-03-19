import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { getVisitors, updateVisitorStatus } from '../../services/visitorService';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const VisitorList = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    const fetchVisitors = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch data from MongoDB through API
        const data = await getVisitors();
        setVisitors(data);
      } catch (error) {
        console.error('Error fetching visitors:', error);
        setError('Failed to load visitor data');
        toast.error('Failed to load visitor data');
      } finally {
        setLoading(false);
      }
    };

    fetchVisitors();
    // Set up a timer to refresh the data every minute
    const refreshInterval = setInterval(fetchVisitors, 60000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  // Filter and sort visitors
  const filteredVisitors = visitors
    .filter(visitor => {
      // Apply status filter
      if (filterStatus !== 'all' && visitor.status !== filterStatus) {
        return false;
      }
      
      // Apply search filter
      const searchLower = searchTerm.toLowerCase();
      return (
        searchTerm === '' ||
        visitor.name?.toLowerCase().includes(searchLower) ||
        visitor.email?.toLowerCase().includes(searchLower) ||
        visitor.phone?.toLowerCase().includes(searchLower) ||
        visitor.purpose?.toLowerCase().includes(searchLower) ||
        visitor.whomToMeet?.toLowerCase().includes(searchLower) ||
        visitor.visitorId?.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === 'timestamp') {
        return sortOrder === 'asc'
          ? new Date(a.timestamp) - new Date(b.timestamp)
          : new Date(b.timestamp) - new Date(a.timestamp);
      }
      return 0;
    });

  const handleStatusChange = async (visitorId, newStatus) => {
    try {
      const updatedVisitor = await updateVisitorStatus(visitorId, newStatus);
      if (updatedVisitor) {
        setVisitors(prevVisitors => 
          prevVisitors.map(visitor => 
            visitor._id === visitorId 
              ? { ...visitor, status: newStatus, lastUpdated: new Date().toISOString() }
              : visitor
          )
        );
        toast.success(`Visitor status updated to ${newStatus}`);
      }
    } catch (error) {
      console.error('Error updating visitor status:', error);
      toast.error('Failed to update visitor status');
    }
  };

  // Format timestamp to readable format
  const formatTimestamp = (timestamp) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      return 'Invalid date';
    }
  };

  // Function to get status display name
  const getStatusDisplayName = (status) => {
    switch(status) {
      case 'checked-in': return 'Checked In';
      case 'checked-out': return 'Checked Out';
      case 'pending': return 'Pending';
      case 'rejected': return 'Rejected';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <div className={`text-lg ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>{error}</div>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <div className="flex items-center mb-2">
            <button 
              onClick={() => navigate('/admin/dashboard')} 
              className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Back to dashboard"
            >
              <FaArrowLeft className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            </button>
            <h1 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Visitors</h1>
          </div>
          <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            A list of all visitors who have registered to visit the campus.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor="search" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Search
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'border-gray-300'
            }`}
            placeholder="Search visitors..."
          />
        </div>

        <div>
          <label htmlFor="status-filter" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Status
          </label>
          <select
            id="status-filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'border-gray-300'
            }`}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="checked-in">Checked In</option>
            <option value="checked-out">Checked Out</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label htmlFor="sort-by" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Sort By
          </label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'border-gray-300'
            }`}
          >
            <option value="timestamp">Date</option>
            <option value="name">Name</option>
          </select>
        </div>

        <div>
          <label htmlFor="sort-order" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Order
          </label>
          <select
            id="sort-order"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'border-gray-300'
            }`}
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>
      
      {/* Visitors table */}
      <div className={`mt-8 flex flex-col ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg`}>
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className={`py-3.5 pl-4 pr-3 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    Visitor ID
                  </th>
                  <th scope="col" className={`py-3.5 px-3 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    Name
                  </th>
                  <th scope="col" className={`py-3.5 px-3 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    Contact
                  </th>
                  <th scope="col" className={`py-3.5 px-3 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    Purpose
                  </th>
                  <th scope="col" className={`py-3.5 px-3 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    Host
                  </th>
                  <th scope="col" className={`py-3.5 px-3 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    Registered
                  </th>
                  <th scope="col" className={`py-3.5 px-3 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    Status
                  </th>
                  <th scope="col" className={`py-3.5 px-3 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {filteredVisitors.length === 0 ? (
                  <tr>
                    <td colSpan="8" className={`py-10 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      No visitors found.
                    </td>
                  </tr>
                ) : (
                  filteredVisitors.map((visitor) => (
                    <tr key={visitor._id} className={isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                      <td className={`whitespace-nowrap py-4 pl-4 pr-3 text-sm ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-900'
                      } font-medium`}>
                        {visitor.visitorId}
                      </td>
                      <td className={`whitespace-nowrap px-3 py-4 text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                        {visitor.name}
                      </td>
                      <td className={`whitespace-nowrap px-3 py-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        <div>{visitor.email}</div>
                        <div>{visitor.phone}</div>
                      </td>
                      <td className={`whitespace-nowrap px-3 py-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        {visitor.purpose}
                      </td>
                      <td className={`whitespace-nowrap px-3 py-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        {visitor.whomToMeet}
                      </td>
                      <td className={`whitespace-nowrap px-3 py-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        {formatTimestamp(visitor.timestamp)}
                      </td>
                      <td className={`whitespace-nowrap px-3 py-4 text-sm`}>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          visitor.status === 'checked-in' ? 'bg-green-100 text-green-800' :
                          visitor.status === 'checked-out' ? 'bg-gray-100 text-gray-800' :
                          visitor.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {getStatusDisplayName(visitor.status)}
                        </span>
                      </td>
                      <td className={`whitespace-nowrap px-3 py-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        <div className="flex space-x-2">
                          {visitor.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleStatusChange(visitor._id, 'checked-in')}
                                className="text-green-600 hover:text-green-900"
                              >
                                Check In
                              </button>
                              <button
                                onClick={() => handleStatusChange(visitor._id, 'rejected')}
                                className="text-red-600 hover:text-red-900"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {visitor.status === 'checked-in' && (
                            <button
                              onClick={() => handleStatusChange(visitor._id, 'checked-out')}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Check Out
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorList;
