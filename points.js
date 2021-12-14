// EXAMPLE TRANSACTIONS:

const transaction1 = { "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" }

const transaction2 = { "payer": "UNILEVER", "points": 200, "timestamp": "2020-10-31T11:00:00Z" }

const transaction3 = { "payer": "DANNON", "points": -200, "timestamp": "2020-10-31T15:00:00Z" }

const transaction4 = { "payer": "MILLER COORS", "points": 10000, "timestamp": "2020-11-01T14:00:00Z" }

const transaction5 = { "payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z" }

let transactions = [];

const currentTimeStamp = new Date();

// console.log(today);