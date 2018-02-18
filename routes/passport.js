let path = require('path')
require('dotenv').config({ path: path.join(__dirname, '/./../.env') })

// Dependencies
let passport = require('passport')
let GoogleStrategy = require('passport-google-oauth20').Strategy
let _ = require('lodash')
let config = require('../config.js')

passport.use(new GoogleStrategy({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: config.callbackURL
}, (accessToken, refreshToken, profile, cb) => {
  let domain = _.get(profile, '_json.domain')
  // only let certain domain through
  if (domain === "safetyculture.io") {
    cb(null, profile)
  } else {
    // Fail
    cb(new Error("Invalid host domain"));
  }
}));

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});
