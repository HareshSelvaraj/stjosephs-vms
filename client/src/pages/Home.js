import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
            Welcome to St. Joseph's College
            <span className={`block mt-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>Visitor Management System</span>
          </h1>
          <p className={`text-xl mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Streamlining campus visits for a safer and more efficient experience
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 mb-8">
            <Link to="/visitor/register" className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-md font-medium transition-colors duration-300 mb-4 md:mb-0">
              Register as Visitor
            </Link>
            <Link to="/login" className={`border-2 py-3 px-8 rounded-md font-medium transition-colors duration-300 ${
              isDarkMode 
                ? 'border-blue-400 text-blue-300 hover:bg-blue-900/30' 
                : 'border-blue-600 text-blue-600 hover:bg-blue-50'
            }`}>
              Staff Login
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className={`py-16 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold text-center mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
            Key Features
          </h2>
          <p className={`text-center mb-12 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Our visitor management system provides a seamless experience for both visitors and staff
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-700/70' : 'bg-white'}`}>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>QR Code Check-in</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Quick and secure entry with personalized QR codes for all visitors
              </p>
            </div>
            
            <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-700/70' : 'bg-white'}`}>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Instant Notifications</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Staff receive immediate alerts when their visitors arrive on campus
              </p>
            </div>
            
            <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-700/70' : 'bg-white'}`}>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Campus Navigation</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Interactive map helps visitors easily find their way around campus
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold text-center mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
            How It Works
          </h2>
          <p className={`text-center mb-12 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Our simple 4-step process makes campus visits efficient and secure
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className={`p-6 rounded-lg shadow-md text-center ${isDarkMode ? 'bg-gray-700/70' : 'bg-white'}`}>
              <div className={`${isDarkMode ? 'bg-blue-600' : 'bg-blue-800'} text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold`}>
                1
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Register</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Fill out the visitor registration form online before your visit
              </p>
            </div>
            
            <div className={`p-6 rounded-lg shadow-md text-center ${isDarkMode ? 'bg-gray-700/70' : 'bg-white'}`}>
              <div className={`${isDarkMode ? 'bg-blue-600' : 'bg-blue-800'} text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold`}>
                2
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Get QR Code</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Receive a unique QR code for quick campus entry
              </p>
            </div>
            
            <div className={`p-6 rounded-lg shadow-md text-center ${isDarkMode ? 'bg-gray-700/70' : 'bg-white'}`}>
              <div className={`${isDarkMode ? 'bg-blue-600' : 'bg-blue-800'} text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold`}>
                3
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Check In</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Scan your QR code at the reception upon arrival
              </p>
            </div>
            
            <div className={`p-6 rounded-lg shadow-md text-center ${isDarkMode ? 'bg-gray-700/70' : 'bg-white'}`}>
              <div className={`${isDarkMode ? 'bg-blue-600' : 'bg-blue-800'} text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold`}>
                4
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Meet</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Staff will be notified and meet you promptly
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
