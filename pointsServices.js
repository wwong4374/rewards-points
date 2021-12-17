/* eslint-disable import/extensions */
/* eslint-disable no-plusplus */
/* eslint-disable no-lonely-if */
/* eslint-disable arrow-body-style */
/* eslint-disable comma-dangle */
/* eslint-disable radix */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-destructuring */
const { transactions } = require('./pointsData.js');

const setBalances = (transactionsArray) => {
  const balances = {};
  transactionsArray.forEach((transaction) => {
    const payer = transaction.payer;
    const points = transaction.points;

    if (balances[payer]) { // Payer already exists in the system
      if (balances[payer] + points >= 0) {
        balances[payer] += points;
      } else {
        console.log(`Invalid transaction: ${transaction}. Payer's point balance cannot go negative.`);
      }
    } else { // Payer does not exist in the system
      if (points >= 0) {
        balances[payer] = points;
      } else {
        console.log(`Invalid transaction: ${transaction}. Payer's first point transaction cannot be negative.`);
      }
    }
  });
  return balances;
};

let balances = setBalances(transactions);

const getDateFromTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const dateString = `${date.getFullYear()}-${(`0${date.getMonth() + 1}`).slice(-2)}-${(`0${date.getDate()}`).slice(-2)}`;
  return dateString;
};

const getPayerBalanceByDate = (payer, transactionsArray, date) => {
  let balance = 0;
  transactionsArray.forEach((transaction) => {
    const transactionDate = getDateFromTimestamp(transaction.timestamp);
    // TODO: Add all transactions prior to and including today, instead of just today
    if (transaction.payer === payer && transactionDate === date) { balance += transaction.points; }
  });
  return balance;
};

const createTransaction = (payer, points, timestamp) => {
  const transaction = {
    payer: payer,
    points: parseInt(points),
    timestamp: timestamp
  };
  return transaction;
};

const spendPoints = (pointsToSpend, transactionsArray) => {
  let numPointsRemaining = pointsToSpend;
  const spendArray = [];

  // Sort transactionsArray by timestamp, oldest to newest
  transactionsArray.sort((transactionA, transactionB) => {
    return new Date(transactionA.timestamp) - new Date(transactionB.timestamp);
  });

  for (let i = 0; i < transactionsArray.length; i++) {
    const transaction = transactionsArray[i];
    const payer = transaction.payer;
    // Get payer's point balance as of the current transaction's day
    const payerPointBalanceOnCurrentDate = getPayerBalanceByDate(
      payer, transactionsArray, getDateFromTimestamp(transaction.timestamp)
    );

    if (numPointsRemaining === 0) { break; }
    if (transaction.points <= 0) { continue; }
    if (payerPointBalanceOnCurrentDate >= numPointsRemaining) { // If payer can pay all of the remaining points
      const spendObj = {
        payer: transaction.payer,
        points: -numPointsRemaining
      };
      spendArray.push(spendObj);
      numPointsRemaining -= numPointsRemaining;

      const transactionObj = spendObj;
      transactionObj.timestamp = transaction.timestamp;
      transactions.push(transactionObj);
    } else { // If payer can pay some of the remaining points
      if (payerPointBalanceOnCurrentDate > 0) {
        const spendObj = {
          payer: transaction.payer,
          points: -payerPointBalanceOnCurrentDate
        };
        spendArray.push(spendObj);
        numPointsRemaining -= payerPointBalanceOnCurrentDate;

        const transactionObj = spendObj;
        transactionObj.timestamp = transaction.timestamp;
        transactions.push(transactionObj);
      }
    }
  }
  return spendArray;
};

module.exports = {
  balances,
  setBalances,
  getDateFromTimestamp,
  getPayerBalanceByDate,
  createTransaction,
  spendPoints
};
