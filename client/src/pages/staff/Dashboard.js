import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useTheme } from '../../context/ThemeContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('pending');
  
  // Mock data for staff dashboard
  const pendingVisitors = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      purpose: 'Parent Teacher Meeting',
      visitType: 'Parent',
      checkInTime: '09:30 AM',
      status: 'Waiting',
      phone: '9876543210'
    },
    {
      id: '4',
      name: 'Kavitha Subramaniam',
      purpose: 'Project Discussion',
      visitType: 'Guest',
      checkInTime: '01:15 PM',
      status: 'Waiting',
      phone: '9876543213'
    }
  ];
  
  const todayVisitors = [
    {
      id: '2',
      name: 'Priya Sharma',
      purpose: 'Admission Enquiry',
      visitType: 'Guest',
      checkInTime: '10:15 AM',
      checkOutTime: '11:00 AM',
      status: 'Completed',
      phone: '9876543211'
    },
    {
      id: '3',
      name: 'Vikram Singh',
      purpose: 'Campus Tour',
      visitType: 'Guest',
      checkInTime: '11:00 AM',
      status: 'In Meeting',
      phone: '9876543212'
    }
  ];
  
  const upcomingVisitors = [
    {
      id: '5',
      name: 'Anand Patel',
      purpose: 'Project Discussion',
      visitType: 'Guest',
      scheduledTime: '03:30 PM',
      date: 'Today',
      phone: '9876543214'
    },
    {
      id: '6',
      name: 'Meera Joshi',
      purpose: 'Career Guidance',
      visitType: 'Parent',
      scheduledTime: '11:00 AM',
      date: 'Tomorrow',
      phone: '9876543215'
    },
    {
      id: '7',
      name: 'Suresh Reddy',
      purpose: 'Internship Discussion',
      visitType: 'Guest',
      scheduledTime: '02:00 PM',
      date: 'Tomorrow',
      phone: '9876543216'
    }
  ];

  const handleApproveVisitor = (id) => {
    toast.success(`Visitor #${id} has been approved`);
    // In a real application, this would make an API call to update the visitor's status
  };

  const handleRejectVisitor = (id) => {
    toast.info(`Visitor #${id} has been rejected`);
    // In a real application, this would make an API call to update the visitor's status
  };

  const handleCompleteVisit = (id) => {
    toast.success(`Meeting with visitor #${id} marked as completed`);
    // In a real application, this would make an API call to update the visitor's status
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
          <h1 className="text-2xl font-bold">Staff Dashboard</h1>
        </div>
        <div className="flex">
          <div className={`flex bg-${isDarkMode ? 'gray-700' : 'gray-100'} p-1 rounded-md`}>
            <button
              className={`px-4 py-2 rounded-md ${
                activeTab === 'pending' 
                  ? isDarkMode 
                    ? 'bg-gray-800 text-white shadow-sm' 
                    : 'bg-white text-gray-800 shadow-sm' 
                  : isDarkMode 
                    ? 'text-gray-300' 
                    : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('pending')}
            >
              Pending ({pendingVisitors.length})
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                activeTab === 'today' 
                  ? isDarkMode 
                    ? 'bg-gray-800 text-white shadow-sm' 
                    : 'bg-white text-gray-800 shadow-sm' 
                  : isDarkMode 
                    ? 'text-gray-300' 
                    : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('today')}
            >
              Today
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                activeTab === 'upcoming' 
                  ? isDarkMode 
                    ? 'bg-gray-800 text-white shadow-sm' 
                    : 'bg-white text-gray-800 shadow-sm' 
                  : isDarkMode 
                    ? 'text-gray-300' 
                    : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming
            </button>
          </div>
        </div>
      </div>

      {/* Pending Visitors */}
      {activeTab === 'pending' && (
        <div className={`rounded-lg shadow-md p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Pending Visitor Approvals</h2>
          {pendingVisitors.length > 0 ? (
            <div className="space-y-4">
              {pendingVisitors.map(visitor => (
                <div key={visitor.id} className={`border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                  <div className="mb-4 md:mb-0">
                    <h3 className={`font-semibold ${isDarkMode ? 'text-gray-200' : ''}`}>{visitor.name}</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{visitor.purpose}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{visitor.visitType}</span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Check-in: {visitor.checkInTime}</span>
                    </div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                      <i className="fas fa-phone mr-1"></i> {visitor.phone}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      className="bg-green-100 text-green-700 hover:bg-green-200 px-4 py-2 rounded-md text-sm flex items-center transition"
                      onClick={() => handleApproveVisitor(visitor.id)}
                    >
                      <span className="mr-1">✓</span> Approve
                    </button>
                    <button 
                      className={`${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} px-4 py-2 rounded-md text-sm flex items-center transition`}
                      onClick={() => handleRejectVisitor(visitor.id)}
                    >
                      <span className="mr-1">✕</span> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              No pending visitors at the moment
            </div>
          )}
        </div>
      )}

      {/* Today's Visitors */}
      {activeTab === 'today' && (
        <div className={`rounded-lg shadow-md p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Today's Visitors</h2>
          {todayVisitors.length > 0 ? (
            <div className="space-y-4">
              {todayVisitors.map(visitor => (
                <div key={visitor.id} className={`border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                  <div className="mb-4 md:mb-0">
                    <h3 className={`font-semibold ${isDarkMode ? 'text-gray-200' : ''}`}>{visitor.name}</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{visitor.purpose}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{visitor.visitType}</span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Check-in: {visitor.checkInTime}</span>
                      {visitor.checkOutTime && (
                        <>
                          <span className="mx-2 text-gray-400">•</span>
                          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Check-out: {visitor.checkOutTime}</span>
                        </>
                      )}
                    </div>
                    <div className="mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        visitor.status === 'Completed' ? 'bg-gray-100 text-gray-700' :
                        visitor.status === 'In Meeting' ? 'bg-green-100 text-green-700' : ''
                      }`}>
                        {visitor.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {visitor.status === 'In Meeting' && (
                      <button 
                        className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm flex items-center transition"
                        onClick={() => handleCompleteVisit(visitor.id)}
                      >
                        <span className="mr-1">✓</span> Complete Visit
                      </button>
                    )}
                    <button className={`${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} px-4 py-2 rounded-md text-sm flex items-center transition`}>
                      <span className="mr-1">📝</span> Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              No visitors today
            </div>
          )}
        </div>
      )}

      {/* Upcoming Visitors */}
      {activeTab === 'upcoming' && (
        <div className={`rounded-lg shadow-md p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Upcoming Visitors</h2>
          {upcomingVisitors.length > 0 ? (
            <div className="space-y-4">
              {upcomingVisitors.map(visitor => (
                <div key={visitor.id} className={`border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                  <div className="mb-4 md:mb-0">
                    <h3 className={`font-semibold ${isDarkMode ? 'text-gray-200' : ''}`}>{visitor.name}</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{visitor.purpose}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{visitor.visitType}</span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{visitor.date}, {visitor.scheduledTime}</span>
                    </div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                      <i className="fas fa-phone mr-1"></i> {visitor.phone}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className={`${isDarkMode ? 'bg-gray-700 text-amber-400 hover:bg-gray-600' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'} px-4 py-2 rounded-md text-sm flex items-center transition`}>
                      <span className="mr-1">🗓️</span> Reschedule
                    </button>
                    <button className={`${isDarkMode ? 'bg-gray-700 text-red-400 hover:bg-gray-600' : 'bg-red-100 text-red-700 hover:bg-red-200'} px-4 py-2 rounded-md text-sm flex items-center transition`}>
                      <span className="mr-1">✕</span> Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              No upcoming appointments
            </div>
          )}
        </div>
      )}

      {/* Staff Stats and Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className={`rounded-lg shadow-md p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Today's Meetings</p>
              <p className="text-2xl font-bold text-primary">{todayVisitors.length}</p>
            </div>
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Pending Approvals</p>
              <p className="text-2xl font-bold text-amber-500">{pendingVisitors.length}</p>
            </div>
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Upcoming Meetings</p>
              <p className="text-2xl font-bold text-green-600">{upcomingVisitors.length}</p>
            </div>
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Visitors</p>
              <p className="text-2xl font-bold text-blue-500">{todayVisitors.length + pendingVisitors.length}</p>
            </div>
          </div>
        </div>

        <div className={`rounded-lg shadow-md p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Quick Actions</h2>
          <div className="space-y-3">
            <button className={`w-full text-left px-4 py-2 rounded flex items-center ${
              isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
            }`}>
              <span className="mr-2">📋</span> Schedule a Meeting
            </button>
            <button className={`w-full text-left px-4 py-2 rounded flex items-center ${
              isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
            }`}>
              <span className="mr-2">📝</span> Leave a Note
            </button>
            <button className={`w-full text-left px-4 py-2 rounded flex items-center ${
              isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
            }`}>
              <span className="mr-2">🔍</span> Search Visitor History
            </button>
            <button className={`w-full text-left px-4 py-2 rounded flex items-center ${
              isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
            }`}>
              <span className="mr-2">⚙️</span> Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
