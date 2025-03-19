import React, { useEffect, useRef, useState } from 'react';

const GoogleMaps = ({ center, zoom, markers, onError }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    // Load Google Maps Script
    const loadGoogleMapsScript = () => {
      if (window.google && window.google.maps) {
        initializeMap();
        return;
      }

      // Add a global error handler
      window.gm_authFailure = () => {
        console.error('Google Maps authentication failed');
        setLoadError(true);
        if (onError && typeof onError === 'function') {
          onError();
        }
      };

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBqQgEXHhZY9JW4M-SBBfF3C7JTEKzrYkU&libraries=places&callback=initGoogleMap`;
      script.async = true;
      script.defer = true;
      
      // Define global callback for when maps are loaded
      window.initGoogleMap = () => {
        initializeMap();
      };
      
      // Handle script load error
      script.onerror = () => {
        console.error('Google Maps script failed to load');
        setLoadError(true);
        if (onError && typeof onError === 'function') {
          onError();
        }
      };
      
      document.head.appendChild(script);

      // Set a timeout for script loading
      const timeout = setTimeout(() => {
        if (!window.google || !window.google.maps) {
          console.error('Google Maps script load timed out');
          setLoadError(true);
          if (onError && typeof onError === 'function') {
            onError();
          }
        }
      }, 10000); // 10 second timeout

      return () => clearTimeout(timeout);
    };

    // Initialize map when script is loaded
    const initializeMap = () => {
      if (!mapRef.current) return;

      try {
        const mapOptions = {
          center: { lat: center.lat, lng: center.lng },
          zoom: zoom || 16,
          mapTypeId: window.google.maps.MapTypeId.ROADMAP,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true,
          styles: [
            {
              featureType: 'poi.school',
              elementType: 'geometry',
              stylers: [{ color: '#c4e3f3' }]
            }
          ]
        };

        // Create the map instance
        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, mapOptions);
        setMapLoaded(true);

        // Add markers if provided
        if (markers && markers.length > 0) {
          addMarkers(markers);
        }
      } catch (error) {
        console.error('Error initializing Google Maps:', error);
        setLoadError(true);
        if (onError && typeof onError === 'function') {
          onError();
        }
      }
    };

    // Add markers to the map
    const addMarkers = (markerList) => {
      if (!mapInstanceRef.current) return;

      // Clear existing markers
      if (markersRef.current.length > 0) {
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];
      }

      // Add new markers
      markerList.forEach(markerData => {
        const { position, title, icon, content } = markerData;
        
        try {
          const marker = new window.google.maps.Marker({
            position: { lat: position.lat, lng: position.lng },
            map: mapInstanceRef.current,
            title: title,
            icon: icon
          });

          // Add info window if content is provided
          if (content) {
            const infoWindow = new window.google.maps.InfoWindow({
              content: `<div class="info-window">${content}</div>`
            });

            marker.addListener('click', () => {
              infoWindow.open(mapInstanceRef.current, marker);
            });
          }

          markersRef.current.push(marker);
        } catch (error) {
          console.error('Error adding map marker:', error);
        }
      });
    };

    loadGoogleMapsScript();

    // Cleanup
    return () => {
      if (markersRef.current) {
        markersRef.current.forEach(marker => marker.setMap(null));
      }
      // Clean up global callback
      delete window.initGoogleMap;
      delete window.gm_authFailure;
    };
  }, [center, zoom, onError]);

  // Update markers if they change
  useEffect(() => {
    if (mapInstanceRef.current && markers && markers.length > 0 && mapLoaded) {
      // Clear existing markers
      if (markersRef.current.length > 0) {
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];
      }

      // Add new markers
      markers.forEach(markerData => {
        const { position, title, icon, content } = markerData;
        
        try {
          const marker = new window.google.maps.Marker({
            position: { lat: position.lat, lng: position.lng },
            map: mapInstanceRef.current,
            title: title,
            icon: icon
          });

          // Add info window if content is provided
          if (content) {
            const infoWindow = new window.google.maps.InfoWindow({
              content: `<div class="info-window">${content}</div>`
            });

            marker.addListener('click', () => {
              infoWindow.open(mapInstanceRef.current, marker);
            });
          }

          markersRef.current.push(marker);
        } catch (error) {
          console.error('Error updating map marker:', error);
        }
      });
    }
  }, [markers, mapLoaded]);

  if (loadError) {
    return null; // Let the parent handle rendering a fallback
  }

  return (
    <div ref={mapRef} className="h-full w-full rounded-lg" style={{ minHeight: '500px' }}></div>
  );
};

export default GoogleMaps; 