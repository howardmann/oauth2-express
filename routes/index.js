let express = require('express')
let router = express.Router()
let auth = require('./auth')
let godigital = require('./godigital')

router
  .get('/', (req, res, next) => res.render('index'))
  .get('/profile', auth.loginRequired, (req, res, next) => res.send(req.user))
  .get('/login', auth.login)
  .get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
  })
  .get('/auth/google/callback', auth.authenticate, (req, res, next) => {
    res.redirect(req.session.returnTo || '/');
    delete req.session.returnTo;
  })

router 
  .get('/form', auth.loginRequired, godigital.fetchAll)
  .get('/form/file/:filename', auth.loginRequired, godigital.fetchSingle)
  


module.exports = router