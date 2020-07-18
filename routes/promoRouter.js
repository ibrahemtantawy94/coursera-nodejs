const express = require('express');
const bodyParser = require('body-parser');
const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((request, respose, next) => {
    respose.statusCode = 200;
    respose.setHeader('Content-Type', 'text/plain');
    next();
})
.get((request, respose) => {
    respose.end('will send all promotions to you');
})
.post((request, respose, next) => {
    respose.end('will add the promotion : ' + request.body.name + 'with details : ' + request.body.description);
})
.put((request, respose, next) => {
    respose.statusCode = 403;
    respose.end('PUT Operation is not supported on /promotions');
})
.delete((request, respose) => {
    respose.end('will delete all promotions');
});

// single promotion route

promoRouter.route('/:promoId')
.get((request,respose,next) => {
    respose.end('Will send details of the promotion: ' + request.params.promoId +' to you!');
})
.post((request, respose, next) => {
  respose.statusCode = 403;
  respose.end('POST operation not supported on /promotions/'+ request.params.promoId);
})
.put( (request, respose, next) => {
  respose.write('Updating the promotion: ' + request.params.promoId + '\n');
  respose.end('Will update the promotion: ' + request.body.name + 
        ' with details: ' + request.body.description);
})
.delete((request, respose, next) => {
    respose.end('Deleting promotion: ' + request.params.promoId);
});

module.exports = promoRouter;