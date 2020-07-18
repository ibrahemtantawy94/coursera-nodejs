const express = require('express');
const http = require('http');
const hostName = 'localhost';
const portNumber = 3000;
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const dishRouter = require('./routes/dishRouter');

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.use('/dishes', dishRouter);

app.use((request, response, next) => {
    // console.log(request.headers);

    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.end('<html><head></head><body><h1>This is an express server</h1></body></html>');
});

const server = http.createServer(app);

server.listen(portNumber, hostName, () => {
    console.log(`server running at http://${hostName}:${portNumber}`);
});