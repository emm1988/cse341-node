const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

// Swagger routes
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', (req, res, next) => {
    next();
}, swaggerUi.setup(swaggerDocument));

module.exports = router;
