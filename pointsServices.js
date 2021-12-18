/* eslint-disable indent */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-plusplus */
/* eslint-disable no-lonely-if */
/* eslint-disable arrow-body-style */
/* eslint-disable comma-dangle */
/* eslint-disable radix */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-destructuring */
// const { balances } = require('./server.js');
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

// const getDateFromTimestamp = (timestamp) => {
//   const date = new Date(timestamp);
//   const dateString = `${date.getFullYear()}-${(`0${date.getMonth() + 1}`).slice(-2)}-${(`0${date.getDate()}`).slice(-2)}`;
//   return dateString;
// };

// const getPayerBalanceByDate = (payer, transactionsArray, dateString) => {
//   const date = new Date(dateString);
//   let balance = 0;
//   transactionsArray.forEach((transaction) => {
//     const transactionDateString = getDateFromTimestamp(transaction.timestamp);
//     const transactionDate = new Date(transactionDateString);
//     // Add all transactions before and including today
//     if (transaction.payer === payer && transactionDate <= date) { balance += transaction.points; }
//   });
//   return balance;
// };


const spendPoints = (pointsToSpend, transactions) => {
  let pointsRemainingToSpend = pointsToSpend;
  const spentPoints = [];
  const payers = [];
  const payerIndices = {};

  // Iterate transactions. Add transactions to spendArray until we have reached the spend amount
  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    const { payer, points } = transaction;

    // If we have reached the spend amount, exit the loop
    if (pointsRemainingToSpend === 0) { break; }
    // If payer is new to this spend
    if (!payers.includes(payer)) {
      // Add spendObj to spentPoints array
      const spendObj = { payer: payer, points: -points };
      spentPoints.push(spendObj);
      pointsRemainingToSpend -= spendObj.points;

      // Store array index of payer's spendObj within spentPoints array
      payerIndices[payer] = spentPoints.length;
    } else { // Else, payer is already included in this spend
      // Find the payer's spendObj
      debugger;
      const payerIndex = payerIndices[payer];
      const spendObj = spentPoints[payerIndex];
      // If current transaction would cause payer's points to go negative
      if (spendObj.points + transaction.points < 0) {
        continue;
      } else {
        spendObj.points += transaction.points;
      }
      pointsRemainingToSpend -= spendObj.points;
      spentPoints[payerIndex] = spendObj;
      // spentPoints.push(spendObj);
    }

    // // If transaction has more points than needed to complete the spend
    // if (transaction.points >= pointsRemainingToSpend) {
    //   // transaction.points = pointsRemainingToSpend;
    //   spendObj.points = pointsRemainingToSpend;
    // } else {
    //   spendObj.points = transaction.points;
    // }
    // spendArray.push(transaction);
    // pointsRemainingToSpend -= transaction.points;
    // If this is a new payer in this spend, add to the list of payers
    // if (!payers.includes(transaction.payer)) { payers.push(transaction.payer); }
  }

  // Iterate spendArray
  // for (let j = 0; j < spendArray.length; j++) {
    // const transaction = spendArray[j];
    // Declare spentObj and assign it a payer
    // const spentObj = { payer: transaction.payer };
    // For current payer, check if there are any negative transactions in spendArray
      // If so, take the difference and assign that number as spendObj points
    // Push spentObj to spentPoints
  // }

  return spentPoints;
};

module.exports = {
  // getDateFromTimestamp,
  // getPayerBalanceByDate,
  spendPoints
};

// Get payer's point balance as of the current transaction's day
    // const payerPointBalanceOnCurrentDate = getPayerBalanceByDate(
    //   payer, transactions, getDateFromTimestamp(transaction.timestamp)
    // );

    // TODO: Go through the transactions oldest to newest, add all to spendArray. Update payer balances along the way
    // TODO: Once payment total is reached, stop and return spendArray

    // if (numPointsRemaining === 0) { break; }
    // if (transaction.points <= 0) { continue; }
    // if (payerPointBalanceOnCurrentDate >= numPointsRemaining) { // If payer can pay all of the remaining points
    //   const spendObj = {
    //     payer: transaction.payer,
    //     points: -numPointsRemaining
    //   };
    //   spendArray.push(spendObj);
    //   numPointsRemaining -= numPointsRemaining;

    //   const transactionObj = spendObj;
    //   transactionObj.timestamp = transaction.timestamp;
    //   transactions.push(transactionObj);
    // } else { // If payer can pay some of the remaining points
    //   if (payerPointBalanceOnCurrentDate > 0) {
    //     const spendObj = {
    //       payer: transaction.payer,
    //       points: -payerPointBalanceOnCurrentDate
    //     };
    //     spendArray.push(spendObj);
    //     numPointsRemaining -= payerPointBalanceOnCurrentDate;

    //     const transactionObj = spendObj;
    //     transactionObj.timestamp = transaction.timestamp;
    //     transactions.push(transactionObj);
    //   }
    // }
