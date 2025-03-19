import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaSignInAlt, FaUserPlus, FaMap } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ isDarkMode }) => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600">St. Joseph's VMS</span>
            </Link>
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
                  Dashboard
                </Link>
                {user?.role === 'admin' && (
                  <>
                    <Link to="/admin/visitors" className="text-gray-700 hover:text-blue-600">
                      Visitors
                    </Link>
                    <Link to="/admin/staff" className="text-gray-700 hover:text-blue-600">
                      Staff
                    </Link>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-blue-600">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, label, isDarkMode }) => (
  <Link 
    to={to} 
    className={`flex items-center space-x-1 ${
      isDarkMode ? 'hover:text-blue-300' : 'hover:text-blue-600'
    } transition-colors duration-200`}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

const MobileNavLink = ({ to, icon, label, isDarkMode, onClick }) => (
  <Link 
    to={to} 
    className={`flex items-center space-x-2 p-2 rounded-md ${
      isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
    } transition-colors duration-200`}
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default Navbar;
