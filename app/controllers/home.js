var express = require('express'),
  router = express.Router(),
  db = require('../models');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/',function (req, res, next) {
  // res.send(req.user);
  res.render('index',{lastKeywords:req.session.lastKeywords});
  delete req.session.lastKeywords;
});

router.get('/logout', function (req, res, next) {
    req.logout();
  res.redirect('/');

});

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()){
//     delete req.session.lastKeywords;
//     return next();
//     }
//   else
//   {
//     res.render("index");
//   }
//     // Return error content: res.jsonp(...) or redirect: res.redirect('/login')
// }