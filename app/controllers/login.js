var express = require('express'),
  router = express.Router(),
  db = require('../models');

module.exports = function (app) {
  app.use('/login', router);
};

//login ui

router.get('/',function(req,res){
  res.render('login');
});
//login ui end


//google auth
var passportGoogle = require('../auth/google');


router.get('/auth/google', passportGoogle.authenticate('google', { scope: [
       'https://www.googleapis.com/auth/plus.login',
       'https://www.googleapis.com/auth/plus.profile.emails.read'] 
}));

router.get( '/auth/google/callback', 
    	passportGoogle.authenticate( 'google', { 
    		successRedirect:'/',
    		failureRedirect: '/login'
}),function(req,res){

});
//google auth end

//github auth
var passportGithub = require('../auth/github');


router.get('/auth/github', passportGoogle.authenticate('github',  
{ scope: [ 'user:email' ] }));

router.get( '/auth/github/callback', 
    	passportGithub.authenticate( 'github', { 
    		successRedirect: '/',
    		failureRedirect: '/login'
}));
//github end


//facebook auth
var passportFacebook = require('../auth/facebook');


router.get('/auth/facebook', passportGoogle.authenticate('facebook',  
{ scope: ['email'] }));

router.get( '/auth/facebook/callback', 
    	passportGithub.authenticate( 'facebook', { 
    		successRedirect: '/',
    		failureRedirect: '/login'
}));
//facebook end

//local auth
var passportLocal = require('../auth/local');

router.post('/auth/local', 
  passportLocal.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
//local end

