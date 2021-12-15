/* eslint-disable arrow-body-style */
/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
const express = require('express');

const app = express();

let transactions = [
  { payer: 'DANNON', points: 100, timestamp: '2020-11-02T14:00:00Z' },
  { payer: 'PEPSI', points: 100, timestamp: '2020-11-04T10:00:00Z' },
  { payer: 'DANNON', points: -50, timestamp: '2020-11-05T14:00:00Z' }
];
let balances = { DANNON: 50, PEPSI: 100 };

// TODO: GET request to /points/spend. Send a number of points to spend
app.get('/points/spend', (req, res) => {
  let { numPoints } = req.query;
  let spentPoints = [];

  transactions.sort((transactionA, transactionB) => { // Sort transactions oldest to newest
    return new Date(transactionA.timestamp) - new Date(transactionB.timestamp);
  });

  // Iterate transactions
    // Declare current spendObj
    // BASE CASE - All points come from first transaction
    // If transaction.points >= numPoints
      // spendObj.payer = transaction.payer
      // spendObj.points = numPoints
      // spentPoints.push(spendObj);
      // res.send(spentPoints);
    // Else


  res.send('Points spent:');
});

app.get('/points/balance', (req, res) => {
  const { payer } = req.query;
  if (balances[payer]) { res.send({ points: balances[payer] }); }
  res.send({ points: 0 });
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

  res.status(201).json({
    transactions: transactions
  });
});

app.listen(1234, console.log('Server listening on port 1234...'));
