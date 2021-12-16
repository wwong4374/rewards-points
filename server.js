/* eslint-disable radix */
/* eslint-disable import/extensions */
/* eslint-disable no-lonely-if */
/* eslint-disable arrow-body-style */
/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
const express = require('express');
const { transactions } = require('./pointsData.js');
const { setBalances, createTransaction, spendPoints } = require('./pointsHelperFunctions.js');

const app = express();

// VARIABLES
const balances = setBalances(transactions);

// API ENDPOINTS:
// POINTS SPEND
app.get('/points/spend', (req, res) => {
  const { pointsToSpend } = req.query;
  const spendArray = spendPoints(pointsToSpend, transactions);
  // TODO: Add spendObjs to transactions array
  res.send(spendArray);
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

  transactions.push(createTransaction(payer, points, timestamp));
  setBalances(transactions);

  res.status(201).json({
    transactions: transactions
  });
});

app.listen(1234, console.log('Server listening on port 1234...'));
