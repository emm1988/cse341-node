const express = require('express');
const cors = require('cors');
const mongodb = require('./config/db');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Load application routers
app.use('/', require('./routes'));

// Global Exception Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error Pipeline Exception Hit.', error: err.message });
});

// Connect to DB
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database connected. Server listening on execution port: ${port}`);
    });
  }
});
