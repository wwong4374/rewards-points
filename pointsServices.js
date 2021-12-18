/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-plusplus */
/* eslint-disable no-lonely-if */
/* eslint-disable arrow-body-style */
/* eslint-disable comma-dangle */
/* eslint-disable radix */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-destructuring */
// const { transactions } = require('./pointsData.js');

// const setBalances = (transactionsArray) => {
//   const balances = {};
//   transactionsArray.forEach((transaction) => {
//     const payer = transaction.payer;
//     const points = transaction.points;
//     if (balances[payer]) { // Payer already exists in the system
//       if (balances[payer] + points >= 0) {
//         balances[payer] += points;
//       }
//     } else { // Payer does not exist in the system
//       if (points >= 0) {
//         balances[payer] = points;
//       }
//     }
//   });
//   return balances;
// };

// const balances = setBalances(transactions);
// const createTransaction = (payer, points, timestamp) => {
//   const transaction = {
//     payer: payer,
//     points: parseInt(points),
//     timestamp: timestamp
//   };
//   return transaction;
// };
const getDateFromTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const dateString = `${date.getFullYear()}-${(`0${date.getMonth() + 1}`).slice(-2)}-${(`0${date.getDate()}`).slice(-2)}`;
  return dateString;
};

const getPayerBalanceByDate = (payer, transactionsArray, dateString) => {
  const date = new Date(dateString);
  let balance = 0;
  transactionsArray.forEach((transaction) => {
    const transactionDateString = getDateFromTimestamp(transaction.timestamp);
    const transactionDate = new Date(transactionDateString);
    // Add all transactions before and including today
    if (transaction.payer === payer && transactionDate <= date) { balance += transaction.points; }
  });
  return balance;
};

const spendPoints = (pointsToSpend, transactionsArray) => {
  let numPointsRemaining = pointsToSpend;
  const spendArray = [];

  for (let i = 0; i < transactionsArray.length; i++) {
    const transaction = transactionsArray[i];
    const payer = transaction.payer;
    // Get payer's point balance as of the current transaction's day
    const payerPointBalanceOnCurrentDate = getPayerBalanceByDate(
      payer, transactionsArray, getDateFromTimestamp(transaction.timestamp)
    );

    // TODO: Go through the transactions oldest to newest, add all to spendArray. Update payer balances along the way
    // TODO: Once payment total is reached, stop and return spendArray

    if (numPointsRemaining === 0) { break; }
    // if (transaction.points <= 0) { continue; }
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
  getDateFromTimestamp,
  getPayerBalanceByDate,
  spendPoints
};
