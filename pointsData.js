/* eslint-disable arrow-body-style */
/* eslint-disable indent */
/* eslint-disable comma-dangle */
// POINTS SPEND ALGORITHM
let transactions = [
  { payer: 'DANNON', points: 300, timestamp: '2020-10-31T10:00:00Z' },
  { payer: 'UNILEVER', points: 200, timestamp: '2020-10-31T11:00:00Z' },
  { payer: 'DANNON', points: -200, timestamp: '2020-10-31T15:00:00Z' },
  { payer: 'MILLER COORS', points: 10000, timestamp: '2020-11-01T14:00:00Z' },
  { payer: 'DANNON', points: 1000, timestamp: '2020-11-02T14:00:00Z' }
];

const getDateFromTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const dateString = `${date.getFullYear()}-${(`0${date.getMonth() + 1}`).slice(-2)}-${(`0${date.getDate()}`).slice(-2)}`;
  return dateString;
};

const getPayerBalanceByDate = (payer, transactionsArray, date) => {
  let balance = 0;
  transactionsArray.forEach((transaction) => {
    const transactionDate = getDateFromTimestamp(transaction.timestamp);
    if (transaction.payer === payer && transactionDate === date) { balance += transaction.points; }
  });
  return balance;
};

// EXAMPLE: Spend 500 points
let expectedOutput = [
  { payer: 'DANNON', points: -100 },
  { payer: 'UNILEVER', points: -200 },
  { payer: 'MILLER COORS', points: -4700 }
];
// ALGORITHM
  // Declare pointsToSpend
  // Iterate transactions
    // Get current payer's NET point balance on current day

    // If current payer's point balance can cover all pointsToSpend
      // Declare spendObj
        // Payer = current payer
        // Points = pointsToSpend
      // Add spendObj to spendArray
      // Declare transactionObj and set equal to spendObj
        // Add timestamp to transactionObj
        // Add transactionObj to transactionsArray
    // Else, current payer's point balance can cover part of pointsToSpend
      // Delcare spendObj
        // Payer = current payer
        // Points = current transaction's point balance
      // Add spendObj to spendArray
      // Declare transactionObj and set equal to spendObj
        // Add timestamp to transactionObj
        // Add transactionObj to transactionsArray
  // return spendArray

/*
 * The oldest points are DANNON's 300 from 10/31.
 *
 *
 */

module.exports = {
  transactions
};
