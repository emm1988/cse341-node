const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

const swaggerRoutes = require('./routes/swagger');
const contactsRoutes = require('./routes/contacts');
const professionalRoutes = require('./routes/professional');

const port = process.env.PORT || 8080;
const app = express();

// Middlewares
app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    });

app.use('/', swaggerRoutes);

app.get('/', (req, res) => {
    // #swagger.tags = ['Welcome']
    res.send('Welcome to CSE341');
});

app.use('/contacts', (req, res, next) => {
    //#swagger.tags = ['Contacts']
    next();
}, contactsRoutes);

app.use('/professional', (req, res, next) => {
    //#swagger.tags = ['Professional']
    next();
}, professionalRoutes);

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});
