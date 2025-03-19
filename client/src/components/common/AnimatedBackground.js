import React, { useState, useEffect } from 'react';
import './AnimatedBackground.css';
import { useTheme } from '../../context/ThemeContext';

const AnimatedBackground = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { isDarkMode } = useTheme();
  
  // Generate random number of particles (between 15-25)
  const particleCount = Math.floor(Math.random() * 10) + 15;
  
  // Create array of particles with random positions and sizes
  const particles = Array.from({ length: particleCount }).map((_, index) => {
    return {
      id: index,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 12 + 3}px`,
      duration: `${Math.random() * 20 + 10}s`,
      delay: `${Math.random() * 5}s`
    };
  });

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate position as percentage of screen
      const x = (clientX / innerWidth) * 100;
      const y = (clientY / innerHeight) * 100;
      
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Define gradient colors based on theme
  const gradientColors = isDarkMode
    ? { start: 'rgba(30, 41, 59, 0.7)', end: 'rgba(15, 23, 42, 0.8)' }
    : { start: 'rgba(241, 245, 249, 0.7)', end: 'rgba(224, 242, 254, 0.8)' };

  return (
    <div className={`animated-background-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div 
        className="animated-background"
        style={{
          backgroundImage: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${gradientColors.start}, ${gradientColors.end})`
        }}
      >
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
        <div className="wave wave4"></div>
        
        {particles.map((particle) => (
          <div 
            key={particle.id}
            className="floating-particle"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              animationDuration: particle.duration,
              animationDelay: particle.delay,
              transform: `translate(${(mousePosition.x - 50) / 15}px, ${(mousePosition.y - 50) / 15}px)`,
              backgroundColor: isDarkMode ? 'rgba(148, 163, 184, 0.5)' : 'rgba(30, 64, 175, 0.5)'
            }}
          />
        ))}
      </div>
      {children}
    </div>
  );
};

export default AnimatedBackground;
