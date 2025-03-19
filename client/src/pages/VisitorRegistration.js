import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { registerVisitor } from '../services/visitorService';
import { useTheme } from '../context/ThemeContext';
import QRCode from 'qrcode.react'; // Import QR code library (you may need to install this)
import { saveVisitor } from '../utils/localStorage';

const VisitorRegistration = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    purpose: '',
    visitType: 'Guest',
    whomToMeet: '',
    idProofType: 'Aadhar',
    idProofNumber: ''
  });

  const [qrCode, setQrCode] = useState('');
  const [visitorData, setVisitorData] = useState(null);
  const [loading, setLoading] = useState(false);

  const { name, email, phone, purpose, visitType, whomToMeet, idProofType, idProofNumber } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    
    // Form validation
    if (!name || !email || !phone || !purpose || !whomToMeet || !idProofNumber) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      // Try to call the backend API
      try {
        const response = await registerVisitor(formData);
        
        if (response && response.qrCode) {
          setQrCode(response.qrCode);
          
          // Save visitor data to localStorage
          const visitorId = response.visitorId || `VIS-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
          const savedData = saveVisitor({
            ...formData,
            visitorId,
            timestamp: new Date().toISOString()
          });
          
          setVisitorData(savedData); // Store the complete data
          toast.success('Registration successful! Your QR code has been generated.');
        } else {
          // If server doesn't return QR code, create one locally
          throw new Error('Server did not return a QR code');
        }
      } catch (apiError) {
        console.warn('API call failed, generating QR code locally:', apiError);
        
        // Generate visitor ID on client side
        const visitorId = `VIS-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        
        // Create visitor data object with timestamp
        const localVisitorData = {
          ...formData,
          visitorId,
          timestamp: new Date().toISOString(),
          status: 'pending'
        };
        
        // Save to localStorage
        const savedData = saveVisitor(localVisitorData);
        
        // Save data for rendering QR code
        setVisitorData(savedData);
        setQrCode(''); // Clear image URL since we'll render the QR code directly
        
        toast.success('QR code generated successfully. Note: This is a local generation.');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const registerAgain = () => {
    setQrCode('');
    setVisitorData(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      purpose: '',
      visitType: 'Guest',
      whomToMeet: '',
      idProofType: 'Aadhar',
      idProofNumber: ''
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className={`max-w-2xl w-full rounded-lg shadow-md p-8 ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'
      }`}>
        {(qrCode || visitorData) ? (
          <div className="space-y-6">
            <div>
              <h2 className={`text-center text-3xl font-extrabold ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Registration Complete!
              </h2>
              <p className={`mt-2 text-center text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Your QR code has been generated successfully
              </p>
            </div>
            
            <div className="flex justify-center">
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                {qrCode ? (
                  <img 
                    src={qrCode} 
                    alt="Visitor QR Code" 
                    className="max-w-full h-auto"
                  />
                ) : visitorData && (
                  <QRCode 
                    value={JSON.stringify(visitorData)}
                    size={200}
                    bgColor={isDarkMode ? "#374151" : "#f3f4f6"}
                    fgColor="#000000"
                    level="H"
                    includeMargin={true}
                    renderAs="svg"
                  />
                )}
              </div>
            </div>
            
            <div className={`text-sm text-center ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <p className="mb-2">
                Please present this QR code at the reception desk
              </p>
              <p>
                This QR code will be used for your check-in and check-out
              </p>
              {visitorData && (
                <p className="mt-2 text-xs">
                  <strong>Visitor ID:</strong> {visitorData.visitorId}
                </p>
              )}
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={registerAgain}
                className="px-6 py-3 bg-primary text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Register Another Visitor
              </button>
            </div>
          </div>
        ) : (
          <>
            <div>
              <h2 className={`text-center text-3xl font-extrabold ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Visitor Registration
              </h2>
              <p className={`mt-2 text-center text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Register to access the St. Joseph's College campus
              </p>
            </div>
            
            <form className="mt-8 space-y-6" onSubmit={onSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label htmlFor="name" className={`block font-medium mb-2 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={onChange}
                    required
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className={`block font-medium mb-2 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className={`block font-medium mb-2 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={onChange}
                    required
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label htmlFor="purpose" className={`block font-medium mb-2 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Purpose of Visit *
                  </label>
                  <input
                    type="text"
                    id="purpose"
                    name="purpose"
                    value={purpose}
                    onChange={onChange}
                    required
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Why are you visiting?"
                  />
                </div>
                
                <div>
                  <label htmlFor="visitType" className={`block font-medium mb-2 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Visit Type
                  </label>
                  <select
                    id="visitType"
                    name="visitType"
                    value={visitType}
                    onChange={onChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="Guest">Guest</option>
                    <option value="Parent">Parent</option>
                    <option value="Vendor">Vendor</option>
                    <option value="Official">Official</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="whomToMeet" className={`block font-medium mb-2 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Whom to Meet *
                  </label>
                  <input
                    type="text"
                    id="whomToMeet"
                    name="whomToMeet"
                    value={whomToMeet}
                    onChange={onChange}
                    required
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Person you're meeting"
                  />
                </div>
                
                <div>
                  <label htmlFor="idProofType" className={`block font-medium mb-2 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    ID Proof Type
                  </label>
                  <select
                    id="idProofType"
                    name="idProofType"
                    value={idProofType}
                    onChange={onChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="Aadhar">Aadhar Card</option>
                    <option value="PAN">PAN Card</option>
                    <option value="Driving">Driving License</option>
                    <option value="Passport">Passport</option>
                    <option value="VoterID">Voter ID</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="idProofNumber" className={`block font-medium mb-2 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    ID Proof Number *
                  </label>
                  <input
                    type="text"
                    id="idProofNumber"
                    name="idProofNumber"
                    value={idProofNumber}
                    onChange={onChange}
                    required
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Enter your ID number"
                  />
                </div>
              </div>
                
              <div className={`text-xs text-center mt-6 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <p>* Required fields</p>
              </div>
                
              <div className="flex justify-center">
                <button 
                  type="submit" 
                  className="px-8 py-3 bg-primary text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : 'Generate Visitor QR Code'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default VisitorRegistration;
