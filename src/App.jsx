import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
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
            <Route path="/dashboard" element={
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
            <Route path="/family" element={<WeddingGuestPortal />} />
            <Route path="/friends" element={<WeddingGuestPortal/>} />
            <Route path="/relatives" element={<WeddingGuestPortal />} />
            <Route path="/others" element={<WeddingGuestPortal />} />
            
            {/* Default route */}
            <Route path="/" element={<Navigate to="/others" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;