const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Personal Finance API',
    description: 'API documenting personal expenses tracking for W03 Project',
  },
  host: 'localhost:3000',
  schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
