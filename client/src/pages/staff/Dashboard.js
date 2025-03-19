import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Dashboard = () => {
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Staff Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-100 p-1 rounded-md">
            <button
              className={`px-4 py-2 rounded-md ${activeTab === 'pending' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
              onClick={() => setActiveTab('pending')}
            >
              Pending ({pendingVisitors.length})
            </button>
            <button
              className={`px-4 py-2 rounded-md ${activeTab === 'today' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
              onClick={() => setActiveTab('today')}
            >
              Today
            </button>
            <button
              className={`px-4 py-2 rounded-md ${activeTab === 'upcoming' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming
            </button>
          </div>
        </div>
      </div>

      {/* Pending Visitors */}
      {activeTab === 'pending' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Pending Visitor Approvals</h2>
          {pendingVisitors.length > 0 ? (
            <div className="space-y-4">
              {pendingVisitors.map(visitor => (
                <div key={visitor.id} className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="font-semibold">{visitor.name}</h3>
                    <p className="text-sm text-gray-600">{visitor.purpose}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{visitor.visitType}</span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-xs text-gray-600">Check-in: {visitor.checkInTime}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
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
                      className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-md text-sm flex items-center transition"
                      onClick={() => handleRejectVisitor(visitor.id)}
                    >
                      <span className="mr-1">✕</span> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No pending visitors at the moment
            </div>
          )}
        </div>
      )}

      {/* Today's Visitors */}
      {activeTab === 'today' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Today's Visitors</h2>
          {todayVisitors.length > 0 ? (
            <div className="space-y-4">
              {todayVisitors.map(visitor => (
                <div key={visitor.id} className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="font-semibold">{visitor.name}</h3>
                    <p className="text-sm text-gray-600">{visitor.purpose}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{visitor.visitType}</span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-xs text-gray-600">Check-in: {visitor.checkInTime}</span>
                      {visitor.checkOutTime && (
                        <>
                          <span className="mx-2 text-gray-400">•</span>
                          <span className="text-xs text-gray-600">Check-out: {visitor.checkOutTime}</span>
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
                        className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 rounded-md text-sm flex items-center transition"
                        onClick={() => handleCompleteVisit(visitor.id)}
                      >
                        <span className="mr-1">✓</span> Complete Visit
                      </button>
                    )}
                    <button className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-md text-sm flex items-center transition">
                      <span className="mr-1">📝</span> Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No visitors today
            </div>
          )}
        </div>
      )}

      {/* Upcoming Visitors */}
      {activeTab === 'upcoming' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Visitors</h2>
          {upcomingVisitors.length > 0 ? (
            <div className="space-y-4">
              {upcomingVisitors.map(visitor => (
                <div key={visitor.id} className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="font-semibold">{visitor.name}</h3>
                    <p className="text-sm text-gray-600">{visitor.purpose}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{visitor.visitType}</span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-xs text-gray-600">{visitor.date}, {visitor.scheduledTime}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      <i className="fas fa-phone mr-1"></i> {visitor.phone}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-red-100 text-red-700 hover:bg-red-200 px-4 py-2 rounded-md text-sm flex items-center transition">
                      <span className="mr-1">🗓️</span> Reschedule
                    </button>
                    <button className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-md text-sm flex items-center transition">
                      <span className="mr-1">✕</span> Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No upcoming visitors
            </div>
          )}
        </div>
      )}

      {/* Quick Access */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-md text-center">
            <div className="text-primary text-2xl mb-2">📊</div>
            <h3 className="font-medium">Visitor History</h3>
          </div>
          <div className="bg-gray-50 p-4 rounded-md text-center">
            <div className="text-primary text-2xl mb-2">📅</div>
            <h3 className="font-medium">My Schedule</h3>
          </div>
          <div className="bg-gray-50 p-4 rounded-md text-center">
            <div className="text-primary text-2xl mb-2">⚙️</div>
            <h3 className="font-medium">Settings</h3>
          </div>
          <div className="bg-gray-50 p-4 rounded-md text-center">
            <div className="text-primary text-2xl mb-2">📱</div>
            <h3 className="font-medium">Notifications</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
