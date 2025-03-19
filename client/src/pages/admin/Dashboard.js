import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Mock data for dashboard
  const stats = {
    totalVisitors: 125,
    checkIns: 42,
    checkOuts: 38,
    pendingVisitors: 4,
    preRegistrations: 18
  };

  const recentVisitors = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      purpose: 'Parent Teacher Meeting',
      checkInTime: '09:30 AM',
      status: 'Checked In'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      purpose: 'Admission Enquiry',
      checkInTime: '10:15 AM',
      status: 'Checked Out'
    },
    {
      id: '3',
      name: 'Vikram Singh',
      purpose: 'Campus Tour',
      checkInTime: '11:00 AM',
      status: 'In Meeting'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Go back"
          >
            <FaArrowLeft className="text-gray-600" />
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
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Visitors</h3>
          <p className="text-3xl font-bold text-primary">{stats.totalVisitors}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-sm font-medium text-gray-500">Check-ins Today</h3>
          <p className="text-3xl font-bold text-green-600">{stats.checkIns}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-sm font-medium text-gray-500">Check-outs Today</h3>
          <p className="text-3xl font-bold text-blue-500">{stats.checkOuts}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-sm font-medium text-gray-500">Pending Visitors</h3>
          <p className="text-3xl font-bold text-amber-500">{stats.pendingVisitors}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-sm font-medium text-gray-500">Pre-registrations</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.preRegistrations}</p>
        </div>
      </div>

      {/* Recent Visitors */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Visitors</h2>
          <Link 
            to="/admin/visitors"
            className="text-primary hover:underline text-sm"
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Purpose
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check-in Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentVisitors.map(visitor => (
                <tr key={visitor.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{visitor.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{visitor.purpose}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{visitor.checkInTime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      visitor.status === 'Checked In' ? 'bg-green-100 text-green-800' :
                      visitor.status === 'Checked Out' ? 'bg-gray-100 text-gray-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {visitor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-primary hover:underline">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions and Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded flex items-center">
              <span className="mr-2">📊</span> Export Today's Report
            </button>
            <button className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded flex items-center">
              <span className="mr-2">📝</span> Register New Staff Member
            </button>
            <button className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded flex items-center">
              <span className="mr-2">🔄</span> Update Campus Map
            </button>
            <button className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded flex items-center">
              <span className="mr-2">⚙️</span> System Settings
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Analytics Overview</h2>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Visitor trend graph would appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
