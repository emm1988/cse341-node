const express = require('express');
const cors = require('cors');
const mongodb = require('./config/db');

const session = require('express-session');
const passport = require('./config/passport');

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

// Passport and session configuration
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get('/login', passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/api-docs' }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

app.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    req.session.destroy(() => {
      res.status(200).json({ message: "Logged out successfully." });
    });
  });
});

app.get('/', (req, res) => {
    // #swagger.tags = ['Welcome']
    if (req.session.user) {
      res.send(`Logged in as ${req.session.user.username}. Welcome back to the Personal Finance API!`);
    } else {
      res.send('Welcome to the Personal Finance API. Access restricted, please login at /login');
    }
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

