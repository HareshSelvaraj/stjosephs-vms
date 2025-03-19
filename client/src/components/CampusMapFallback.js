import React from 'react';
import { useTheme } from '../context/ThemeContext';

const CampusMapFallback = () => {
  const { isDarkMode } = useTheme();
  
  // Colors based on theme
  const bgColor = isDarkMode ? '#1f2937' : '#f8fafc';
  const strokeColor = isDarkMode ? '#4b5563' : '#94a3b8';
  const textColor = isDarkMode ? '#e5e7eb' : '#1f2937';
  const buildingColors = {
    admin: isDarkMode ? '#dc2626' : '#ef4444',
    academic: isDarkMode ? '#2563eb' : '#3b82f6',
    library: isDarkMode ? '#059669' : '#10b981',
    auditorium: isDarkMode ? '#d97706' : '#f59e0b',
    cafeteria: isDarkMode ? '#7c3aed' : '#8b5cf6'
  };
  const grassColor = isDarkMode ? '#374151' : '#e5e7eb';
  const roadColor = isDarkMode ? '#4b5563' : '#94a3b8';
  const parkingColor = isDarkMode ? '#6b7280' : '#cbd5e1';

  return (
    <svg 
      viewBox="0 0 800 500" 
      width="100%" 
      height="100%" 
      style={{ maxHeight: '500px', backgroundColor: bgColor }}
      className="rounded-lg"
    >
      {/* Background */}
      <rect width="800" height="500" fill={bgColor} />
      
      {/* Grass Areas */}
      <g>
        <path
          d="M 0,0 L 800,0 L 800,500 L 0,500 Z"
          fill={grassColor}
          opacity="0.1"
        />
        <path
          d="M 100,100 L 700,100 L 700,400 L 100,400 Z"
          fill={grassColor}
          opacity="0.05"
        />
      </g>

      {/* Campus Roads */}
      <g>
        {/* Main Roads */}
        <path
          d="M 100,250 H 700 M 400,100 V 400"
          stroke={roadColor}
          strokeWidth="20"
          fill="none"
          strokeLinecap="round"
        />
        {/* Secondary Roads */}
        <path
          d="M 200,150 H 600 M 300,350 H 500"
          stroke={roadColor}
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
        />
        {/* Road Lines */}
        <path
          d="M 100,250 H 700 M 400,100 V 400"
          stroke={isDarkMode ? '#6b7280' : '#e5e7eb'}
          strokeWidth="2"
          strokeDasharray="20,20"
          fill="none"
        />
      </g>

      {/* Campus Buildings */}
      {/* Administrative Block */}
      <g>
        <path
          d="M 350,180 L 450,180 L 450,260 L 350,260 Z"
          fill={buildingColors.admin}
          stroke={isDarkMode ? '#b91c1c' : '#dc2626'}
          strokeWidth="2"
        />
        <rect x="360" y="200" width="20" height="20" fill={isDarkMode ? '#b91c1c' : '#dc2626'} />
        <rect x="420" y="200" width="20" height="20" fill={isDarkMode ? '#b91c1c' : '#dc2626'} />
        <text x="400" y="220" fontSize="16" fill={textColor} textAnchor="middle" fontWeight="bold">Admin</text>
        <text x="400" y="240" fontSize="10" fill={textColor} textAnchor="middle">A</text>
      </g>

      {/* Academic Blocks */}
      <g>
        <path
          d="M 500,150 L 620,150 L 620,250 L 500,250 Z"
          fill={buildingColors.academic}
          stroke={isDarkMode ? '#1d4ed8' : '#2563eb'}
          strokeWidth="2"
        />
        <rect x="520" y="170" width="20" height="20" fill={isDarkMode ? '#1d4ed8' : '#2563eb'} />
        <rect x="580" y="170" width="20" height="20" fill={isDarkMode ? '#1d4ed8' : '#2563eb'} />
        <text x="560" y="200" fontSize="16" fill={textColor} textAnchor="middle" fontWeight="bold">Academic</text>
        <text x="560" y="220" fontSize="10" fill={textColor} textAnchor="middle">B</text>
      </g>

      {/* Library */}
      <g>
        <path
          d="M 320,320 L 400,320 L 400,380 L 320,380 Z"
          fill={buildingColors.library}
          stroke={isDarkMode ? '#047857' : '#059669'}
          strokeWidth="2"
        />
        <path
          d="M 340,320 L 380,300 L 380,380 L 340,380 Z"
          fill={isDarkMode ? '#047857' : '#059669'}
        />
        <text x="360" y="350" fontSize="16" fill={textColor} textAnchor="middle" fontWeight="bold">Library</text>
        <text x="360" y="370" fontSize="10" fill={textColor} textAnchor="middle">C</text>
      </g>

      {/* Auditorium */}
      <g>
        <path
          d="M 180,200 L 280,200 L 280,270 L 180,270 Z"
          fill={buildingColors.auditorium}
          stroke={isDarkMode ? '#b45309' : '#d97706'}
          strokeWidth="2"
        />
        <path
          d="M 200,200 L 260,180 L 260,270 L 200,270 Z"
          fill={isDarkMode ? '#b45309' : '#d97706'}
        />
        <text x="230" y="235" fontSize="16" fill={textColor} textAnchor="middle" fontWeight="bold">Auditorium</text>
        <text x="230" y="255" fontSize="10" fill={textColor} textAnchor="middle">D</text>
      </g>

      {/* Cafeteria */}
      <g>
        <path
          d="M 500,320 L 590,320 L 590,380 L 500,380 Z"
          fill={buildingColors.cafeteria}
          stroke={isDarkMode ? '#6d28d9' : '#7c3aed'}
          strokeWidth="2"
        />
        <rect x="520" y="340" width="20" height="20" fill={isDarkMode ? '#6d28d9' : '#7c3aed'} />
        <rect x="550" y="340" width="20" height="20" fill={isDarkMode ? '#6d28d9' : '#7c3aed'} />
        <text x="545" y="350" fontSize="16" fill={textColor} textAnchor="middle" fontWeight="bold">Cafeteria</text>
        <text x="545" y="370" fontSize="10" fill={textColor} textAnchor="middle">E</text>
      </g>

      {/* Parking Areas */}
      <g>
        <rect x="460" y="100" width="60" height="30" fill={parkingColor} stroke={strokeColor} strokeWidth="1" rx="2" />
        <path d="M 460,115 H 520 M 460,125 H 520" stroke={strokeColor} strokeWidth="1" />
        <text x="490" y="120" fontSize="12" fill={textColor} textAnchor="middle">Parking</text>
      </g>

      {/* Main Entrance */}
      <g>
        <path
          d="M 400,80 L 380,100 H 420 Z"
          fill={strokeColor}
        />
        <path
          d="M 390,90 L 410,90"
          stroke={isDarkMode ? '#6b7280' : '#e5e7eb'}
          strokeWidth="2"
          strokeDasharray="4,4"
        />
        <text x="400" y="70" fontSize="12" fill={textColor} textAnchor="middle">Main Entrance</text>
      </g>

      {/* Compass */}
      <g transform="translate(700, 100)">
        <circle cx="0" cy="0" r="25" fill="none" stroke={strokeColor} strokeWidth="2" />
        <path d="M 0,-22 L 5,-5 L 0,0 L -5,-5 Z" fill={textColor} />
        <text x="0" y="-28" fontSize="12" fill={textColor} textAnchor="middle" fontWeight="bold">N</text>
      </g>

      {/* Map Title */}
      <text x="400" y="40" fontSize="24" fontWeight="bold" fill={textColor} textAnchor="middle">
        St. Joseph's College Campus Map
      </text>
      <text x="400" y="65" fontSize="14" fill={textColor} textAnchor="middle" opacity="0.8">
        Interactive Campus Guide
      </text>
    </svg>
  );
};

export default CampusMapFallback; 