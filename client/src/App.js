import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AnimatedBackground from './components/common/AnimatedBackground';
import Navbar from './components/layout/Navbar';
import ThemeToggle from './components/common/ThemeToggle';
import { ThemeProvider, useTheme } from './context/ThemeContext';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AdminDashboard from './pages/admin/Dashboard';
import VisitorList from './pages/admin/VisitorList';
import VisitorRegistration from './pages/VisitorRegistration';
import StaffDashboard from './pages/staff/Dashboard';
import CollegeMap from './pages/CollegeMap';
import NotFound from './pages/NotFound';

const AppContent = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Router>
      <AnimatedBackground>
        <div className={`flex flex-col min-h-screen ${isDarkMode ? 'dark text-gray-100' : 'text-gray-800'}`}>
          <Navbar isDarkMode={isDarkMode} />
          <div className="fixed top-4 right-4 z-50">
            <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          </div>
          <main className="flex-grow pt-24">
            <ToastContainer 
              position="top-right" 
              autoClose={3000} 
              toastClassName={`backdrop-blur-sm ${isDarkMode ? 'bg-gray-800/90 text-gray-100' : 'bg-white/80 text-gray-800'}`}
              theme={isDarkMode ? 'dark' : 'light'}
            />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Navigate to="/visitor/register" replace />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/visitors" element={<VisitorList />} />
              <Route path="/visitor/register" element={<VisitorRegistration />} />
              <Route path="/staff/dashboard" element={<StaffDashboard />} />
              <Route path="/college-map" element={<CollegeMap />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <footer className={`${
            isDarkMode 
              ? 'bg-gray-800/90' 
              : 'bg-blue-800/90'
            } backdrop-filter backdrop-blur-sm text-white p-4 text-center`}>
            <p> {new Date().getFullYear()} St. Joseph's College Visitor Management System</p>
          </footer>
        </div>
      </AnimatedBackground>
    </Router>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
