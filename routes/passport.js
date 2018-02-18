require('dotenv').config()
let passport = require('passport')
let GoogleStrategy = require('passport-google-oauth20').Strategy
let _ = require('lodash')

passport.use(new GoogleStrategy({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: `http://localhost:${process.env.PORT}/auth/google/callback`
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
