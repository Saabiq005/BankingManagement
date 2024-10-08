import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Grid, Paper } from '@mui/material';
import OpenRequests from './OpenRequests.js';
import LoanRequest from './LoanRequest.js';
import FDrequest from './FDrequest.js';
import TransactionLimit from './TransactionLimit.js'; 

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState('');
  const navigate = useNavigate();

  const handleSidebarClick = (section) => {
    setActiveSection(section);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header with Amazon color theme */}
      <AppBar position="static" sx={{ backgroundColor: '#232f3e' }}> {/* Amazon Blue (Light) */}
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Saabiq Bank of India
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>

      {/* Grid layout covering the full height and width of the page */}
      <Box sx={{ flexGrow: 1, display: 'flex' }}>
        <Grid container sx={{ height: '100%', width: '100%' }}>
          {/* Sidebar Section */}
          <Grid item xs={12} sm={3}>
            <Paper
              elevation={3}
              sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', p: 2 }}
            >
              <Button
                fullWidth
                variant="contained"
                onClick={() => handleSidebarClick('accountRequests')}
                sx={{
                  mb: 1,
                  backgroundColor: '#FF9900',  // Amazon Orange
                  '&:hover': { backgroundColor: '#e68a00' } // Darker shade on hover
                }}
              >
                Account Opening Requests
              </Button>
              <Button
                fullWidth
                variant="contained"
                onClick={() => handleSidebarClick('loanRequests')}
                sx={{
                  mb: 1,
                  backgroundColor: '#FF9900', // Amazon Orange
                  '&:hover': { backgroundColor: '#e68a00' } // Darker shade on hover
                }}
              >
                Loan Requests
              </Button>
              <Button
                fullWidth
                variant="contained"
                onClick={() => handleSidebarClick('FDRequests')}
                sx={{
                  mb: 1,
                  backgroundColor: '#FF9900', // Amazon Orange
                  '&:hover': { backgroundColor: '#e68a00' } // Darker shade on hover
                }}
              >
                FD Requests
              </Button>
              <Button
                fullWidth
                variant="contained"
                onClick={() => handleSidebarClick('transactionLimit')}
                sx={{
                  backgroundColor: '#FF9900', // Amazon Orange
                  '&:hover': { backgroundColor: '#e68a00' } // Darker shade on hover
                }}
              >
                Set Transaction Limit
              </Button>
            </Paper>
          </Grid>

          {/* Main Content Section */}
          <Grid item xs={12} sm={9}>
            <Paper
              elevation={3}
              sx={{ height: '100%', p: 4, overflowY: 'auto' }}
            >
              {/* Render the content based on active section */}
              {activeSection === 'accountRequests' && <OpenRequests />}
              {activeSection === 'loanRequests' && <LoanRequest />}
              {activeSection === 'FDRequests' && <FDrequest />}
              {activeSection === 'transactionLimit' && <TransactionLimit />} {/* Render TransactionLimit */}

              {/* Default Welcome Message */}
              {activeSection === '' && (
                <Box>
                  <Typography variant="h4" gutterBottom>
                    Welcome, Admin!
                  </Typography>
                  <Typography variant="body1">
                    Hey admin, what do you want to do today?
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminPage;
