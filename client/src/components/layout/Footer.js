import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiGlobe, FiHeart } from 'react-icons/fi';
import CollegeLogo from '../common/CollegeLogo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.footer 
      className="bg-primary text-white relative z-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <motion.div 
                className="bg-white rounded-full p-1"
                whileHover={{ rotate: 10, scale: 1.05 }}
              >
                <CollegeLogo className="h-10 w-10" />
              </motion.div>
              <div className="text-xl font-bold">St. Joseph's VMS</div>
            </Link>
            <p className="text-gray-300 mb-4">
              Simplifying visitor management for a safer, more efficient campus experience.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4 border-b border-white/20 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <motion.div whileHover={{ x: 5 }} className="transition-all">
                  <Link to="/" className="text-gray-300 hover:text-accent transition-colors flex items-center">
                    <span className="mr-2">→</span> Home
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 5 }} className="transition-all">
                  <Link to="/visitor/register" className="text-gray-300 hover:text-accent transition-colors flex items-center">
                    <span className="mr-2">→</span> Register as Visitor
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 5 }} className="transition-all">
                  <Link to="/college-map" className="text-gray-300 hover:text-accent transition-colors flex items-center">
                    <span className="mr-2">→</span> College Map
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 5 }} className="transition-all">
                  <Link to="/login" className="text-gray-300 hover:text-accent transition-colors flex items-center">
                    <span className="mr-2">→</span> Staff Login
                  </Link>
                </motion.div>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4 border-b border-white/20 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <FiMapPin className="mr-2 text-accent" /> 
                <span className="text-gray-300">123 College Avenue, City</span>
              </li>
              <li className="flex items-center">
                <FiPhone className="mr-2 text-accent" /> 
                <span className="text-gray-300">+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <FiMail className="mr-2 text-accent" /> 
                <span className="text-gray-300">info@stjosephs.edu</span>
              </li>
              <li className="flex items-center">
                <FiGlobe className="mr-2 text-accent" /> 
                <span className="text-gray-300">www.stjosephs.edu</span>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4 border-b border-white/20 pb-2">Newsletter</h3>
            <p className="text-gray-300 mb-4">Subscribe to our newsletter for updates</p>
            <form className="space-y-2">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full p-2 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <motion.button 
                type="button"
                className="bg-accent hover:bg-orange-600 transition w-full py-2 px-4 rounded-md font-medium"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
      
      {/* Copyright */}
      <motion.div 
        className="bg-primary-dark py-4 text-center text-gray-300 text-sm border-t border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {currentYear} St. Joseph's College. All rights reserved. Made with <FiHeart className="inline text-red-500" /> by the IT Team
          </motion.p>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
