/* eslint-disable max-len */
/* eslint-disable no-lonely-if */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
/* eslint-disable arrow-body-style */
/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
const express = require('express');
const { transactions } = require('./pointsData.js');

const app = express();

// VARIABLES
let balances = {};

// HELPER FUNCTIONS
const setBalances = () => {
  transactions.forEach((transaction) => {
    const payer = transaction.payer;
    const points = transaction.points;

    if (balances[payer]) { // Payer already exists in the system
      if (balances[payer] + points >= 0) {
        balances[payer] += points;
      } else {
        return `Invalid transaction: ${transaction}. Payer's point balance cannot go negative.`;
      }
    } else { // Payer does not yet exist in the system
      if (points >= 0) {
        balances[payer] = points;
      } else {
        return `Invalid transaction: ${transaction}. Payer's point balance cannot go negative.`;
      }
    }
  });
};
setBalances();

// const getPayerBalanceByDate = (payer, transactions, date) => {
//   // TODO: Given an array of transactions, return the payer's point balance on given date
//   let balance = 0;
//   // Iterate transactions
//     // If transaction was from payer on the given date
//       // Add current transaction amount to balance
//   // return balance
// };

// API ENDPOINTS

// POINTS SPEND
app.get('/points/spend', (req, res) => {
  const { numPoints } = req.query;
  let numPointsRemaining = numPoints;
  const spentTransactions = [];

  transactions.sort((transactionA, transactionB) => { // Sort transactions by timestamp, oldest to newest
    return new Date(transactionA.timestamp) - new Date(transactionB.timestamp);
  });

  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    if (transaction.points >= numPointsRemaining) { // If transaction can pay all remaining points
      const spendObj = {
        payer: transaction.payer,
        points: -numPointsRemaining
      };
      spentTransactions.push(spendObj);
      res.send(spentTransactions);
    }
    // TODO: Account for negative point transactions. Payer's balance cannot drop below zero
    if (transaction.points > 0) { // If transaction can pay some of remaining points
      const spendObj = {
        payer: transaction.payer,
        points: -transaction.points
      };
      spentTransactions.push(spendObj);
      numPointsRemaining -= transaction.points;
    }
  }
  res.send('Points spent:');
});

// POINTS BALANCE
app.get('/points/balance', (req, res) => {
  res.send(balances);
});

// POINTS TRANSACTION
app.post('/points', (req, res) => {
  const { payer, points } = req.query;
  let timestamp = new Date();
  if (req.query.timestamp) { timestamp = req.query.timestamp; }

  const transaction = {
    payer: payer,
    points: parseInt(points),
    timestamp: timestamp
  };
  transactions.push(transaction);
  setBalances();

  res.status(201).json({
    transactions: transactions
  });
});

app.listen(1234, console.log('Server listening on port 1234...'));
