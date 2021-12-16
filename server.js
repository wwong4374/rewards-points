/* eslint-disable no-lonely-if */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
/* eslint-disable arrow-body-style */
/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
const express = require('express');

const app = express();

// VARIABLES
let transactions = [
  { payer: 'DANNON', points: 300, timestamp: '2020-10-31T10:00:00Z' },
  { payer: 'UNILEVER', points: 200, timestamp: '2020-10-31T11:00:00Z' },
  { payer: 'DANNON', points: -200, timestamp: '2020-10-31T15:00:00Z' },
  { payer: 'MILLER COORS', points: 10000, timestamp: '2020-11-01T14:00:00Z' },
  { payer: 'DANNON', points: 1000, timestamp: '2020-11-02T14:00:00Z' }
];
let balances = {};
let transactionsToSpend = transactions;
let balancesToSpend = balances;

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

// API ENDPOINTS
app.get('/points/spend', (req, res) => {
  const { numPoints } = req.query;
  let numPointsRemaining = numPoints;
  const spentTransactions = [];

  transactions.sort((transactionA, transactionB) => { // Sort transactions oldest to newest
    return new Date(transactionA.timestamp) - new Date(transactionB.timestamp);
  });

  // Iterate transactions
  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    // If transaction can pay all remaining points
    if (transaction.points >= numPointsRemaining) {
      const spendObj = {
        payer: transaction.payer,
        points: -numPointsRemaining
      };
      spentTransactions.push(spendObj);
      res.send(spentTransactions);
    }
    // If transaction can pay some of remaining points
    // TODO: Account for negative point transactions. Payer's balance cannot drop below zero
    if (transaction.points > 0) {
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

app.get('/points/balance', (req, res) => {
  const { payer } = req.query;
  res.send(balances);
});

app.post('/points', (req, res) => {
  const { payer, points } = req.query;
  let timestamp = new Date();
  if (req.query.timestamp) { timestamp = req.query.timestamp; }

  const transaction = {
    payer: payer,
    points: points,
    timestamp: timestamp
  };
  transactions.push(transaction);
  setBalances();

  res.status(201).json({
    transactions: transactions
  });
});

app.listen(1234, console.log('Server listening on port 1234...'));
