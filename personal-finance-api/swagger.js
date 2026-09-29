const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Personal Finance API',
    description: 'API documenting personal expenses tracking for W03 Project',
  },
  host: 'finance-tracker-d4bh.onrender.com',
  schemes: ['https', 'http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
