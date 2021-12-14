const http = require('http');

const server = http.createServer((req, res) => {

const { method, url, headers } = req;

// TODO: Add request handlers here

let body = [];

req

.on('error', (err) => { console.log(err); })

.on('data', (chunk) => {});

});

server.listen(3000, console.log('Listening on port 3000...'));