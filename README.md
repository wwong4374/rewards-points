# rewards-points

# Challenge

Create a web service to track the earning and spending of points in a shopping rewards app.

The service should be able to add point transactions with a specific payer and date, spend points in chronological order (oldest first), and return point balances for each payer. A payer is a company that has partnered with the shopping app, such as Coca Cola or Lays. 

### Points Transaction
Users should be able to add points transactions as they occur. Transactions will be added to the system via a `POST` request. Each transaction contains a payer, points, and timestamp. For example:

```javascript
{ 
  "payer": "DANNON", 
  "points": 100, 
  "timestamp": "2020-11-02T14:00:00Z"
}
```

Note that the number of points in a transaction could be negative, reducing that payer's points balance. Point balances cannot go below 0. 

### Points Spend

When a points spend occurs, points should be deducted from the system in chronological order, with the oldest points being spent first. For each payment, return an object containing the payer and number of points paid. A spend of 500 points might look like: 
```javascript
[
  {"payer": "DANNON", "points": -100},   
  {"payer": "CLIFBAR", "points": -300}, 
  {"payer": "PEPSI", "points": -100}
]
```
NOTE: Suppose Dannon earned 300 and spent 200 points on November 1. During a subsequent spend, no more than 100 points may be deducted from Dannon's balance as of November 1, because that would cause its balance to go negative.   

### Points Balance

The service should also return the points balance for each payer. For example, if Dannon has 700 points and Pepse has 1000 points, a `GET` request to `/points/balance` should return:
```javascript
{ 
  "DANNON": 700,
  "PEPSI": 1000
}
```

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

Then, run `npm start`:
```bash
$ npm start
```
This will start up the web service and host it at `http://localhost:1234/`. 

Now open Postman and start a new request: 
![newHTTPRequest](./assets/newHTTPRequest.png?raw=true) 

### Points Transaction
Let's post a new transaction to the system. Create a `POST` request to `http://localhost:1234/points`:
![postTransaction](./assets/postTransaction.png?raw=true)

In the query params, add two parameters. The first should have a key of `payer` and value of `PEPSI`. The second should have a key of `points` and value of `500`. These parameters will be automatically appended to the query string: 
![postTransactionFilled](./assets/postTransactionFilled.png?raw=true)

Click send. The server will add the transaction and respond with an array showing all transactions currently stored in the system: 
![listOfTransactions]()

### Points Spend
Next, let's spend 5000 points. Create a `GET` request to `http://localhost:1234/points/spend`. Add a parameter with a key of `pointsToSpend` and value of `5000`:
![spendPoints](./assets/spendPoints.png?raw=true)

Click send. The server will respond with an array of objects representing point spends:
![pointSpends]:
![pointSpends]()

### Points Balance

Finally, let's see each payer's point balances. Create a `GET` request to `http://localhost:1234/points/balance`:
![getPointsBalance](./assets/getPointsBalance.png?raw=true) 

Click send. The server will respond with an array of each payer's current point balances: 
![pointBalances]()

## License
[MIT](https://choosealicense.com/licenses/mit/)
