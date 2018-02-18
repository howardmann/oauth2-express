require('dotenv').config()
// Dependencies
let express = require('express');
let path = require('path');
let exphbs = require('express-handlebars');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let _ = require('lodash')

// Authentication
let passport = require('passport');
let GoogleStrategy = require('passport-google-oauth20').Strategy
let session = require('cookie-session');

let app = express();

// Set view engine
app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts/',
}));
app.set('view engine', '.hbs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Use session and cookie parser
app.use(cookieParser());

// Authentication
app.use(session({
  name: 'session',
  keys: ['ilovekfc42']
}))
app.use(passport.initialize())
app.use(passport.session())

// Global route middleware set property login if authenticated
app.use(function (req, res, next) {
  res.locals.login = req.isAuthenticated()
  next()
});

// Require routes
app.use(require('./routes/index'));

let PORT = process.env.PORT || 3000
app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
