# rewards-points

# Challenge

Create a web service to track the earning and spending of points in a shopping rewards app.

The service should be able to add point transactions with a specific payer and date, spend points in chronological order (oldest first), and return point balances for each payer. A payer is a company that has partnered with the shopping app, such as Coca Cola or Lays. 

## Points Transaction
Users should be able to add points transactions as they occur. Transactions will be added to the system via a `POST` request. Each transaction contains a payer, points, and timestamp. For example:

```javascript
{ 
  "payer": "DANNON", 
  "points": 100, 
  "timestamp": "2020-11-02T14:00:00Z"
}
```

Note that the number of points in a transaction could be negative, reducing that payer's points balance. Point balances cannot go below 0. 

## Points Spend

When a points spend occurs, points should be deducted from the system in chronological order, with the oldest points being spent first. For each payment, return an object containing the payer and number of points paid. A spend of 500 points might look like: 
```javascript
[
  {"payer": "DANNON", "points": 100},   
  {"payer": "CLIFBAR", "points": 300}, 
  {"payer": "PEPSI", "points": 100}
]
```

## Points Balance

The service should also return the points balance for a specified payer. For example, if a payer has 700 points, a GET request to `/points/payerName` should return:
```javascript
{ "points": 700 }
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

Next, install Node.js and [npm](https://www.npmjs.com/) by running this command: 
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

If a version is shown, the installation was successful! 



## License
[MIT](https://choosealicense.com/licenses/mit/)
