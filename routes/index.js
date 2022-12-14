const routes = require('express').Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

routes.use('/routines', require('./routines'));

routes.use('/history', require('./history'));

module.exports = routes;
