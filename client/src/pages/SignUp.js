import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTheme } from '../context/ThemeContext';

const SignUp = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('email');
  const [aadhaar, setAadhaar] = useState("");
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const { email, password, name } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAadhaarChange = (e) => {
    // Only allow numbers and limit to 12 digits
    const input = e.target.value.replace(/\D/g, "").slice(0, 12);
    setAadhaar(input);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Account created successfully!');
      navigate('/admin/dashboard');
    }, 2000);
  };

  const handleAadhaarSubmit = async (event) => {
    event.preventDefault();
    
    if (aadhaar.length !== 12) {
      toast.error('Aadhaar number must be 12 digits');
      return;
    }
    
    setIsLoading(true);

    try {
      // Verify Aadhaar - In a real implementation, you would call your backend API
      // which would then use UIDAI's Authentication API securely
      // This is a mock implementation for demonstration
      
      // Example API call:
      // const response = await axios.post('/api/verify-aadhaar', { aadhaarNumber: aadhaar });
      
      // Simulate API delay and verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock verification success
      const isVerified = true; // In production, this would come from the API response
      
      if (isVerified) {
        toast.success('Aadhaar verified successfully!');
        // In a real app, you would extract user details from Aadhaar response
        // and potentially create an account with those details
        
        setTimeout(() => {
          toast.success('Account created with verified Aadhaar details!');
          navigate('/admin/dashboard');
        }, 1000);
      } else {
        toast.error('Aadhaar verification failed. Please check your number and try again.');
        navigate('/signup');
      }
    } catch (error) {
      console.error('Aadhaar verification error:', error);
      toast.error(error.response?.data?.message || 'Verification failed. Please try again.');
      navigate('/signup');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12">
      <Link
        to="/"
        className="absolute top-8 left-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
      >
        <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to home
      </Link>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome</h1>
          <p className="text-sm text-muted-foreground">Sign up to access the visitor management system</p>
        </div>

        <div className={`tabs-container w-full ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          <div className="tabs-header grid w-full grid-cols-2 mb-4">
            <div 
              className={`tab-trigger py-2 text-center font-medium border-b-2 ${
                activeTab === 'email' 
                  ? 'border-primary' 
                  : `border-gray-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`
              } cursor-pointer`}
              onClick={() => setActiveTab('email')}
            >
              Email Registration
            </div>
            <div 
              className={`tab-trigger py-2 text-center font-medium border-b-2 ${
                activeTab === 'aadhaar' 
                  ? 'border-primary' 
                  : `border-gray-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`
              } cursor-pointer`}
              onClick={() => setActiveTab('aadhaar')}
            >
              Aadhaar Registration
            </div>
          </div>

          <div className={`tab-content ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md`}>
            {activeTab === 'email' ? (
              <div>
                <h2 className="text-xl font-semibold mb-3">Email Registration</h2>
                <p className="text-sm mb-4 text-muted-foreground">Create your account using email and password</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={name}
                      onChange={onChange}
                      required
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                        isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                      }`}
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={onChange}
                      required
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                        isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                      }`}
                      placeholder="user@example.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium">Password</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={onChange}
                      required
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                        isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                      }`}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-2 rounded-md bg-primary text-white hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing up...
                      </div>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full">
                <div className="flex flex-col items-center justify-center w-full">
                  <h2 className="text-xl font-semibold mb-3 text-center">Aadhaar Registration</h2>
                  <p className="text-sm mb-4 text-muted-foreground text-center">Enter your Aadhaar number to sign up</p>
                  
                  <form onSubmit={handleAadhaarSubmit} className="space-y-4 w-full flex flex-col items-center">
                    <div className="space-y-2 w-full max-w-[250px] mx-auto pl-8">
                      <label htmlFor="aadhaar" className="block text-sm font-medium text-center">Aadhaar Number</label>
                      <input
                        id="aadhaar"
                        name="aadhaar"
                        type="text"
                        value={aadhaar}
                        onChange={handleAadhaarChange}
                        required
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-center font-medium ${
                          isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                        }`}
                        placeholder="1234 5678 9012"
                      />
                      <p className="text-xs text-muted-foreground mt-1 text-center">Ensure your Aadhaar number is 12 digits.</p>
                    </div>
                    
                    <div className="flex justify-center pt-2 w-full max-w-[250px] mx-auto pl-8">
                      <button
                        type="submit"
                        className="w-full py-2 rounded-md bg-primary text-white hover:bg-blue-700"
                        disabled={isLoading || aadhaar.length !== 12}
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Verifying...
                          </div>
                        ) : (
                          "Verify & Sign Up"
                        )}
                      </button>
                    </div>
                  </form>
                
                  <div className="mt-6 flex flex-col items-center">
                    <div className={`p-3 rounded-lg text-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} max-w-[250px] ml-8`}>
                      <svg className="w-12 h-12 mx-auto mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4.75L19.25 9L12 13.25L4.75 9L12 4.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9.25 11.5L4.75 14L12 18.25L19.25 14L14.6722 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="text-xs text-muted-foreground">
                        Your Aadhaar details will be verified securely with UIDAI
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-sm text-center text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp; 