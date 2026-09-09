const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

// Import the routes
const professionalRoutes = require('./routes/professional');
const contactsRoutes = require('./routes/contacts');

const port = process.env.PORT || 8080;
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to CSE341');
});

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/professional', professionalRoutes)
    .use('/contacts', contactsRoutes);


mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});