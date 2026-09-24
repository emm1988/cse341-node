const express = require('express');
const cors = require('cors');
const mongodb = require('./config/db');

// Import your separate routers exactly like your previous assignment
const expensesRoutes = require('./routes/expenses');
const categoriesRoutes = require('./routes/categories');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = process.env.PORT || 3000;

// Global error handling
process.on('uncaughtException', (err, origin) => {
  console.log(`Caught exception: ${err}\nException origin: ${origin}`);
});

// Middlewares
app.use(cors());
app.use(express.json());



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    // #swagger.tags = ['Welcome']
    res.send('Welcome to the Personal Finance API');
});

app.use('/expenses', (req, res, next) => {
    // #swagger.tags = ['Expenses']
    next();
}, expensesRoutes);

app.use('/categories', (req, res, next) => {
    // #swagger.tags = ['Categories']
    next();
}, categoriesRoutes);



// Global Exception
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error Pipeline Exception Hit.', error: err.message });
});



// Connect to DB 
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Database connected. Server listening on execution port: ${port}`);
  }
});
