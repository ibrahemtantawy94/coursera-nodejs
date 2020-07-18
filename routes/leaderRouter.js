const express = require('express');
const bodyParser = require('body-parser');
const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((request, respose, next) => {
    respose.statusCode = 200;
    respose.setHeader('Content-Type', 'text/plain');
    next();
})
.get((request, respose) => {
    respose.end('will send all leaders to you');
})
.post((request, respose, next) => {
    respose.end('will add the leader : ' + request.body.name + 'with details : ' + request.body.description);
})
.put((request, respose, next) => {
    respose.statusCode = 403;
    respose.end('PUT Operation is not supported on /leaders');
})
.delete((request, respose) => {
    respose.end('will delete all leaders');
});

// single leader route
leaderRouter.route('/:leaderId')
.get((request,respose,next) => {
    respose.end('Will send details of the leader: ' + request.params.leaderId +' to you!');
})
.post((request, respose, next) => {
  respose.statusCode = 403;
  respose.end('POST operation not supported on /leaders/'+ request.params.leaderId);
})
.put( (request, respose, next) => {
  respose.write('Updating the leader: ' + request.params.leaderId + '\n');
  respose.end('Will update the leader: ' + request.body.name + 
        ' with details: ' + request.body.description);
})
.delete((request, respose, next) => {
    respose.end('Deleting leader: ' + request.params.leaderId);
});

module.exports = leaderRouter;