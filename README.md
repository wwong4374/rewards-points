# rewards-points

# Challenge

Create a web service to track the earning and spending of points in a shopping rewards app.

The service should be able to add point transactions with a specific payer and date, spend points in chronological order (oldest first), and return point balances for each payer. A payer is a company that has partnered with the shopping app, such as Coca Cola or Lays. 

For additional information, such as an explanation of how points are spent in chronological order, see the Additional Details section at the bottom of this Readme. 

# Installation
First, fork and clone this repo, then navigate to the repo on your local drive. 

## Node.js and npm 

### Already have Node.js and npm installed?
Upload to the latest versions of both by running the following command: 
```bash
$ npm install -g npm
```

### Don't have Node.js and npm installed?
If you do not have Node.js and npm installed, first install [Homebrew](https://brew.sh/): 
```bash
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
The script explains what it will do and then pauses before it does it. 

Next, install [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) by running this command: 
```bash
$ brew install node
```

Check the versions of Node.js and npm that are installed on your machine: 
```bash
$ node -v
v14.17.5
```
```bash
$ npm -v
7.21.0
```

If a version is shown, you're all set! 

## Postman
Sign up for and install [Postman](https://www.postman.com/). We will be using Postman to send requests to the server. 

# Using the Service 
First, navigate to the repo on your local machine and install dependencies by running `npm install`: 
```bash
$ npm install
```

Then, run `npm start`, which will start up the web service and host it at `http://localhost:1234/`:
```bash
$ npm start
```

Now open Postman and start a new request: 
![newHTTPRequest](./assets/newHTTPRequest.png?raw=true) 

## Points Transaction
Let's post a new transaction to the system. Create a `POST` request to `http://localhost:1234/points`:
![postTransaction](./assets/postTransaction.png?raw=true)

In the query params, add three parameters: 
* The first should have a key of `payer` and value of `DANNON`. 
* The second should have a key of `points` and value of `300`. 
* The third should have a key of `timestamp` and value of `'2020-10-31T10:00:00Z'`.

These parameters will be automatically appended to the query string: 
![postTransactionFilled](./assets/postTransactionFilled.png?raw=true)

Click send. The server will add the transaction and respond with an array showing all transactions stored in the system, which currently only includes the one we just posted:
![listOfTransactions](./assets/listOfTransactions.png?raw=true)

Before we spend any points, `POST` these additional transactions:
```bash
[
  { payer: 'UNILEVER', points: 200, timestamp: '2020-10-31T11:00:00Z' },
  { payer: 'DANNON', points: -200, timestamp: '2020-10-31T15:00:00Z' },
  { payer: 'MILLER COORS', points: 10000, timestamp: '2020-11-01T14:00:00Z' },
  { payer: 'DANNON', points: 1000, timestamp: '2020-11-02T14:00:00Z' }
]
```

## Points Spend
Now let's spend 5000 points. Create a `GET` request to `http://localhost:1234/points/spend`. Add a parameter with a key of `pointsToSpend` and value of `5000`:
![spendPoints](./assets/spendPoints.png?raw=true)

Click send. The server will respond with an array of objects representing spent points, oldest to newest:
![pointSpends](./assets/pointSpends.png?raw=true)

For an explanation of how the point spending order is determined, see the Additional Details section below. 

## Points Balance

Finally, let's see each payer's point balances. Create a `GET` request to `http://localhost:1234/points/balance`. No parameters are needed:
![getPointsBalance](./assets/getPointsBalance.png?raw=true) 

Click send. The server will respond with an array of each payer's current point balances: 
![pointBalances](./assets/pointBalances.png?raw=true)

# Additional Details
### Points Transaction
Users should be able to add points transactions as they occur. Transactions will be added to the system via a `POST` request. Each transaction contains a payer, points, and timestamp. For example:

```javascript
{ 
  "payer": "DANNON", 
  "points": 100, 
  "timestamp": "2020-11-02T14:00:00Z"
}
```

Note that the number of points in a transaction could be negative, reducing that payer's points balance. Point balances as of any date cannot go below 0. 

### Points Spend

When a points spend occurs, points should be deducted from the system in chronological order, with the oldest points being spent first. For each payment, return an object containing the payer and number of points paid. A spend of 500 points might look like: 
```javascript
[
  {"payer": "DANNON", "points": -100},   
  {"payer": "CLIFBAR", "points": -300}, 
  {"payer": "PEPSI", "points": -100}
]
```
NOTE: Suppose Cheerios earned 300 and spent 200 points on November 1. Cheerios therefore has a net balance of 300 - 200 = 100 points available to spend as of November 1. 

Even if Cheerios earned additional points after November 1, no more than 100 points may be deducted from Cheerios on November 1. The system is set up such that no payer's point balance, as of any date, may go negative. 

 

### Points Balance

The service should also return the points balance for each payer. For example, if Dannon has 700 points and Pepsi has 1000 points, a `GET` request to `/points/balance` should return:
```javascript
{ 
  "DANNON": 700,
  "PEPSI": 1000
}
```


## License
[MIT](https://choosealicense.com/licenses/mit/)
