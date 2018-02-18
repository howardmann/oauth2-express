// Authentication
let passport = require('passport')
require('./passport.js')

exports.login = passport.authenticate('google', { 
  successRedirect: '/',
  scope: ['email', 'profile'] 
});

exports.authenticate = passport.authenticate('google', { scope: ['email', 'profile'] });

exports.loginRequired = function (req, res, next) {
  let isAuthenticated = req.isAuthenticated();
  req.session.returnTo = req.path;

  if (!isAuthenticated) {
    return res.redirect("/login");
  }

  next()
};

