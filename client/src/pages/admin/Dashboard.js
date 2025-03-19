import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { getVisitors } from '../../services/visitorService';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalVisitors: 0,
    checkIns: 0,
    checkOuts: 0,
    pendingVisitors: 0,
    preRegistrations: 0
  });
  const [recentVisitors, setRecentVisitors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch data from MongoDB through API
        const visitors = await getVisitors();
        
        // Calculate stats
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const stats = {
          totalVisitors: visitors.length,
          checkIns: visitors.filter(v => v.status === 'checked-in').length,
          checkOuts: visitors.filter(v => v.status === 'checked-out').length,
          pendingVisitors: visitors.filter(v => v.status === 'pending').length,
          preRegistrations: visitors.filter(v => v.status === 'pending' && new Date(v.timestamp) >= today).length
        };
        
        setStats(stats);
        
        // Get recent visitors (last 5)
        const recent = visitors
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          .slice(0, 5);
        
        setRecentVisitors(recent);
      } catch (error) {
        console.error('Error in Dashboard component:', error);
        setError('Failed to load visitor data. Please try again later.');
        toast.error('Failed to load visitor data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Refresh data every minute
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <div className={`container mx-auto px-4 py-8 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className={`mr-4 p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors`}
            aria-label="Go back"
          >
            <FaArrowLeft className={isDarkMode ? "text-gray-300" : "text-gray-600"} />
          </button>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <div className="flex space-x-2">
          <Link 
            to="/admin/visitors"
            className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            View All Visitors
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <div className={`rounded-lg shadow-md p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Total Visitors</h3>
          <p className="text-3xl font-bold text-primary">{stats.totalVisitors}</p>
        </div>
        <div className={`rounded-lg shadow-md p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Check-ins Today</h3>
          <p className="text-3xl font-bold text-green-600">{stats.checkIns}</p>
        </div>
        <div className={`rounded-lg shadow-md p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Check-outs Today</h3>
          <p className="text-3xl font-bold text-blue-500">{stats.checkOuts}</p>
        </div>
        <div className={`rounded-lg shadow-md p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Pending Visitors</h3>
          <p className="text-3xl font-bold text-amber-500">{stats.pendingVisitors}</p>
        </div>
        <div className={`rounded-lg shadow-md p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Pre-registrations</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.preRegistrations}</p>
        </div>
      </div>

      {/* Recent Visitors */}
      <div className={`rounded-lg shadow-md p-6 mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Recent Visitors</h2>
          <Link 
            to="/admin/visitors"
            className="text-primary hover:underline text-sm"
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className={isDarkMode ? "bg-gray-700" : "bg-gray-50"}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                  Name
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                  Purpose
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                  Check-in Time
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                  Status
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700 bg-gray-800' : 'divide-gray-200 bg-white'}`}>
              {recentVisitors.length === 0 ? (
                <tr>
                  <td colSpan="5" className={`py-6 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    No recent visitors.
                  </td>
                </tr>
              ) : (
                recentVisitors.map(visitor => (
                  <tr key={visitor._id} className={isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                    <td className={`px-6 py-4 whitespace-nowrap ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                      <div className="text-sm font-medium">{visitor.name}</div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      <div className="text-sm">{visitor.purpose}</div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      <div className="text-sm">
                        {visitor.checkInTime ? new Date(visitor.checkInTime).toLocaleTimeString() : '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        visitor.status === 'checked-in' ? 'bg-green-100 text-green-800' :
                        visitor.status === 'checked-out' ? 'bg-gray-100 text-gray-800' :
                        visitor.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {getStatusDisplayName(visitor.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/admin/visitors/${visitor._id}`} className="text-primary hover:underline text-sm">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions and Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`rounded-lg shadow-md p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Quick Actions</h2>
          <div className="space-y-3">
            <button className={`w-full text-left px-4 py-2 rounded flex items-center ${
              isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
            }`}>
              <span className="mr-2">📊</span> Export Today's Report
            </button>
            <button className={`w-full text-left px-4 py-2 rounded flex items-center ${
              isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
            }`}>
              <span className="mr-2">📝</span> Register New Staff Member
            </button>
            <button className={`w-full text-left px-4 py-2 rounded flex items-center ${
              isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
            }`}>
              <span className="mr-2">🔄</span> Update Campus Map
            </button>
            <button className={`w-full text-left px-4 py-2 rounded flex items-center ${
              isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
            }`}>
              <span className="mr-2">⚙️</span> System Settings
            </button>
          </div>
        </div>

        <div className={`rounded-lg shadow-md p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Analytics Overview</h2>
          <div className={`h-64 rounded-lg flex items-center justify-center ${
            isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-50 text-gray-500'
          }`}>
            <p>Visitor trend graph would appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
