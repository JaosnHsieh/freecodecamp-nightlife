var passport = require('passport');
var LocalStrategy = require( 'passport-local' ).Strategy;
var ids = require('./ids');
var init = require('./init');
var db = require('../models');



passport.use(new LocalStrategy(
  function(username, password, done) {

    // db.users.findByUsername(username, function(err, user) {
    //   if (err) { return cb(err); }
    //   if (!user) { return cb(null, false); }
    //   if (user.password != password) { return cb(null, false); }
    //   return cb(null, user);
    // });
      
    //   db.User
    // .findOne({where: {username:username }})
    // .then(function(user) {
    // return db.User.findCreateUpdate(
    // { username: username,password:password}
    // );
    // })
    // .catch(function(err){
    //     return done(null,false);
    // });

      if(username=='jason'&&password=='1234'){
           return done(null,{user_id:'123',username:'jasonHsieh'})
      }
      else{
          return done(null,false);
      }
     
  

  }));

// serialize user into the session
init();


module.exports = passport;