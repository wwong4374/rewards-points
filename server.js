/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
const express = require('express');

const app = express();
// app.use(express.json());

let transactions = [];
let balances = { DANNON: 100 };

app.get('/points/payer', (req, res) => {
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

// TODO: POST request to /points/spend. Send a number of points to spend

app.listen(1234, console.log('Server listening on port 1234...'));
