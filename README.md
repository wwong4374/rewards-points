# rewards-points

## Challenge

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
  {"payer": "DANNON", "points": 100},   
  {"payer": "CLIFBAR", "points": 300}, 
  {"payer": "PEPSI", "points": 100}
]
```

### Points Balance

The service should also return the points balance for a specified payer. For example, if a payer has 700 points, a GET request to `/points/payerName` should return:
```javascript
{ "points": 700 }
```


## Implementation

## License
[MIT](https://choosealicense.com/licenses/mit/)
