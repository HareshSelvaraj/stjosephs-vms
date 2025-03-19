import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedCard = ({ 
  children, 
  className = '', 
  hoverEffect = true,
  onClick,
  ...props 
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    if (!hoverEffect) return;
    
    const card = e.currentTarget;
    const { width, height } = card.getBoundingClientRect();
    const { clientX, clientY } = e;
    
    const x = (clientX - card.offsetLeft - width / 2) / 50;
    const y = (clientY - card.offsetTop - height / 2) / 50;
    
    setRotation({ x: -y, y: x });
  };
  
  const resetRotation = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetRotation}
      onClick={onClick}
      whileHover={{ 
        scale: hoverEffect ? 1.01 : 1,
        boxShadow: hoverEffect ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : undefined
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        rotateX: rotation.x,
        rotateY: rotation.y
      }}
      transition={{ 
        type: "spring", 
        stiffness: 200,
        damping: 25
      }}
      {...props}
    >
      {/* Highlight effect on top */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      />
      
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
