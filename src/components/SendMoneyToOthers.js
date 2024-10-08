import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SendMoneytoOthers = () => {
  const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
  const PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID;
  const [customerId, setCustomerId] = useState(localStorage.getItem('customerId'));
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null); // Track selected sender's account
  const [transferAmount, setTransferAmount] = useState(0);
  const [receiverIfsc, setReceiverIfsc] = useState('');
  const [receiverAccountNumber, setReceiverAccountNumber] = useState('');
  const [message, setMessage] = useState('');

  // Fetch sender's accounts from Firestore
  const fetchAccounts = async () => {
    try {
      const response = await axios.get(
        `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/Accounts/${customerId}?key=${API_KEY}`
      );
      const accountData = response.data.fields;

      if (accountData && accountData.accounts) {
        const accountList = accountData.accounts.arrayValue.values.map(acc => acc.mapValue.fields);
        setAccounts(accountList);
      } else {
        setMessage('No accounts found for this customer ID.');
      }
    } catch (error) {
      console.error('Error fetching account details:', error);
      setMessage('Failed to fetch account details. Please try again.');
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // Send money logic: update both sender's and receiver's accounts
  const sendMoney = async () => {
    try {
      const amount = parseInt(transferAmount);

      // Fetch and update sender's account balance
      const senderBalance = parseInt(selectedAccount.balance?.integerValue);
      if (amount > senderBalance) {
        setMessage('Insufficient balance.');
        return;
      }

      const updatedSenderBalance = senderBalance - amount;
      const senderAccountData = accounts.map(account => ({
        mapValue: {
          fields: account.accountNumber?.integerValue === selectedAccount.accountNumber?.integerValue
            ? {
                ...account,
                balance: { integerValue: updatedSenderBalance },
              }
            : account,
        },
      }));

      // Update the sender's account on Firestore
      await axios.patch(
        `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/Accounts/${customerId}?key=${API_KEY}`,
        {
          fields: {
            accounts: {
              arrayValue: {
                values: senderAccountData,
              },
            },
          },
        }
      );

      // Append new transfer entry for receiver's account
      const receiverUrl = `https://firestore.googleapis.com/v1/projects/bank-common-db/databases/(default)/documents/common_db/${receiverIfsc}`;

      // Construct the new transaction object
      const newTransaction = {
        mapValue: {
          fields: {
            amount: {
              integerValue: amount.toString(),
            },
            senderAccountNumber: {
              stringValue: selectedAccount.accountNumber?.integerValue.toString(),
            },
          },
        },
      };

      // Fetch receiver's existing account data
      const receiverResponse = await axios.get(receiverUrl);
      const receiverData = receiverResponse.data.fields;

      if (!receiverData || !receiverData[receiverAccountNumber]) {
        setMessage('Receiver account not found.');
        return;
      }

      // Append the new transaction entry to the receiver's account
      const updatedReceiverTransactions = [
        ...receiverData[receiverAccountNumber].arrayValue.values,
        newTransaction,
      ];

      // Send PATCH request to update receiver's transactions
      await axios.patch(receiverUrl, {
        fields: {
          [receiverAccountNumber]: {
            arrayValue: {
              values: updatedReceiverTransactions,
            },
          },
        },
      });

      setMessage('Transfer successful!');

      // Refetch updated account details for sender
      await fetchAccounts();
    } catch (error) {
      console.error('Error during transfer:', error);
      setMessage('Transfer failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Send Money</h2>
      <select onChange={e => setSelectedAccount(accounts[e.target.value])}>
        <option>Select Account</option>
        {accounts.map((account, index) => (
          <option key={index} value={index}>
            {account.accountNumber?.integerValue} (Balance: {account.balance?.integerValue})
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Transfer Amount"
        value={transferAmount}
        onChange={e => setTransferAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Receiver IFSC Code"
        value={receiverIfsc}
        onChange={e => setReceiverIfsc(e.target.value)}
      />
      <input
        type="text"
        placeholder="Receiver Account Number"
        value={receiverAccountNumber}
        onChange={e => setReceiverAccountNumber(e.target.value)}
      />
      <button onClick={sendMoney}>Send Money</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SendMoneytoOthers;
