import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import VisitorList from './pages/admin/VisitorList';
import StaffList from './pages/admin/StaffList';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';
import StaffRoute from './components/routing/StaffRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/admin/visitors" element={<AdminRoute><VisitorList /></AdminRoute>} />
          <Route path="/admin/staff" element={<AdminRoute><StaffList /></AdminRoute>} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
