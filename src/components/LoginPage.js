// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './login.css'; // Import the custom CSS file for Login
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js'; // Import CryptoJS for encryption/decryption

const Login = () => {
  const [customerId, setCustomerId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
  const PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID;

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/Customers/${customerId}?key=${API_KEY}`);
      const customerData = response.data.fields;

      // Decrypt the stored password for comparison
      const decryptedPassword = CryptoJS.AES.decrypt(customerData.password.stringValue, process.env.REACT_APP_SECRET_KEY).toString(CryptoJS.enc.Utf8);

      if (decryptedPassword === password) {
        // Store customer ID in localStorage
        localStorage.setItem('customerId', customerId); // Store customer ID

        navigate('/customerpage'); // Navigate to CustomerMenu.js
      } else {
        setMessage('Incorrect password. Please try again.'); // Humble error message
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('Customer ID not found. Please check your ID and try again.'); // Humble error message
    }
  };

  return (
    <Container maxWidth="sm">
      <Box className="login-container">
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: '#ff9900', textAlign: 'center', fontWeight: 'bold' }} // Amazon's orange color for the heading
        >
          Welcome to Our Bank!
        </Typography>
        <Typography variant="body1" sx={{ color: '#131921', textAlign: 'center', marginBottom: '20px' }}>
          We're excited to have you here! Please log in to manage your account.
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Customer ID"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            fullWidth
            required
            margin="normal"
            sx={{ backgroundColor: '#fff' }} // White background for input fields
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
            sx={{ backgroundColor: '#fff' }} // White background for input fields
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#ff9900', // Amazon's orange color for the button
              color: '#131921', // Dark Amazon-like text color
              marginTop: '20px',
              '&:hover': {
                backgroundColor: '#f90', // Darker orange on hover
              },
            }}
          >
            Login
          </Button>
        </form>
        {message && (
          <Typography variant="body1" sx={{ color: '#ff0000', textAlign: 'center', marginTop: '20px' }}>
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Login;
