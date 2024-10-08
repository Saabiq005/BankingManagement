import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CustomerPage.css';
import { Box, Button, Container, Typography, Card, CardContent } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';

// API configuration
const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
const PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID;

const CustomerPage = () => {
  const [customerData, setCustomerData] = useState(null);
  const navigate = useNavigate();

  const customerId = localStorage.getItem('customerId');

  useEffect(() => {
    // Fetch customer data
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(
          `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/Customers/${customerId}?key=${API_KEY}`
        );
        setCustomerData(response.data.fields);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomerData();
  }, [customerId]);

  const handleLogout = () => {
    localStorage.removeItem('customerId');
    navigate('/');
  };

  const handleEdit = () => {
    navigate('/edit');
  };

  const handleViewProfile = () => {
    navigate('/viewprofile');
  };

  if (!customerData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="customer-page">
      {/* Header Section */}
      <header className="header">
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          Saabiq Bank of India
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#ff9900',
            color: 'white',
            '&:hover': {
              backgroundColor: '#e68a00',
            },
            position: 'absolute',
            right: '20px',
            top: '20px',
          }}
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </header>

      {/* Welcome Message */}
      <Typography variant="h5" sx={{ textAlign: 'center', marginTop: '20px' }}>
        Welcome, {customerData.name.stringValue}
      </Typography>

      {/* Edit & View Profile Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: '10px' }}>
        <Button
          onClick={handleEdit}
          variant="contained"
          sx={{
            backgroundColor: '#ff9900',
            color: 'white',
            '&:hover': {
              backgroundColor: 'black',
            },
          }}
          startIcon={<EditIcon />}
        >
          Edit Profile
        </Button>
        <Button
          onClick={handleViewProfile}
          variant="contained"
          sx={{
            backgroundColor: '#ff9900',
            color: 'white',
            '&:hover': {
              backgroundColor: 'black',
            },
          }}
          startIcon={<VisibilityIcon />}
        >
          View Profile
        </Button>
      </Box>

      {/* Services and Transactions Sections */}
      <Container className="account-container" sx={{ marginTop: '40px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          {/* Services Section */}
          <Card
            sx={{
              flex: 1,
              backgroundColor: '#232f3e',
              border: '1px solid #e0e0e0',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <CardContent>
              <Typography variant="h6" align="center" gutterBottom sx={{ color: 'white' }}>
                Services
              </Typography>
              <Box sx={{ textAlign: 'center', marginBottom: '10px' }}>
                <Button
                  variant="contained"
                  onClick={() => navigate('/apply-loan')}
                  sx={{
                    marginBottom: '10px',
                    width: '100%',
                    backgroundColor: '#ff9900',
                    '&:hover': {
                      backgroundColor: 'black',
                    },
                  }}
                >
                  Apply for Loan
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate('/fixed-deposit')}
                  sx={{
                    marginBottom: '10px',
                    width: '100%',
                    backgroundColor: '#ff9900',
                    '&:hover': {
                      backgroundColor: 'black',
                    },
                  }}
                >
                  Apply for Fixed Deposit
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate('/open-account')}
                  sx={{
                    width: '100%',
                    backgroundColor: '#ff9900',
                    '&:hover': {
                      backgroundColor: 'black',
                    },
                  }}
                >
                  Open Another Account
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Transactions Section */}
          <Card
            sx={{
              flex: 1,
              backgroundColor: '#232f3e',
              border: '1px solid #e0e0e0',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <CardContent>
              <Typography variant="h6" align="center" gutterBottom sx={{ color: 'white' }}>
                Transactions
              </Typography>
              <Box sx={{ textAlign: 'center', marginBottom: '10px' }}>
                <Button
                  variant="contained"
                  onClick={() => navigate('/withdraw-deposit')}
                  sx={{
                    marginBottom: '10px',
                    width: '100%',
                    backgroundColor: '#ff9900',
                    '&:hover': {
                      backgroundColor: 'black',
                    },
                  }}
                >
                  Withdraw/Deposit Money
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate('/send-money-within-bank')}
                  sx={{
                    marginBottom: '10px',
                    width: '100%',
                    backgroundColor: '#ff9900',
                    '&:hover': {
                      backgroundColor: 'black',
                    },
                  }}
                >
                  Send Money Within Bank
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate('/send-money-others')}
                  sx={{
                    width: '100%',
                    backgroundColor: '#ff9900',
                    '&:hover': {
                      backgroundColor: 'black',
                    },
                  }}
                >
                  Send Money to Others
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>

      {/* Footer */}
      <footer className="footer">
        <Typography variant="body2" align="center">
          &copy; 2024 Banking Management System
        </Typography>
      </footer>
    </div>
  );
};

export default CustomerPage;
