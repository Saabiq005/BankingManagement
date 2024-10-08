import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Paper } from '@mui/material';

const Home = () => {
  const navigate = useNavigate();

  const handleAdminRedirect = () => {
    navigate('/admin');
  };

  const handleCustomerRedirect = () => {
    navigate('/customer-login');
  };

  const handleNewCustomerRedirect = () => {
    navigate('/signup');
  };

  return (
    <div>
      {/* Navbar */}
      <AppBar position="static" style={{ backgroundColor: '#232f3e' }}> {/* Amazon Dark Blue */}
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Saabiq Bank of India
          </Typography>
          <Button color="inherit" onClick={handleAdminRedirect}>Admin</Button>
          <Button color="inherit" onClick={handleCustomerRedirect}>Customer</Button>
          <Button color="inherit" onClick={handleNewCustomerRedirect}>New Customer</Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container>
        <Typography variant="h2" align="center" gutterBottom style={{ marginTop: '20px' }}>
          Welcome to Saabiq Bank of India
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Your trusted partner in personal and financial growth.
        </Typography>

        {/* Services Section */}
        <section>
          <Typography variant="h4" align="center" gutterBottom>
            Our Services
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h5" gutterBottom>
                  Personal Banking
                </Typography>
                <Typography variant="body2">
                  Manage your personal accounts easily and securely.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h5" gutterBottom>
                  Loans
                </Typography>
                <Typography variant="body2">
                  Flexible loan options to suit your financial needs.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h5" gutterBottom>
                  Credit Cards
                </Typography>
                <Typography variant="body2">
                  Enjoy rewards and benefits with our credit card options.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </section>

        {/* About Us Section */}
        <section style={{ marginTop: '30px' }}>
          <Typography variant="h4" align="center" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body1" align="center">
            We are committed to providing exceptional banking services to our customers. Our team of professionals is dedicated to helping you achieve your financial goals.
          </Typography>
        </section>
      </Container>

      {/* Footer */}
      <footer style={{ backgroundColor: '#232f3e', color: 'white', padding: '10px', marginTop: '20px' }}>
        <Typography variant="body2" align="center">
          &copy; {new Date().getFullYear()} Saabiq Bank of India. All rights reserved.
        </Typography>
      </footer>
    </div>
  );
};

export default Home;
