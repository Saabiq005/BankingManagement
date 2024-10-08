// src/pages/AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css'; // Importing the CSS file for Admin component
 
const AdminLogin = () => { // Change from Admin to AdminLogin
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
 
 const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
  const projectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;
 
  const handleLogin = async (e) => {
    e.preventDefault();
   
    // Firestore URL to access the admin document
    const adminUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/admin/admin?key=${apiKey}`;
 
    try {
      const response = await axios.get(adminUrl);
      const adminData = response.data.fields;
 
      const storedId = adminData.customerid.stringValue;
      const storedPassword = adminData.password.stringValue;
 
      if (adminId === storedId && password === storedPassword) {
        // Successful login - Navigate to Admin Menu
        navigate('/admin/dashboard'); // Update this if you have a specific dashboard route
      } else {
        // Incorrect ID or Password
        setMessage("Your ID or password is incorrect.");
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('Unable to connect to the database. Please try again later.');
    }
  };
 
  return (
    <div className="admin-container">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate('/')}>
        &larr; Back to Home
      </button>
 
      {/* Admin Login Section */}
      <div className="admin-login-box">
        <h2>Admin Log In</h2>
    
        <form onSubmit={handleLogin} className="admin-form">
          <input
            type="text"
            placeholder="Enter Admin ID"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            required
            className="admin-input"
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="admin-input"
          />
          <button type="submit" className="admin-submit-button">
            Login
          </button>
        </form>
 
        {/* Message Section */}
        {message && <p className="admin-message">{message}</p>}
      </div>
    </div>
  );
};
 
export default AdminLogin; // Ensure you export the correct component name
