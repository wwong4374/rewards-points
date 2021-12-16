/* eslint-disable comma-dangle */
/* eslint-disable radix */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-destructuring */
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
    } else { // Payer does not yet exist in the system
      if (points >= 0) {
        balances[payer] = points;
      } else {
        console.log(`Invalid transaction: ${transaction}. Payer's point balance cannot go negative.`);
      }
    }
  });
  return balances;
};

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

  transactionsArray.sort((transactionA, transactionB) => { // Sort transactions by timestamp, oldest to newest
    return new Date(transactionA.timestamp) - new Date(transactionB.timestamp);
  });

  for (let i = 0; i < transactionsArray.length; i++) {
    const transaction = transactionsArray[i];
    const payer = transaction.payer;
    const payerPointBalanceOnCurrentDate = getPayerBalanceByDate(payer, transactionsArray, getDateFromTimestamp(transaction.timestamp));
    if (numPointsRemaining === 0) { break; }
    if (transaction.points < 0) { continue; }
    if (payerPointBalanceOnCurrentDate >= numPointsRemaining) { // Payer can pay all of the remaining points
      const spendObj = {
        payer: transaction.payer,
        points: -numPointsRemaining
      };
      spendArray.push(spendObj);
      numPointsRemaining -= numPointsRemaining;

      const transactionObj = spendObj;
      transactionObj.timestamp = transaction.timestamp;
    } else { // Payer can pay some of the remaining points
      const spendObj = {
        payer: transaction.payer,
        points: -payerPointBalanceOnCurrentDate
      };
      spendArray.push(spendObj);
      numPointsRemaining -= payerPointBalanceOnCurrentDate;

      const transactionObj = spendObj;
      transactionObj.timestamp = transaction.timestamp;
    }
  }
  return spendArray;
};

module.exports = {
  setBalances,
  getDateFromTimestamp,
  getPayerBalanceByDate,
  createTransaction,
  spendPoints
};
