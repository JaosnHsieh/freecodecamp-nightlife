var passport = require('passport');
var db = require('../models');
var GoogleStrategy = require('passport-google-oauth2').Strategy;

var ids = require('./ids');

var init = require('./init');

passport.use(new GoogleStrategy({
    clientID: ids.google.clientID,
    clientSecret: ids.google.clientSecret,
    callbackURL: ids.google.callbackURL,
    passReqToCallback: true
  },
  function (request, accessToken, refreshToken, profile, done) {

    db.User.findOrCreate({
      where: {
        google_id: profile.id
      }
    }).then(function (user) {
      return done(null, user[0]);
    });

    //  // asynchronous verification, for effect...
    //     process.nextTick(function () {

    //       // To keep the example simple, the user's Google profile is returned to
    //       // represent the logged-in user.  In a typical application, you would want
    //       // to associate the Google account with a user record in your database,
    //       // and return that user instead.
    //       return done(null, profile);
    //     });
    //     // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //     //   return done(err, user);
    //     // });


  }
));

// serialize user into the session
init();


module.exports = passport;
