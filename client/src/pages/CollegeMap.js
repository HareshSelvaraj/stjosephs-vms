import React from 'react';

const CollegeMap = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">College Campus Map</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-6">
          <p className="text-gray-700 mb-4">
            Use this interactive map to navigate St. Joseph's College of Engineering campus.
            Click on buildings to see more information.
          </p>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg mb-6 border border-gray-200">
          <div className="aspect-w-16 aspect-h-9 mb-4">
            {/* In a real implementation, this would be an interactive map */}
            <div className="flex items-center justify-center bg-gray-300 h-[500px] mb-4 rounded">
              <div className="text-center">
                <p className="text-gray-600 mb-2">Interactive Campus Map</p>
                <p className="text-sm text-gray-500">
                  (This is a placeholder. In a real implementation, this would be an interactive map
                  using Google Maps or a similar service)
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Main Buildings</h3>
            <ul className="space-y-2 text-black">
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
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Getting Around</h3>
            <ul className="space-y-2 text-black">
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
