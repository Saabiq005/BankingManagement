import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography, Container, Card, CardContent } from '@mui/material';
import './ViewProfile.css'; // You can create this file for custom styling
import { useNavigate } from 'react-router-dom';

// API configuration
const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
const PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID;

const ViewProfile = () => {
  const [accountsData, setAccountsData] = useState([]);
  const [loansData, setLoansData] = useState([]);
  const [fdData, setFdData] = useState([]);
  const [selectedView, setSelectedView] = useState('accounts'); // Default view
  const customerId = localStorage.getItem('customerId');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch accounts, loans, and FD data
    const fetchCustomerData = async () => {
      try {
        // Fetch accounts data
        const accountsResponse = await axios.get(
          `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/Accounts/${customerId}?key=${API_KEY}`
        );
        setAccountsData(accountsResponse.data.fields.accounts.arrayValue.values);

        // Fetch loans data
        const loansResponse = await axios.get(
          `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/Loans/${customerId}?key=${API_KEY}`
        );
        setLoansData(loansResponse.data.fields.loans.arrayValue.values);

        // Fetch FD data
        const fdResponse = await axios.get(
          `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/FD/${customerId}?key=${API_KEY}`
        );
        setFdData(fdResponse.data.fields.FD.arrayValue.values);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomerData();
  }, [customerId]);

  // Render accounts
  const renderAccounts = () => (
    <Container>
      <Typography variant="h5" align="center" gutterBottom>
        Accounts
      </Typography>
      {accountsData.map((account, index) => (
        <Card key={index} sx={{ marginBottom: '10px', padding: '10px' }}>
          <CardContent>
            <Typography>Account Number: {account.mapValue.fields.accountNumber.integerValue}</Typography>
            <Typography>Account Type: {account.mapValue.fields.accountType.stringValue}</Typography>
            <Typography>Balance: {account.mapValue.fields.balance.integerValue}</Typography>
            <Typography>Transfer Limit: {account.mapValue.fields.transferlimit.integerValue}</Typography>
            <Typography>IFSC: {account.mapValue.fields.IFSC.stringValue}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );

  // Render loans
  const renderLoans = () => (
    <Container>
      <Typography variant="h5" align="center" gutterBottom>
        Loans
      </Typography>
      {loansData.map((loan, index) => (
        <Card key={index} sx={{ marginBottom: '10px', padding: '10px' }}>
          <CardContent>
            <Typography>Loan Amount: {loan.mapValue.fields.loanAmount.doubleValue}</Typography>
            <Typography>Loan Type: {loan.mapValue.fields.loanType.stringValue}</Typography>
            <Typography>Monthly Installment: {loan.mapValue.fields.monthlyInstallment.doubleValue}</Typography>
            <Typography>Number of Years: {loan.mapValue.fields.numberOfYears.integerValue}</Typography>
            <Typography>Total Amount: {loan.mapValue.fields.totalAmount.doubleValue}</Typography>
            <Typography>Total Interest: {loan.mapValue.fields.totalInterest.doubleValue}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );

  // Render fixed deposits
  const renderFD = () => (
    <Container>
      <Typography variant="h5" align="center" gutterBottom>
        Fixed Deposits
      </Typography>
      {fdData.map((fd, index) => (
        <Card key={index} sx={{ marginBottom: '10px', padding: '10px' }}>
          <CardContent>
            <Typography>FD Amount: {fd.mapValue.fields.fdAmount.integerValue}</Typography>
            <Typography>FD Type: {fd.mapValue.fields.fdType.stringValue}</Typography>
            <Typography>Number of Years: {fd.mapValue.fields.numberOfYears.integerValue}</Typography>
            <Typography>Returns: {fd.mapValue.fields.returns.integerValue}</Typography>
            <Typography>Total Amount: {fd.mapValue.fields.totalAmount.integerValue}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );

  return (
    <div className="view-profile">
      {/* Header */}
      <header className="header">
        <Typography variant="h6" sx={{ textAlign: 'center', padding: '20px' }}>
          Welcome, {customerId}
        </Typography>
      </header>

      {/* Sidebar */}
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box
          className="sidebar"
          sx={{
            width: '250px',
            backgroundColor: '#232f3e',
            color: 'white',
            height: '100vh',
            padding: '20px',
          }}
        >
          <Button
            onClick={() => setSelectedView('accounts')}
            sx={{ display: 'block', color: 'white', marginBottom: '10px', width: '100%' }}
            variant={selectedView === 'accounts' ? 'contained' : 'outlined'}
          >
            View Accounts
          </Button>
          <Button
            onClick={() => setSelectedView('loans')}
            sx={{ display: 'block', color: 'white', marginBottom: '10px', width: '100%' }}
            variant={selectedView === 'loans' ? 'contained' : 'outlined'}
          >
            View Loans
          </Button>
          <Button
            onClick={() => setSelectedView('fd')}
            sx={{ display: 'block', color: 'white', marginBottom: '10px', width: '100%' }}
            variant={selectedView === 'fd' ? 'contained' : 'outlined'}
          >
            View Fixed Deposits
          </Button>
        </Box>

        {/* Main Content Area */}
        <Box sx={{ flexGrow: 1, padding: '20px' }}>
          {selectedView === 'accounts' && renderAccounts()}
          {selectedView === 'loans' && renderLoans()}
          {selectedView === 'fd' && renderFD()}
        </Box>
      </Box>
    </div>
  );
};

export default ViewProfile;
