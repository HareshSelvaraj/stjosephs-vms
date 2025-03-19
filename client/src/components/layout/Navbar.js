import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaSignInAlt, FaUserPlus, FaMap } from 'react-icons/fa';

const Navbar = ({ isDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Determine if we've scrolled more than 2 "screens" worth
      // Using 2 * window.innerHeight as the threshold
      const twoScreensHeight = window.innerHeight * 0.5;
      
      // Always show navbar at the top
      if (currentScrollY < 50) {
        setIsVisible(true);
      } 
      // Show/hide based on scroll direction when past threshold
      else if (currentScrollY > twoScreensHeight) {
        // Hide when scrolling down, show when scrolling up
        setIsVisible(currentScrollY < lastScrollY);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? 'transform-none' : 'transform -translate-y-full'
      } ${isDarkMode ? 'bg-gray-800/90 text-white' : 'bg-white/90 text-blue-800'} backdrop-filter backdrop-blur-md shadow-md`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <Link to="/" className="text-2xl font-bold">St. Joseph's College VMS</Link>
          
          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden p-2 rounded-md"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            <NavLink to="/" icon={<FaHome />} label="Home" isDarkMode={isDarkMode} />
            <NavLink to="/login" icon={<FaSignInAlt />} label="Login" isDarkMode={isDarkMode} />
            <NavLink to="/visitor/register" icon={<FaUserPlus />} label="Register" isDarkMode={isDarkMode} />
            <NavLink to="/college-map" icon={<FaMap />} label="Map" isDarkMode={isDarkMode} />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-3 pb-4 animate-fadeIn">
            <div className="flex flex-col space-y-3">
              <MobileNavLink to="/" icon={<FaHome />} label="Home" isDarkMode={isDarkMode} onClick={toggleMenu} />
              <MobileNavLink to="/login" icon={<FaSignInAlt />} label="Login" isDarkMode={isDarkMode} onClick={toggleMenu} />
              <MobileNavLink to="/visitor/register" icon={<FaUserPlus />} label="Register" isDarkMode={isDarkMode} onClick={toggleMenu} />
              <MobileNavLink to="/college-map" icon={<FaMap />} label="Map" isDarkMode={isDarkMode} onClick={toggleMenu} />
            </div>
          </div>
        )}
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
