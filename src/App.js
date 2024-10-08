import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home.js'; // Your home page
import LoginPage from './components/LoginPage.js';
import SignUpPage from './components/SignUpPage.js';
import AdminLogin from './Pages/AdminLogin.js'; // Import the AdminLogin component
import AdminPage from './components/AdminPage.js'; // Assuming this is for the admin dashboard
import CustomerPage from './components/CustomerPage.js';
import ApplyLoan from './components/ApplyLoan.js';
import LoanRequest from './components/LoanRequest.js';
import ApplyFixedDeposit from './components/ApplyFixedDeposit.js';
import FDrequest from './components/FDrequest.js';
import Edit from './components/Edit.js';
import ViewProfile from './components/ViewProfile.js'
import WithdrawDeposit from './components/WithdrawDeposit.js';
import SendMoneyWithinBank from './components/SendMoneyWithinBank.js'
import SendMoneyToOthers from './components/SendMoneyToOthers.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define the route for home page */}
          <Route path="/" element={<Home />} />
          {/* Define the route for customer login page */}
          <Route path="/customer-login" element={<LoginPage />} />
          {/* Define the route for sign up page */}
          <Route path="/signup" element={<SignUpPageWithBack />} />
          {/* Define the route for admin login page */}
          <Route path="/admin" element={<AdminLogin />} /> {/* Update this to AdminLogin */}
          {/* Define the route for admin dashboard, if needed */}
          <Route path="/admin/dashboard" element={<AdminPage />} />
          <Route path="/customerpage" element={<CustomerPage />} />
          <Route path="/apply-loan" element={<ApplyLoan />} />
          <Route path="/loanreq" element={<LoanRequest />} />
          <Route path="/fixed-deposit" element={<ApplyFixedDeposit />} />
          <Route path="/fixed-deposit-request" element={<FDrequest />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/viewprofile" element={<ViewProfile />} />
          <Route path="/withdraw-deposit" element={<WithdrawDeposit />} />
          <Route path="/send-money-within-bank" element={<SendMoneyWithinBank />} />
          <Route path="/send-money-others" element={<SendMoneyToOthers />} />

        </Routes>
      </div>
    </Router>
  );
}

// Component for sign up page with back to login button
function SignUpPageWithBack() {
  return (
    <div>
      <SignUpPage />
      {/* Button to go back to home */}
      <button onClick={() => window.location.href = '/'}>Back to Home</button>
    </div>
  );
}

export default App;
