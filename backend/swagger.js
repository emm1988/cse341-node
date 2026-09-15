const swaggerAutogen = require('swagger-autogen')();

// Render and local hosting for Swagger documentation
const isProduction = process.env.NODE_ENV === 'production';
const hostUrl = isProduction ? 'cse341-node-tpx2.onrender.com' : 'localhost:8080';

const doc = {
  info: {
    title: 'Contacts API',
    description: 'Contacts Project API Documentation'
    },
    host: hostUrl,
    schemes: isProduction ? ['https'] : ['http', 'https']
};

const outputFile = './swagger-output.json';
const routesEndpoints = ['./app.js']; 

const options = {
  ignoreFiles: ['./routes/swagger.js']
};

swaggerAutogen(outputFile, routesEndpoints, doc);

