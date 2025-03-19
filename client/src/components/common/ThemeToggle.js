import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeToggle = ({ isDarkMode, toggleTheme }) => {
  return (
    <button 
      onClick={toggleTheme}
      className={`p-3 rounded-full shadow-md transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' 
          : 'bg-white text-blue-800 hover:bg-gray-100'
      }`}
      aria-label="Toggle theme"
    >
      {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
    </button>
  );
};

export default ThemeToggle; 