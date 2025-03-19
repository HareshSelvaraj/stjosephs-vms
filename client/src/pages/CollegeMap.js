import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import GoogleMaps from '../components/GoogleMaps';
import CampusMapFallback from '../components/CampusMapFallback';

const CollegeMap = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [mapError, setMapError] = useState(false);

  // Location for St. Joseph's College (approx.)
  const [center] = useState({ lat: 13.0827, lng: 80.2707 });
  const [zoom] = useState(16);

  // College building markers
  const [markers] = useState([
    {
      position: { lat: 13.0827, lng: 80.2707 },
      title: 'Administrative Block',
      content: '<strong>Administrative Block</strong><br/>Main reception and administrative offices',
      icon: {
        url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
        scaledSize: { width: 32, height: 32 }
      }
    },
    {
      position: { lat: 13.0832, lng: 80.2715 },
      title: 'Academic Block',
      content: '<strong>Academic Block</strong><br/>Classrooms and faculty offices',
      icon: {
        url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        scaledSize: { width: 32, height: 32 }
      }
    },
    {
      position: { lat: 13.0822, lng: 80.2720 },
      title: 'Library',
      content: '<strong>Library</strong><br/>Central library and digital resource center',
      icon: {
        url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
        scaledSize: { width: 32, height: 32 }
      }
    },
    {
      position: { lat: 13.0835, lng: 80.2695 },
      title: 'Auditorium',
      content: '<strong>Auditorium</strong><br/>Main college auditorium',
      icon: {
        url: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
        scaledSize: { width: 32, height: 32 }
      }
    },
    {
      position: { lat: 13.0815, lng: 80.2700 },
      title: 'Cafeteria',
      content: '<strong>Cafeteria</strong><br/>Food court and dining area',
      icon: {
        url: 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png',
        scaledSize: { width: 32, height: 32 }
      }
    }
  ]);

  // Handle map error
  const handleMapError = () => {
    console.log("Google Maps failed to load, using fallback map");
    setMapError(true);
  };

  // Force use of fallback map in development for testing
  useEffect(() => {
    // Set this to true to always use the fallback map
    // setMapError(true);
  }, []);

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
          <h1 className="text-2xl font-bold">College Campus Map</h1>
        </div>
      </div>
      
      <div className={`rounded-lg shadow-md p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="mb-6">
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
            Use this interactive map to navigate St. Joseph's College of Engineering campus.
            {!mapError ? (
              ' Click on markers to see more information about each building.'
            ) : (
              ' View our illustrated campus map with building locations.'
            )}
          </p>
        </div>
        
        <div className={`${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-200'} p-4 rounded-lg mb-6 border`}>
          <div className="aspect-w-16 aspect-h-9 mb-4 h-[500px]">
            {!mapError ? (
              /* Google Maps Integration with error callback */
              <GoogleMaps 
                center={center} 
                zoom={zoom} 
                markers={markers} 
                onError={handleMapError}
              />
            ) : (
              /* SVG Campus Map Fallback */
              <CampusMapFallback />
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
            <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Main Buildings</h3>
            <ul className={`space-y-2 ${isDarkMode ? 'text-gray-200' : 'text-black'}`}>
              <li className="flex items-start">
                <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-1">A</span>
                <div>
                  <span className="font-medium">Administrative Block</span> - Main reception, administrative offices
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-1">B</span>
                <div>
                  <span className="font-medium">Academic Blocks</span> - Classrooms and faculty offices
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-1">C</span>
                <div>
                  <span className="font-medium">Library</span> - Central library and digital resource center
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-1">D</span>
                <div>
                  <span className="font-medium">Auditorium</span> - Main college auditorium
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-1">E</span>
                <div>
                  <span className="font-medium">Cafeteria</span> - Food court and dining area
                </div>
              </li>
            </ul>
          </div>
          
          <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
            <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Getting Around</h3>
            <ul className={`space-y-2 ${isDarkMode ? 'text-gray-200' : 'text-black'}`}>
              <li className="flex items-start">
                <span className="text-accent mr-2">1.</span>
                <div>
                  All visitors must check in at the Main Reception in the Administrative Block
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">2.</span>
                <div>
                  Campus shuttle services are available every 15 minutes
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">3.</span>
                <div>
                  Visitor parking is available near the Administrative Block
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">4.</span>
                <div>
                  Information kiosks are located at key points throughout campus
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">5.</span>
                <div>
                  For assistance, contact the help desk at: 044-2450 1060
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeMap;
