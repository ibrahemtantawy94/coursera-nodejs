const express = require('express');
const bodyParser = require('body-parser');
const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((request, respose, next) => {
    respose.statusCode = 200;
    respose.setHeader('Content-Type', 'text/plain');
    next();
})
.get((request, respose) => {
    respose.end('will send all dishes to you');
})
.post((request, respose, next) => {
    respose.end('will add the dish : ' + request.body.name + 'with details : ' + request.body.description);
})
.put((request, respose, next) => {
    respose.statusCode = 403;
    respose.end('PUT Operation is not supported on /dishess');
})
.delete((request, respose) => {
    respose.end('will delete all dishes');
});

dishRouter.route('/:dishId')
.get((request,respose,next) => {
    respose.end('Will send details of the dish: ' + request.params.dishId +' to you!');
})
.post((request, respose, next) => {
  respose.statusCode = 403;
  respose.end('POST operation not supported on /dishes/'+ request.params.dishId);
})
.put( (request, respose, next) => {
  respose.write('Updating the dish: ' + request.params.dishId + '\n');
  respose.end('Will update the dish: ' + request.body.name + 
        ' with details: ' + request.body.description);
})
.delete((request, respose, next) => {
    respose.end('Deleting dish: ' + request.params.dishId);
});

module.exports = dishRouter;