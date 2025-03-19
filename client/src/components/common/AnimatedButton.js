import React from 'react';
import { motion } from 'framer-motion';

const AnimatedButton = ({ 
  children, 
  onClick, 
  type = 'button',
  variant = 'primary',
  className = '',
  icon,
  fullWidth = false,
  disabled = false,
  ...props 
}) => {
  // Determine styles based on variant
  const baseClasses = "relative py-2 px-4 rounded-md font-medium transition-all flex items-center justify-center";
  const variantClasses = {
    primary: "bg-accent text-white hover:bg-orange-600",
    secondary: "bg-secondary text-white hover:bg-gray-700",
    outline: "border-2 border-accent text-accent hover:bg-accent hover:text-white",
    ghost: "bg-transparent text-accent hover:bg-accent/10",
  };
  
  const fullWidthClass = fullWidth ? "w-full" : "";
  const disabledClass = disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer";
  
  return (
    <motion.button
      type={type}
      onClick={disabled ? undefined : onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${fullWidthClass} ${disabledClass} ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
      
      {/* Gradient underline animation on hover */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 rounded-b-md"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </motion.button>
  );
};

export default AnimatedButton;
