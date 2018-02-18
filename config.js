require('dotenv').config()

let config = module.exports = {}

if (process.env.NODE_ENV === "production") {
  config.callbackURL = `https://formproxy.now.sh/auth/google/callback`
}

if (process.env.NODE_ENV === "development") {
  config.callbackURL = `http://localhost:${process.env.PORT}/auth/google/callback`
}
