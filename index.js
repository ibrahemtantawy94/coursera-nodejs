const express = require('express');
const http = require('http');
const hostName = 'localhost';
const portNumber = 3000;
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.all('/dishes', (request, respose, next) => {
    respose.statusCode = 200;
    respose.setHeader('Content-Type', 'text/plain');
    next();
});

app.get('/dishes', (request, respose) => {
    respose.end('will send all dishes to you');
});

app.post('/dishes', (request, respose, next) => {
    respose.end('will add the dish : ' + request.body.name + 'with details : ' + request.body.description);
});

app.put('/dishes', (request, respose, next) => {
    respose.statusCode = 403;
    respose.end('PUT Operation is not supported on /dishess');
});

app.delete('/dishes', (request, respose) => {
    respose.end('will delete all dishes');
});

app.get('/dishes/:dishId', (request,respose,next) => {
    respose.end('Will send details of the dish: ' + request.params.dishId +' to you!');
});

app.post('/dishes/:dishId', (request, respose, next) => {
  respose.statusCode = 403;
  respose.end('POST operation not supported on /dishes/'+ request.params.dishId);
});

app.put('/dishes/:dishId', (request, respose, next) => {
  respose.write('Updating the dish: ' + request.params.dishId + '\n');
  respose.end('Will update the dish: ' + request.body.name + 
        ' with details: ' + request.body.description);
});

app.delete('/dishes/:dishId', (request, respose, next) => {
    respose.end('Deleting dish: ' + request.params.dishId);
});

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