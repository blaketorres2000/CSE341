const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger_output.json');

// Middleware to log headers
router.use('/api-docs', (req, res, next) => {
  console.log("Headers in Swagger UI request:", req.headers);
  req.headers['z-key'] = '5db70934345e409f96cb070e9495asdkjh54s534s2asd35as15a840ffa';
  next();
});

// Serve Swagger UI
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;