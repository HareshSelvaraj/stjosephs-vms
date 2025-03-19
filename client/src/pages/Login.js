import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTheme } from '../context/ThemeContext';
import { login } from '../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'admin' // admin or staff
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { email, password, userType } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Temporarily use demo login
      if (userType === 'admin' && email === 'admin@stjosephs.edu' && password === 'admin123') {
        // Store demo token
        localStorage.setItem('token', 'demo-admin-token');
        localStorage.setItem('userType', 'admin');
        
        toast.success('Login successful!');
        navigate('/admin/dashboard');
      } else if (userType === 'staff' && email === 'staff@stjosephs.edu' && password === 'staff123') {
        // Store demo token
        localStorage.setItem('token', 'demo-staff-token');
        localStorage.setItem('userType', 'staff');
        
        toast.success('Login successful!');
        navigate('/staff/dashboard');
      } else {
        // Try API login if demo credentials don't match
        try {
          await login(formData);
          toast.success('Login successful!');
          
          // Redirect based on user type
          if (userType === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/staff/dashboard');
          }
        } catch (apiError) {
          throw new Error('Invalid credentials');
        }
      }
    } catch (err) {
      console.error(err);
      const errorMsg = err.message || 'Login failed. Please try again.';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className={`max-w-md w-full space-y-8 p-10 rounded-lg shadow-md ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Log in to your account
          </h2>
          <p className={`mt-2 text-center text-sm ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Access the St. Joseph's College Visitor Management System
          </p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="space-y-4">
            <div>
              <label className={`block font-medium mb-2 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Login As
              </label>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    id="admin"
                    name="userType"
                    type="radio"
                    value="admin"
                    checked={userType === 'admin'}
                    onChange={onChange}
                    className="h-4 w-4 text-primary focus:ring-primary-500 border-gray-300"
                  />
                  <label htmlFor="admin" className={`ml-2 block text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Admin
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="staff"
                    name="userType"
                    type="radio"
                    value="staff"
                    checked={userType === 'staff'}
                    onChange={onChange}
                    className="h-4 w-4 text-primary focus:ring-primary-500 border-gray-300"
                  />
                  <label htmlFor="staff" className={`ml-2 block text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Staff
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="email" className={`block font-medium mb-2 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={onChange}
                autoComplete="email"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="password" className={`block font-medium mb-2 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={onChange}
                autoComplete="current-password"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Password"
              />
            </div>
          </div>

          <div className={`text-sm text-center ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            <p className="mb-2">
              Demo Admin: admin@stjosephs.edu / admin123
            </p>
            <p>
              Demo Staff: staff@stjosephs.edu / staff123
            </p>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
          
          <div className={`text-sm text-center mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Don't have an account?{' '}
            <Link to="/visitor/register" className="text-primary hover:underline">
              Register as a visitor
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
