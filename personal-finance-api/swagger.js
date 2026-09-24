const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Personal Finance API',
    description: 'API documenting personal expenses tracking for W03 Project',
  },
  host: '://onrender.com', 
  schemes: ['https', 'http'],
  
  definitions: {
    expenses: {
      concept: "Water Bill",
      amount: 45.20,
      category: "Home",
      date: "2026-03-23",
      paymentMethod: "Credit Card",
      notes: "March water bill payment",
      tags: ["utility"],
      userId: "user_dev_456"
    },
    categories: {
      name: "Entertainment",
      description: "Movies, streaming services, and hobbies",
      color: "#FF5733"
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js']; 

swaggerAutogen(outputFile, endpointsFiles, doc);

