/* eslint-disable no-plusplus */
/* eslint-disable radix */
/* eslint-disable import/extensions */
/* eslint-disable no-lonely-if */
/* eslint-disable arrow-body-style */
/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
const express = require('express');
const { spendPoints } = require('./pointsServices.js');

const app = express();

// VARIABLES
let transactions = [];
let balances = {};

// API ENDPOINTS:
// POINTS SPEND
app.get('/points/spend', (req, res) => {
  const { pointsToSpend } = req.query;
  const spentPoints = spendPoints(pointsToSpend, transactions);
  res.send(spentPoints);
});

// POINTS BALANCE
app.get('/points/balance', (req, res) => {
  res.send(balances);
});

// POINTS TRANSACTION
app.post('/points', (req, res) => {
  // Create a newTransaction object with keys for payer, points, and timestamp
  const { payer, points } = req.query;
  let newTimestamp = new Date();
  if (req.query.timestamp) { newTimestamp = new Date(req.query.timestamp); }
  const newTransaction = { payer: payer, points: Number(points), timestamp: newTimestamp };

  // Add newTransaction to transactions array
  transactions.push(newTransaction);

  // Sort transactions array by timestamp, oldest to newest
  transactions = transactions.sort((transactionA, transactionB) => {
    return new Date(transactionA.timestamp) - new Date(transactionB.timestamp);
  });

  // Update payer's point balance
  if (balances[payer]) {
    balances[payer] += Number(points);
  } else {
    balances[payer] = Number(points);
  }

  res.sendStatus(201);
});

app.get('/transactions', (req, res) => {
  res.send(transactions);
});

app.listen(1234, console.log('Server listening on port 1234...'));

module.exports = { balances };

// SAMPLE DATA
let sampleTransactions = [
  { payer: 'DANNON', points: 300, timestamp: '2020-10-31T10:00:00Z' },
  { payer: 'UNILEVER', points: 200, timestamp: '2020-10-31T11:00:00Z' },
  { payer: 'DANNON', points: -200, timestamp: '2020-10-31T15:00:00Z' },
  { payer: 'MILLER COORS', points: 10000, timestamp: '2020-11-01T14:00:00Z' },
  { payer: 'DANNON', points: 1000, timestamp: '2020-11-02T14:00:00Z' }
];
