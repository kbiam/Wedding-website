import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import GuestsByRelation from './components/GuestsByRelation';
import Statistics from './components/Statistics';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import WeddingGuestPortal from './components/WeddingGuestPortal';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Private routes */}
            <Route path="/admin" element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            } />
            <Route path="/statistics" element={
              <PrivateRoute>
                <Statistics />
              </PrivateRoute>
            } />
            
            {/* Public routes for end users */}
            <Route path="/family" element={<GuestsByRelation relation="family" />} />
            <Route path="/friends" element={<GuestsByRelation relation="friend" />} />
            <Route path="/relatives" element={<GuestsByRelation relation="relative" />} />
            <Route path="/others" element={<GuestsByRelation relation="other" />} />
            <Route path="/test" element={<WeddingGuestPortal/>} />
            
            {/* Default route */}
            <Route path="/" element={<Navigate to="/family" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;